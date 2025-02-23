# 编译

## 编译 docker

终端中运行 `docker build -t go-judge -f Dockerfile.exec .`

沙箱服务需要特权级别 docker 来创建子容器和提供 cgroup 资源限制。

## 编译沙箱终端

编译 `go build ./cmd/go-judge-shell`

运行 `./go-judge-shell`，需要打开 gRPC 接口来使用。提供一个沙箱内的终端环境。
