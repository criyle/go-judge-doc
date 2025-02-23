# 安装

## Github Release

从 [release page](https://github.com/criyle/go-judge/releases) 下载对应架构和操作系统的版本运行。

## Docker

```sh
docker run -it --privileged --shm-size=256m -p 5050:5050 criyle/go-judge
```

`--privileged` 用于开启容器嵌套，用户程序会安全的在容器的限制下运行。

## Nix

如果安装了 `nix` 可以从 [nixpkgs](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=go-judge) 安装  `go-judge`。

```sh
nix-env -iA nixpkgs.go-judge
```

