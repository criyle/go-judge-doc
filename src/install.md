# Install

## Github Release

Download compiled executable for your platform and operating system on the [release page](https://github.com/criyle/go-judge/releases).

## Docker

```sh
docker run -it --privileged --shm-size=256m -p 5050:5050 criyle/go-judge
```

The `--privileged` flag is used for container nesting, and the user program is running in restricted nested containers securely.

## Nix

If you have nix installed, you can install `go-judge` from [nixpkgs](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=go-judge)

```sh
nix-env -iA nixpkgs.go-judge
```

