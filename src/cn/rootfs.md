# 根文件系统

创建一个自定义的根文件系统可以隔离容器和宿主机的环境配置。按照以下目录结构放置容器根文件系统和 `mount.yaml`，以此文件夹为工作目录运行 `go-judge` 时，容器根文件系统会自动配置。

:::code-group

```sh [structure]
$ tree -L 1
.
├── mount.yaml
└── rootfs # Folder for the rootfs
```

```yaml [mount.yaml]
mount:
  # 基础的目录
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
  # 常用设备
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
  # 工作目录
  - type: tmpfs
    target: /w
    data: size=128m,nr_inodes=4k
  # tmp 目录
  - type: tmpfs
    target: /tmp
    data: size=128m,nr_inodes=4k
proc: true
# container work directory
workDir: /w
# container host name
hostName: go-judge
# container domain name
domainName: go-judge
# container user uid
uid: 1536
# container user gid
gid: 1536
```

:::

## Alpine

```sh
# Find the latest release on the release page
export ROOTFS_URL=https://dl-cdn.alpinelinux.org/alpine/v3.23/releases/aarch64/alpine-minirootfs-3.23.2-aarch64.tar.gz

mkdir alpine
cd alpine

# Download the roofs
wget $ROOTFS_URL -O rootfs.tar.gz
mkdir rootfs
tar -xvf rootfs.tar.gz -C rootfs
cp /etc/resolv.conf ./rootfs/etc/resolv.conf

# Step into the container
unshare -r --fork --pid --mount-proc -R ./rootfs \
    /bin/sh -c "export HOME=/root USER=root LOGNAME=root TERM=xterm-256color; exec /bin/sh"

# Install requirements
apk update && apk add g++
```

## Debian

```sh
# Find the latest release on the release page
export ROOTFS_URL=https://images.linuxcontainers.org/images/debian/trixie/arm64/default/20260120_05%3A24/rootfs.tar.xz

mkdir debian
cd debian

# Download the roofs
wget $ROOTFS_URL -O rootfs.tar.xz
mkdir rootfs
tar -xvf rootfs.tar.xz -C rootfs
rm ./rootfs/etc/resolv.conf
cp /etc/resolv.conf ./rootfs/etc/resolv.conf

# Step into the container
unshare -r --fork --pid --mount-proc -R ./rootfs \
    /bin/sh -c "export HOME=/root USER=root LOGNAME=root TERM=xterm-256color; exec /bin/bash"
echo 'APT::Sandbox::User "root";' > /etc/apt/apt.conf.d/01sandbox

# Install requirements
apt update && apt install g++
```

## Fedora

```sh
# Find the latest release on the release page
export ROOTFS_URL=https://images.linuxcontainers.org/images/fedora/43/arm64/default/20260120_20%3A33/rootfs.tar.xz

mkdir fedora
cd fedora

# Download the roofs
wget $ROOTFS_URL -O rootfs.tar.xz
mkdir rootfs
tar -xvf rootfs.tar.xz -C rootfs
rm ./rootfs/etc/resolv.conf
cp /etc/resolv.conf ./rootfs/etc/resolv.conf

# Step into the container
unshare -r --fork --pid --mount-proc -R ./rootfs \
    /bin/sh -c "export HOME=/root USER=root LOGNAME=root TERM=xterm-256color; exec /bin/bash"

# Install requirements
dnf install -y g++
```

## Arch Linux

```sh
# Find the latest release on the release page
export ROOTFS_URL=https://images.linuxcontainers.org/images/archlinux/current/arm64/default/20260120_04%3A18/rootfs.tar.xz

mkdir archlinux
cd archlinux

# Download the roofs
wget $ROOTFS_URL -O rootfs.tar.xz
mkdir rootfs
tar -xvf rootfs.tar.xz -C rootfs
rm ./rootfs/etc/resolv.conf
cp /etc/resolv.conf ./rootfs/etc/resolv.conf

# Step into the container
unshare -r --fork --pid --mount-proc -R ./rootfs \
    /bin/sh -c "export HOME=/root USER=root LOGNAME=root TERM=xterm-256color; exec /bin/bash"

sed -i 's/#DisableSandbox/DisableSandbox/' /etc/pacman.conf
sed -i 's/^CheckSpace/#CheckSpace/' /etc/pacman.conf

# Install requirements
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

curl -L https://nixos.org/nix/install | sh -s -- --no-daemon
source ~/.nix-profile/etc/profile.d/nix.sh
```

## UV

```sh
wget https://github.com/astral-sh/uv/releases/download/0.9.26/uv-aarch64-
unknown-linux-gnu.tar.gz
tar -xvzf uv-aarch64-unknown-linux-gnu.tar.gz.1 --no-same-owner --strip-components 1
```
