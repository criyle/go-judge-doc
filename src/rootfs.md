# RootFS

Building a separate rootFS allows good separation between sandbox environment and host. With the following folder structure and mount.yaml, running `go-judge` with work directory setting to the folder configures the rootFS automatically.

:::code-group

```sh [structure]
$ tree -L 1
.
├── mount.yaml
└── rootfs # Folder for the rootfs
```

```yaml [mount.yaml]
mount:
  # Basic binaries and libraries
  - type: bind
    source: rootfs/bin
    target: /bin
    readonly: true
  - type: bind
    source: rootfs/lib
    target: /lib
    readonly: true
  - type: bind
    source: rootfs/lib64
    target: /lib64
    readonly: true
  - type: bind
    source: rootfs/usr
    target: /usr
    readonly: true
  - type: bind
    source: rootfs/etc
    target: /etc
    readonly: true
  - type: bind
    source: rootfs/var
    target: /var
    readonly: true
  # devices
  - type: bind
    source: /dev/null
    target: /dev/null
  - type: bind
    source: /dev/urandom
    target: /dev/urandom
  - type: bind
    source: /dev/random
    target: /dev/random
  - type: bind
    source: /dev/zero
    target: /dev/zero
  - type: bind
    source: /dev/full
    target: /dev/full
  # work dir
  - type: tmpfs
    target: /w
    data: size=128m,nr_inodes=4k
  # tmp dir
  - type: tmpfs
    target: /tmp
    data: size=128m,nr_inodes=4k
proc: true
# 容器工作目录
workDir: /w
# 容器主机名
hostName: go-judge
# 容器域名
domainName: go-judge
# 容器 uid
uid: 1536
# 容器 gid
gid: 1536
```

:::

## Alpine

```sh
# 此 URL 为示例，请寻找最新下载镜像
export ROOTFS_URL=https://dl-cdn.alpinelinux.org/alpine/v3.23/releases/aarch64/alpine-minirootfs-3.23.2-aarch64.tar.gz

mkdir alpine
cd alpine

# 下载镜像
wget $ROOTFS_URL -O rootfs.tar.gz
mkdir rootfs
tar -xvf rootfs.tar.gz -C rootfs
cp /etc/resolv.conf ./rootfs/etc/resolv.conf

# 进入容器
unshare -r --fork --pid --mount-proc -R ./rootfs \
    /bin/sh -c "export HOME=/root USER=root LOGNAME=root TERM=xterm-256color; exec /bin/sh"

# 安装依赖，请根据需求更改
apk update && apk add g++
```

## Debian

```sh
# 此 URL 为示例，请寻找最新下载镜像
export ROOTFS_URL=https://images.linuxcontainers.org/images/debian/trixie/arm64/default/20260120_05%3A24/rootfs.tar.xz

mkdir debian
cd debian

# 下载镜像
wget $ROOTFS_URL -O rootfs.tar.xz
mkdir rootfs
tar -xvf rootfs.tar.xz -C rootfs
rm ./rootfs/etc/resolv.conf
cp /etc/resolv.conf ./rootfs/etc/resolv.conf

# 进入容器
unshare -r --fork --pid --mount-proc -R ./rootfs \
    /bin/sh -c "export HOME=/root USER=root LOGNAME=root TERM=xterm-256color; exec /bin/bash"
echo 'APT::Sandbox::User "root";' > /etc/apt/apt.conf.d/01sandbox

# 安装依赖，请根据需求更改
apt update && apt install g++
```

## Fedora

```sh
# 此 URL 为示例，请寻找最新下载镜像
export ROOTFS_URL=https://images.linuxcontainers.org/images/fedora/43/arm64/default/20260120_20%3A33/rootfs.tar.xz

mkdir fedora
cd fedora

# 下载镜像
wget $ROOTFS_URL -O rootfs.tar.xz
mkdir rootfs
tar -xvf rootfs.tar.xz -C rootfs
rm ./rootfs/etc/resolv.conf
cp /etc/resolv.conf ./rootfs/etc/resolv.conf

# 进入容器
unshare -r --fork --pid --mount-proc -R ./rootfs \
    /bin/sh -c "export HOME=/root USER=root LOGNAME=root TERM=xterm-256color; exec /bin/bash"

# 安装依赖，请根据需求更改
dnf install -y g++
```

## Arch Linux

```sh
# 此 URL 为示例，请寻找最新下载镜像
export ROOTFS_URL=https://images.linuxcontainers.org/images/archlinux/current/arm64/default/20260120_04%3A18/rootfs.tar.xz

mkdir archlinux
cd archlinux

# 下载镜像
wget $ROOTFS_URL -O rootfs.tar.xz
mkdir rootfs
tar -xvf rootfs.tar.xz -C rootfs
rm ./rootfs/etc/resolv.conf
cp /etc/resolv.conf ./rootfs/etc/resolv.conf

# 进入容器
unshare -r --fork --pid --mount-proc -R ./rootfs \
    /bin/sh -c "export HOME=/root USER=root LOGNAME=root TERM=xterm-256color; exec /bin/bash"

sed -i 's/#DisableSandbox/DisableSandbox/' /etc/pacman.conf
sed -i 's/^CheckSpace/#CheckSpace/' /etc/pacman.conf

# 安装依赖，请根据需求更改
pacman-key --init
pacman-key --populate archlinuxarm
pacman -Sy --noconfirm gcc
```

## Nix

```sh
mkdir -p /dev/pts
mount -t devpts -o newinstance,ptmxmode=0666 devpts /dev/pts
ln -sf /dev/pts/ptmx /dev/ptmx

mkdir -p /nix /etc/nix
cat > /etc/nix/nix.conf <<EOF
sandbox = false
build-users-group =
EOF

# 此 URL 为示例，请寻找最新下载镜像
curl -L https://nixos.org/nix/install | sh -s -- --no-daemon
source ~/.nix-profile/etc/profile.d/nix.sh
```

## UV

```sh
# 此 URL 为示例，请寻找最新下载镜像
wget https://github.com/astral-sh/uv/releases/download/0.9.26/uv-aarch64-
unknown-linux-gnu.tar.gz
tar -xvzf uv-aarch64-unknown-linux-gnu.tar.gz --no-same-owner --strip-components 1
```
