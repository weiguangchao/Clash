#!/bin/bash

DNS_SERVER="192.18.0.2"

# 获取脚本所在目录的绝对路径（如果脚本被软链接，则获取源文件的路径）
_get_real_dir() {
    local script_path="$1"
    local max_depth=10
    local depth=0

    # 先转换为绝对路径
    if [[ "$script_path" != /* ]]; then
        script_path="$(cd "$(dirname "$script_path")" && pwd)/$(basename "$script_path")"
    fi

    # 如果是软链接，递归解析直到找到真实文件
    while [ -L "$script_path" ] && [ $depth -lt $max_depth ]; do
        local link_target=$(readlink "$script_path")
        # 如果是相对路径，转换为绝对路径
        if [[ "$link_target" != /* ]]; then
            link_target="$(cd "$(dirname "$script_path")" && pwd)/$link_target"
        fi
        script_path="$link_target"
        depth=$((depth + 1))
    done

    # 返回真实文件所在目录的绝对路径
    cd "$(dirname "$script_path")" && pwd
}

# 获取脚本源文件的真实路径（如果通过软链接执行，则获取源文件路径）
SCRIPT_DIR="$(_get_real_dir "${BASH_SOURCE[0]}")"

usage() {
    cat <<'EOF'
用法: mihomo_ctrl.sh <命令> [参数]

可用命令:
  restart        重启 mihomo
  stop           停止 mihomo
  status         显示当前 mihomo 进程

选项:
  -h, --help     显示本帮助信息

示例:
  ./mihomo_ctrl.sh restart
  ./mihomo_ctrl.sh stop
  ./mihomo_ctrl.sh status
EOF
}

mihomo_stop() {
    # 查找并停止所有 mihomo 进程
    echo "正在停止 mihomo 进程..."
    sudo -n pkill -f "mihomo" || true

    # 等待进程完全退出
    sleep 2

    # 检查是否还有残留进程
    if pgrep -f "mihomo" >/dev/null; then
        echo "强制终止残留进程..."
        sudo -n pkill -9 -f "mihomo" || true
        sleep 1
    fi
}

mihomo_start() {
    # 重新启动 mihomo
    echo "正在启动 mihomo..."

    # 使用 sudo -n 非交互模式启动（不会再次提示密码）
    sudo -n "$SCRIPT_DIR/mihomo" -f "$SCRIPT_DIR/whitelist.yaml" &

    # 等待一下确保进程启动
    sleep 2

    # 检查进程是否成功启动
    if pgrep -f "mihomo" >/dev/null; then
        echo "✓ mihomo 启动成功"
    else
        echo "✗ mihomo 启动失败，请检查配置"
        exit 1
    fi
}

mihomo_status() {
    if pgrep -f "mihomo" >/dev/null; then
        echo "当前运行中的 mihomo 进程:"
        ps aux | grep -i mihomo | grep -v grep
    else
        echo "当前没有 mihomo 进程在运行"
    fi
}

# 设置 DNS
dns_set() {
    sudo -n networksetup -setdnsservers "Wi-Fi" "$DNS_SERVER"
}

# 清除 DNS
dns_remove() {
    sudo -n networksetup -setdnsservers "Wi-Fi" "Empty"
}

# 设置代理
proxy_set() {
    networksetup -setwebproxy "Wi-Fi" $PROXY_IP $PROXY_PORT
    networksetup -setsecurewebproxy "Wi-Fi" $PROXY_IP $PROXY_PORT
    networksetup -setsocksfirewallproxy "Wi-Fi" $PROXY_IP $PROXY_PORT
}

# 清除代理
proxy_remove() {
    networksetup -setwebproxystate "Wi-Fi" off
    networksetup -setsecurewebproxystate "Wi-Fi" off
    networksetup -setsocksfirewallproxystate "Wi-Fi" off
}

# 在脚本执行前先获取 sudo 权限
privilige() {
    echo "需要 sudo 权限来执行脚本，请输入密码（只需输入一次）..."
    if ! sudo -n true 2>/dev/null; then
        sudo -v
    fi
}

if [ $# -eq 0 ]; then
    usage
    exit 0
fi

case "$1" in
-h | --help)
    usage
    ;;
restart)
    privilige
    mihomo_stop
    dns_remove

    mihomo_start
    dns_set
    ;;
stop)
    privilige
    mihomo_stop
    dns_remove
    ;;
status)
    mihomo_status
    ;;
*)
    echo "未知命令: $1"
    usage
    exit 1
    ;;
esac
