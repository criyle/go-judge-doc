# Build

## Build go judge

Build by your own `docker build -t go-judge -f Dockerfile.exec .`

For cgroup v1, the `go-judge` need root privilege to create `cgroup`. Either creates sub-directory `/sys/fs/cgroup/cpuacct/go_judge`, `/sys/fs/cgroup/memory/go_judge`, `/sys/fs/cgroup/pids/go_judge` and make execution user readable or use `sudo` to run it.

For cgroup v2, systemd dbus will be used to create a transient scope for cgroup integration.

## Build Shared object

Build container init `cinit`:

`go build -o cinit ./cmd/go-judge-init`

Build `go_judge.so`:

`go build -buildmode=c-shared -o go_judge.so ./cmd/go-judge-ffi/`

For example, in JavaScript, run with `ffi-napi` (seems node 14 is not supported yet):

## Build gRPC Proxy

Build `go build ./cmd/go-judge-proxy`

Run `./go-judge-proxy`, connect to gRPC endpoint expose as a REST endpoint.

## Build go judge Shell

Build `go build ./cmd/go-judge-shell`

Run `./go-judge-shell`, connect to gRPC endpoint with interactive shell.
