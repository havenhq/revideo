# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.2.0 (2024-03-25)


### Bug Fixes

* change executable file permissions ([#38](https://github.com/havenhq/revideo/issues/38)) ([23025a2](https://github.com/havenhq/revideo/commit/23025a2caefd993f7e4751b1efced3a25ed497a6))
* correct dependencies for create package ([#15](https://github.com/havenhq/revideo/issues/15)) ([27a2737](https://github.com/havenhq/revideo/commit/27a273782f0f22fbe261712f26709c9708020b18))
* **create:** fix package type ([#40](https://github.com/havenhq/revideo/issues/40)) ([f07aa5d](https://github.com/havenhq/revideo/commit/f07aa5d8f6c3485464ed3158187340c7db7d5af7))
* **create:** update templates ([#439](https://github.com/havenhq/revideo/issues/439)) ([8483557](https://github.com/havenhq/revideo/commit/8483557f0a3ca7914aafacceab5d466abba59df0))
* fix scaffolding ([#93](https://github.com/havenhq/revideo/issues/93)) ([95c55ed](https://github.com/havenhq/revideo/commit/95c55ed338127dad22f42b24c8f6b101b8863be7))
* **vite-plugin:** fix js template ([#337](https://github.com/havenhq/revideo/issues/337)) ([3b33d73](https://github.com/havenhq/revideo/commit/3b33d73416541d491b633bada29f085f5489f6c2))


### Code Refactoring

* remove legacy package ([6a84120](https://github.com/havenhq/revideo/commit/6a84120d949a32dff0ad413a9f359510ff109af1))


### Features

* add scaffolding package ([#36](https://github.com/havenhq/revideo/issues/36)) ([266a561](https://github.com/havenhq/revideo/commit/266a561c619b57b403ec9c64185985b48bff29da)), closes [#30](https://github.com/havenhq/revideo/issues/30)
* **create:** add exporter selection ([#673](https://github.com/havenhq/revideo/issues/673)) ([82fd47d](https://github.com/havenhq/revideo/commit/82fd47d93ffad6125a685880a132ce0d3a388693))
* **create:** include simple animation ([#931](https://github.com/havenhq/revideo/issues/931)) ([925f63f](https://github.com/havenhq/revideo/commit/925f63f3588922224511b1687ac44ba7b9920d83))
* **create:** support command-line arguments ([#668](https://github.com/havenhq/revideo/issues/668)) ([fa62a98](https://github.com/havenhq/revideo/commit/fa62a9868d5cd33f1cb6ac5f147cca81917457dc))
* extract konva to separate package ([#60](https://github.com/havenhq/revideo/issues/60)) ([4ecad3c](https://github.com/havenhq/revideo/commit/4ecad3ca2732bd5147af670c230f8f959129a707))
* make scenes independent of names ([#53](https://github.com/havenhq/revideo/issues/53)) ([417617e](https://github.com/havenhq/revideo/commit/417617eb5f0af771e7413c9ce4c7e9b998e3e490)), closes [#25](https://github.com/havenhq/revideo/issues/25)
* publish package to npm ([#6](https://github.com/havenhq/revideo/issues/6)) ([1e508b9](https://github.com/havenhq/revideo/commit/1e508b983d75cc7a647f5d6de5ce62ff4ec90953))
* support for multiple projects ([#57](https://github.com/havenhq/revideo/issues/57)) ([573752d](https://github.com/havenhq/revideo/commit/573752dd4d79d62a1a30958f1ed550d2cf22c344)), closes [#141414](https://github.com/havenhq/revideo/issues/141414)
* update quickstart project in "create" package ([#11](https://github.com/havenhq/revideo/issues/11)) ([7d30483](https://github.com/havenhq/revideo/commit/7d304834e2305d1fac0079ac057eaea3bcb33c66))
* update vite from v3 to v4 ([#495](https://github.com/havenhq/revideo/issues/495)) ([c409eee](https://github.com/havenhq/revideo/commit/c409eee0e61b67e43afed240c5ae279714681246)), closes [#197](https://github.com/havenhq/revideo/issues/197)


### Reverts

* "ci(release): 9.1.3 [skip ci]" ([62953a6](https://github.com/havenhq/revideo/commit/62953a6a8a1b1da3eb2e5f51c9fe60c716d6b94b))
* ci(release): 1.0.1 [skip ci] ([#175](https://github.com/havenhq/revideo/issues/175)) ([161a046](https://github.com/havenhq/revideo/commit/161a04647ecdc8203daf2d887a6a44c79a92ee20))
* ci(release): 2.0.0 [skip ci] ([#176](https://github.com/havenhq/revideo/issues/176)) ([551096b](https://github.com/havenhq/revideo/commit/551096bf636a791ea7c7c1d38d8e03c360433008))
* ci(release): 3.12.4 [skip ci] ([#908](https://github.com/havenhq/revideo/issues/908)) ([86c5170](https://github.com/havenhq/revideo/commit/86c517067c7225f827aa05b47e2397e0d90fe622))


### BREAKING CHANGES

* remove legacy package
* change to import paths

See [the migration guide](https://motion-canvas.github.io/guides/migration/12.0.0) for more info.
* change the way scenes are imported

Scene files no longer need to follow the pattern: `[name].scene.tsx`.
When importing scenes in the project file, a dedicated `?scene` query param should be used:
```ts
import example from './scenes/example?scene';

export default new Project({
  name: 'project',
  scenes: [example],
});
```







**Note:** Version bump only for package @revideo/create







**Note:** Version bump only for package @revideo/create





# 0.2.0 (2024-03-25)


### Bug Fixes

* change executable file permissions ([#38](https://github.com/havenhq/revideo/issues/38)) ([23025a2](https://github.com/havenhq/revideo/commit/23025a2caefd993f7e4751b1efced3a25ed497a6))
* correct dependencies for create package ([#15](https://github.com/havenhq/revideo/issues/15)) ([27a2737](https://github.com/havenhq/revideo/commit/27a273782f0f22fbe261712f26709c9708020b18))
* **create:** fix package type ([#40](https://github.com/havenhq/revideo/issues/40)) ([f07aa5d](https://github.com/havenhq/revideo/commit/f07aa5d8f6c3485464ed3158187340c7db7d5af7))
* **create:** update templates ([#439](https://github.com/havenhq/revideo/issues/439)) ([8483557](https://github.com/havenhq/revideo/commit/8483557f0a3ca7914aafacceab5d466abba59df0))
* fix scaffolding ([#93](https://github.com/havenhq/revideo/issues/93)) ([95c55ed](https://github.com/havenhq/revideo/commit/95c55ed338127dad22f42b24c8f6b101b8863be7))
* **vite-plugin:** fix js template ([#337](https://github.com/havenhq/revideo/issues/337)) ([3b33d73](https://github.com/havenhq/revideo/commit/3b33d73416541d491b633bada29f085f5489f6c2))


### Code Refactoring

* remove legacy package ([6a84120](https://github.com/havenhq/revideo/commit/6a84120d949a32dff0ad413a9f359510ff109af1))


### Features

* add scaffolding package ([#36](https://github.com/havenhq/revideo/issues/36)) ([266a561](https://github.com/havenhq/revideo/commit/266a561c619b57b403ec9c64185985b48bff29da)), closes [#30](https://github.com/havenhq/revideo/issues/30)
* **create:** add exporter selection ([#673](https://github.com/havenhq/revideo/issues/673)) ([82fd47d](https://github.com/havenhq/revideo/commit/82fd47d93ffad6125a685880a132ce0d3a388693))
* **create:** include simple animation ([#931](https://github.com/havenhq/revideo/issues/931)) ([925f63f](https://github.com/havenhq/revideo/commit/925f63f3588922224511b1687ac44ba7b9920d83))
* **create:** support command-line arguments ([#668](https://github.com/havenhq/revideo/issues/668)) ([fa62a98](https://github.com/havenhq/revideo/commit/fa62a9868d5cd33f1cb6ac5f147cca81917457dc))
* extract konva to separate package ([#60](https://github.com/havenhq/revideo/issues/60)) ([4ecad3c](https://github.com/havenhq/revideo/commit/4ecad3ca2732bd5147af670c230f8f959129a707))
* make scenes independent of names ([#53](https://github.com/havenhq/revideo/issues/53)) ([417617e](https://github.com/havenhq/revideo/commit/417617eb5f0af771e7413c9ce4c7e9b998e3e490)), closes [#25](https://github.com/havenhq/revideo/issues/25)
* publish package to npm ([#6](https://github.com/havenhq/revideo/issues/6)) ([1e508b9](https://github.com/havenhq/revideo/commit/1e508b983d75cc7a647f5d6de5ce62ff4ec90953))
* support for multiple projects ([#57](https://github.com/havenhq/revideo/issues/57)) ([573752d](https://github.com/havenhq/revideo/commit/573752dd4d79d62a1a30958f1ed550d2cf22c344)), closes [#141414](https://github.com/havenhq/revideo/issues/141414)
* update quickstart project in "create" package ([#11](https://github.com/havenhq/revideo/issues/11)) ([7d30483](https://github.com/havenhq/revideo/commit/7d304834e2305d1fac0079ac057eaea3bcb33c66))
* update vite from v3 to v4 ([#495](https://github.com/havenhq/revideo/issues/495)) ([c409eee](https://github.com/havenhq/revideo/commit/c409eee0e61b67e43afed240c5ae279714681246)), closes [#197](https://github.com/havenhq/revideo/issues/197)


### Reverts

* "ci(release): 9.1.3 [skip ci]" ([62953a6](https://github.com/havenhq/revideo/commit/62953a6a8a1b1da3eb2e5f51c9fe60c716d6b94b))
* ci(release): 1.0.1 [skip ci] ([#175](https://github.com/havenhq/revideo/issues/175)) ([161a046](https://github.com/havenhq/revideo/commit/161a04647ecdc8203daf2d887a6a44c79a92ee20))
* ci(release): 2.0.0 [skip ci] ([#176](https://github.com/havenhq/revideo/issues/176)) ([551096b](https://github.com/havenhq/revideo/commit/551096bf636a791ea7c7c1d38d8e03c360433008))
* ci(release): 3.12.4 [skip ci] ([#908](https://github.com/havenhq/revideo/issues/908)) ([86c5170](https://github.com/havenhq/revideo/commit/86c517067c7225f827aa05b47e2397e0d90fe622))


### BREAKING CHANGES

* remove legacy package
* change to import paths

See [the migration guide](https://motion-canvas.github.io/guides/migration/12.0.0) for more info.
* change the way scenes are imported

Scene files no longer need to follow the pattern: `[name].scene.tsx`.
When importing scenes in the project file, a dedicated `?scene` query param should be used:
```ts
import example from './scenes/example?scene';

export default new Project({
  name: 'project',
  scenes: [example],
});
```





## [0.1.10](https://github.com/havenhq/revideo/compare/v0.1.9...v0.1.10) (2024-03-25)

**Note:** Version bump only for package @revideo/create





## [0.1.9](https://github.com/havenhq/revideo/compare/v0.1.8...v0.1.9) (2024-03-25)


### Bug Fixes

* dependencies ([7413ec1](https://github.com/havenhq/revideo/commit/7413ec13fd9397ad3b7c8cbb0a861423fbb40f1b))





## [0.1.8](https://github.com/havenhq/revideo/compare/v0.1.7...v0.1.8) (2024-03-25)


### Bug Fixes

* fix dependencies ([9d4a5e5](https://github.com/havenhq/revideo/commit/9d4a5e504c5c7f2e715517af9dd9c662458def9d))







**Note:** Version bump only for package @revideo/create





## [0.1.7](https://github.com/havenhq/revideo/compare/v1.6.0...v0.1.7) (2024-03-25)


### Bug Fixes

* fix dependencies ([0458bcd](https://github.com/havenhq/revideo/commit/0458bcd56ca41c02ceea1888ca0b7b6619430cc4))





# 1.6.0 (2024-03-25)


### Bug Fixes

* change executable file permissions ([#38](https://github.com/havenhq/revideo/issues/38)) ([23025a2](https://github.com/havenhq/revideo/commit/23025a2caefd993f7e4751b1efced3a25ed497a6))
* **create:** fix package type ([#40](https://github.com/havenhq/revideo/issues/40)) ([f07aa5d](https://github.com/havenhq/revideo/commit/f07aa5d8f6c3485464ed3158187340c7db7d5af7))
* **create:** update templates ([#439](https://github.com/havenhq/revideo/issues/439)) ([8483557](https://github.com/havenhq/revideo/commit/8483557f0a3ca7914aafacceab5d466abba59df0))
* fix scaffolding ([#93](https://github.com/havenhq/revideo/issues/93)) ([95c55ed](https://github.com/havenhq/revideo/commit/95c55ed338127dad22f42b24c8f6b101b8863be7))
* include renderer.html in renderer package ([7e0ef3f](https://github.com/havenhq/revideo/commit/7e0ef3ffb3bf16305ea68ac782ac76aaee7ff9c6))
* resolve dependency issues ([83a8253](https://github.com/havenhq/revideo/commit/83a8253937cedd7b5a02fc9bac842ce6ced464ac))
* **vite-plugin:** fix js template ([#337](https://github.com/havenhq/revideo/issues/337)) ([3b33d73](https://github.com/havenhq/revideo/commit/3b33d73416541d491b633bada29f085f5489f6c2))


### Code Refactoring

* remove legacy package ([6a84120](https://github.com/havenhq/revideo/commit/6a84120d949a32dff0ad413a9f359510ff109af1))


### Features

* add scaffolding package ([#36](https://github.com/havenhq/revideo/issues/36)) ([266a561](https://github.com/havenhq/revideo/commit/266a561c619b57b403ec9c64185985b48bff29da)), closes [#30](https://github.com/havenhq/revideo/issues/30)
* **create:** add exporter selection ([#673](https://github.com/havenhq/revideo/issues/673)) ([82fd47d](https://github.com/havenhq/revideo/commit/82fd47d93ffad6125a685880a132ce0d3a388693))
* **create:** include simple animation ([#931](https://github.com/havenhq/revideo/issues/931)) ([925f63f](https://github.com/havenhq/revideo/commit/925f63f3588922224511b1687ac44ba7b9920d83))
* **create:** support command-line arguments ([#668](https://github.com/havenhq/revideo/issues/668)) ([fa62a98](https://github.com/havenhq/revideo/commit/fa62a9868d5cd33f1cb6ac5f147cca81917457dc))
* extract konva to separate package ([#60](https://github.com/havenhq/revideo/issues/60)) ([4ecad3c](https://github.com/havenhq/revideo/commit/4ecad3ca2732bd5147af670c230f8f959129a707))
* make scenes independent of names ([#53](https://github.com/havenhq/revideo/issues/53)) ([417617e](https://github.com/havenhq/revideo/commit/417617eb5f0af771e7413c9ce4c7e9b998e3e490)), closes [#25](https://github.com/havenhq/revideo/issues/25)
* publish package to npm ([#6](https://github.com/havenhq/revideo/issues/6)) ([1e508b9](https://github.com/havenhq/revideo/commit/1e508b983d75cc7a647f5d6de5ce62ff4ec90953))
* support for multiple projects ([#57](https://github.com/havenhq/revideo/issues/57)) ([573752d](https://github.com/havenhq/revideo/commit/573752dd4d79d62a1a30958f1ed550d2cf22c344)), closes [#141414](https://github.com/havenhq/revideo/issues/141414)
* update quickstart project in "create" package ([#11](https://github.com/havenhq/revideo/issues/11)) ([7d30483](https://github.com/havenhq/revideo/commit/7d304834e2305d1fac0079ac057eaea3bcb33c66))
* update vite from v3 to v4 ([#495](https://github.com/havenhq/revideo/issues/495)) ([c409eee](https://github.com/havenhq/revideo/commit/c409eee0e61b67e43afed240c5ae279714681246)), closes [#197](https://github.com/havenhq/revideo/issues/197)


### Reverts

* "ci(release): 9.1.3 [skip ci]" ([62953a6](https://github.com/havenhq/revideo/commit/62953a6a8a1b1da3eb2e5f51c9fe60c716d6b94b))
* ci(release): 1.0.1 [skip ci] ([#175](https://github.com/havenhq/revideo/issues/175)) ([161a046](https://github.com/havenhq/revideo/commit/161a04647ecdc8203daf2d887a6a44c79a92ee20))
* ci(release): 2.0.0 [skip ci] ([#176](https://github.com/havenhq/revideo/issues/176)) ([551096b](https://github.com/havenhq/revideo/commit/551096bf636a791ea7c7c1d38d8e03c360433008))
* ci(release): 3.12.4 [skip ci] ([#908](https://github.com/havenhq/revideo/issues/908)) ([86c5170](https://github.com/havenhq/revideo/commit/86c517067c7225f827aa05b47e2397e0d90fe622))


### BREAKING CHANGES

* remove legacy package
* change to import paths

See [the migration guide](https://motion-canvas.github.io/guides/migration/12.0.0) for more info.
* change the way scenes are imported

Scene files no longer need to follow the pattern: `[name].scene.tsx`.
When importing scenes in the project file, a dedicated `?scene` query param should be used:
```ts
import example from './scenes/example?scene';

export default new Project({
  name: 'project',
  scenes: [example],
});
```





# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.1.3](https://github.com/havenhq/revideo/compare/v0.1.2...v0.1.3) (2024-03-17)

### Bug Fixes

- revert version bump to 0.1.1
  ([998aca2](https://github.com/havenhq/revideo/commit/998aca20439d46bb804fd8bf9b3776639bfb8103))

## [0.1.2](https://github.com/havenhq/revideo/compare/v0.1.1...v0.1.2) (2024-03-17)

### Bug Fixes

- bump up ffmpeg version in quickstart
  ([aaefb4b](https://github.com/havenhq/revideo/commit/aaefb4bf928a6d64ff6f79f2e5f2613d62f8cc2d))

## [0.1.1](https://github.com/havenhq/revideo/compare/v0.1.0...v0.1.1) (2024-03-17)

### Bug Fixes

- resolve import issues in quickstart project
  ([e839086](https://github.com/havenhq/revideo/commit/e8390869c087c92c9d448cd16e9cc648d6b2dbe0))

**Note:** Version bump only for package @revideo/create

# 0.1.0 (2024-03-17)

### Bug Fixes

- change executable file permissions
  ([#38](https://github.com/havenhq/revideo/issues/38))
  ([23025a2](https://github.com/havenhq/revideo/commit/23025a2caefd993f7e4751b1efced3a25ed497a6))
- **create:** fix package type
  ([#40](https://github.com/havenhq/revideo/issues/40))
  ([f07aa5d](https://github.com/havenhq/revideo/commit/f07aa5d8f6c3485464ed3158187340c7db7d5af7))
- **create:** update templates
  ([#439](https://github.com/havenhq/revideo/issues/439))
  ([8483557](https://github.com/havenhq/revideo/commit/8483557f0a3ca7914aafacceab5d466abba59df0))
- fix scaffolding ([#93](https://github.com/havenhq/revideo/issues/93))
  ([95c55ed](https://github.com/havenhq/revideo/commit/95c55ed338127dad22f42b24c8f6b101b8863be7))
- **vite-plugin:** fix js template
  ([#337](https://github.com/havenhq/revideo/issues/337))
  ([3b33d73](https://github.com/havenhq/revideo/commit/3b33d73416541d491b633bada29f085f5489f6c2))

### Code Refactoring

- remove legacy package
  ([6a84120](https://github.com/havenhq/revideo/commit/6a84120d949a32dff0ad413a9f359510ff109af1))

### Features

- add scaffolding package ([#36](https://github.com/havenhq/revideo/issues/36))
  ([266a561](https://github.com/havenhq/revideo/commit/266a561c619b57b403ec9c64185985b48bff29da)),
  closes [#30](https://github.com/havenhq/revideo/issues/30)
- **create:** add exporter selection
  ([#673](https://github.com/havenhq/revideo/issues/673))
  ([82fd47d](https://github.com/havenhq/revideo/commit/82fd47d93ffad6125a685880a132ce0d3a388693))
- **create:** include simple animation
  ([#931](https://github.com/havenhq/revideo/issues/931))
  ([925f63f](https://github.com/havenhq/revideo/commit/925f63f3588922224511b1687ac44ba7b9920d83))
- **create:** support command-line arguments
  ([#668](https://github.com/havenhq/revideo/issues/668))
  ([fa62a98](https://github.com/havenhq/revideo/commit/fa62a9868d5cd33f1cb6ac5f147cca81917457dc))
- extract konva to separate package
  ([#60](https://github.com/havenhq/revideo/issues/60))
  ([4ecad3c](https://github.com/havenhq/revideo/commit/4ecad3ca2732bd5147af670c230f8f959129a707))
- make scenes independent of names
  ([#53](https://github.com/havenhq/revideo/issues/53))
  ([417617e](https://github.com/havenhq/revideo/commit/417617eb5f0af771e7413c9ce4c7e9b998e3e490)),
  closes [#25](https://github.com/havenhq/revideo/issues/25)
- support for multiple projects
  ([#57](https://github.com/havenhq/revideo/issues/57))
  ([573752d](https://github.com/havenhq/revideo/commit/573752dd4d79d62a1a30958f1ed550d2cf22c344)),
  closes [#141414](https://github.com/havenhq/revideo/issues/141414)
- update vite from v3 to v4
  ([#495](https://github.com/havenhq/revideo/issues/495))
  ([c409eee](https://github.com/havenhq/revideo/commit/c409eee0e61b67e43afed240c5ae279714681246)),
  closes [#197](https://github.com/havenhq/revideo/issues/197)

### Reverts

- "ci(release): 9.1.3 [skip ci]"
  ([62953a6](https://github.com/havenhq/revideo/commit/62953a6a8a1b1da3eb2e5f51c9fe60c716d6b94b))
- ci(release): 1.0.1 [skip ci]
  ([#175](https://github.com/havenhq/revideo/issues/175))
  ([161a046](https://github.com/havenhq/revideo/commit/161a04647ecdc8203daf2d887a6a44c79a92ee20))
- ci(release): 2.0.0 [skip ci]
  ([#176](https://github.com/havenhq/revideo/issues/176))
  ([551096b](https://github.com/havenhq/revideo/commit/551096bf636a791ea7c7c1d38d8e03c360433008))
- ci(release): 3.12.4 [skip ci]
  ([#908](https://github.com/havenhq/revideo/issues/908))
  ([86c5170](https://github.com/havenhq/revideo/commit/86c517067c7225f827aa05b47e2397e0d90fe622))

### BREAKING CHANGES

- remove legacy package
- change to import paths

See
[the migration guide](https://motion-canvas.github.io/guides/migration/12.0.0)
for more info.

- change the way scenes are imported

Scene files no longer need to follow the pattern: `[name].scene.tsx`. When
importing scenes in the project file, a dedicated `?scene` query param should be
used:

```ts
import example from './scenes/example?scene';

export default new Project({
  name: 'project',
  scenes: [example],
});
```

## [3.14.2](https://github.com/revideo/revideo/compare/v3.14.1...v3.14.2) (2024-02-08)

**Note:** Version bump only for package @revideo/create

## [3.14.1](https://github.com/revideo/revideo/compare/v3.14.0...v3.14.1) (2024-02-06)

**Note:** Version bump only for package @revideo/create

# [3.14.0](https://github.com/revideo/revideo/compare/v3.13.0...v3.14.0) (2024-02-04)

### Features

- **create:** include simple animation
  ([#931](https://github.com/revideo/revideo/issues/931))
  ([925f63f](https://github.com/revideo/revideo/commit/925f63f3588922224511b1687ac44ba7b9920d83))

# [3.13.0](https://github.com/revideo/revideo/compare/v3.12.4...v3.13.0) (2024-01-10)

**Note:** Version bump only for package @revideo/create

## [3.12.4](https://github.com/revideo/revideo/compare/v3.12.3...v3.12.4) (2024-01-05)

### Reverts

- ci(release): 3.12.4 [skip ci]
  ([#908](https://github.com/revideo/revideo/issues/908))
  ([86c5170](https://github.com/revideo/revideo/commit/86c517067c7225f827aa05b47e2397e0d90fe622))

## [3.12.3](https://github.com/revideo/revideo/compare/v3.12.2...v3.12.3) (2024-01-04)

**Note:** Version bump only for package @revideo/create

## [3.12.2](https://github.com/revideo/revideo/compare/v3.12.1...v3.12.2) (2023-12-31)

**Note:** Version bump only for package @revideo/create

## [3.12.1](https://github.com/revideo/revideo/compare/v3.12.0...v3.12.1) (2023-12-31)

**Note:** Version bump only for package @revideo/create

# [3.12.0](https://github.com/revideo/revideo/compare/v3.11.0...v3.12.0) (2023-12-31)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.11.0](https://github.com/revideo/revideo/compare/v3.10.1...v3.11.0) (2023-10-13)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.10.1](https://github.com/revideo/revideo/compare/v3.10.0...v3.10.1) (2023-07-25)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.10.0](https://github.com/revideo/revideo/compare/v3.9.0...v3.10.0) (2023-07-23)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.9.0](https://github.com/revideo/revideo/compare/v3.8.0...v3.9.0) (2023-05-29)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.8.0](https://github.com/revideo/revideo/compare/v3.7.0...v3.8.0) (2023-05-13)

### Features

- **create:** add exporter selection
  ([#673](https://github.com/revideo/revideo/issues/673))
  ([82fd47d](https://github.com/revideo/revideo/commit/82fd47d93ffad6125a685880a132ce0d3a388693))
- **create:** support command-line arguments
  ([#668](https://github.com/revideo/revideo/issues/668))
  ([fa62a98](https://github.com/revideo/revideo/commit/fa62a9868d5cd33f1cb6ac5f147cca81917457dc))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.7.0](https://github.com/revideo/revideo/compare/v3.6.2...v3.7.0) (2023-05-10)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.6.2](https://github.com/revideo/revideo/compare/v3.6.1...v3.6.2) (2023-05-09)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.6.1](https://github.com/revideo/revideo/compare/v3.6.0...v3.6.1) (2023-05-08)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.6.0](https://github.com/revideo/revideo/compare/v3.5.1...v3.6.0) (2023-05-08)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.5.1](https://github.com/revideo/revideo/compare/v3.5.0...v3.5.1) (2023-04-08)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.5.0](https://github.com/revideo/revideo/compare/v3.4.0...v3.5.0) (2023-04-06)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.4.0](https://github.com/revideo/revideo/compare/v3.3.4...v3.4.0) (2023-03-28)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.3.4](https://github.com/revideo/revideo/compare/v3.3.3...v3.3.4) (2023-03-19)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.3.3](https://github.com/revideo/revideo/compare/v3.3.2...v3.3.3) (2023-03-18)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.3.2](https://github.com/revideo/revideo/compare/v3.3.1...v3.3.2) (2023-03-18)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.3.1](https://github.com/revideo/revideo/compare/v3.3.0...v3.3.1) (2023-03-18)

**Note:** Version bump only for package @revideo/create

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.3.0](https://github.com/revideo/revideo/compare/v3.2.1...v3.3.0) (2023-03-18)

### Features

- update vite from v3 to v4
  ([#495](https://github.com/revideo/revideo/issues/495))
  ([c409eee](https://github.com/revideo/revideo/commit/c409eee0e61b67e43afed240c5ae279714681246)),
  closes [#197](https://github.com/revideo/revideo/issues/197)

## [3.2.1](https://github.com/revideo/revideo/compare/v3.2.0...v3.2.1) (2023-03-10)

**Note:** Version bump only for package @revideo/create

# [3.2.0](https://github.com/revideo/revideo/compare/v3.1.0...v3.2.0) (2023-03-10)

**Note:** Version bump only for package @revideo/create

# [3.1.0](https://github.com/revideo/revideo/compare/v3.0.2...v3.1.0) (2023-03-07)

**Note:** Version bump only for package @revideo/create

## [3.0.2](https://github.com/revideo/revideo/compare/v3.0.1...v3.0.2) (2023-02-27)

**Note:** Version bump only for package @revideo/create

## [3.0.1](https://github.com/revideo/revideo/compare/v3.0.0...v3.0.1) (2023-02-27)

### Bug Fixes

- **create:** update templates
  ([#439](https://github.com/revideo/revideo/issues/439))
  ([8483557](https://github.com/revideo/revideo/commit/8483557f0a3ca7914aafacceab5d466abba59df0))

# [3.0.0](https://github.com/revideo/revideo/compare/v2.6.0...v3.0.0) (2023-02-27)

**Note:** Version bump only for package @revideo/create

# [2.6.0](https://github.com/revideo/revideo/compare/v2.5.0...v2.6.0) (2023-02-24)

**Note:** Version bump only for package @revideo/create

# [2.5.0](https://github.com/revideo/revideo/compare/v2.4.0...v2.5.0) (2023-02-20)

**Note:** Version bump only for package @revideo/create

# [2.4.0](https://github.com/revideo/revideo/compare/v2.3.0...v2.4.0) (2023-02-18)

### Bug Fixes

- **vite-plugin:** fix js template
  ([#337](https://github.com/revideo/revideo/issues/337))
  ([3b33d73](https://github.com/revideo/revideo/commit/3b33d73416541d491b633bada29f085f5489f6c2))

# [2.3.0](https://github.com/revideo/revideo/compare/v2.2.0...v2.3.0) (2023-02-11)

**Note:** Version bump only for package @revideo/create

# [2.2.0](https://github.com/revideo/revideo/compare/v2.1.0...v2.2.0) (2023-02-09)

**Note:** Version bump only for package @revideo/create

# [2.1.0](https://github.com/revideo/revideo/compare/v2.0.0...v2.1.0) (2023-02-07)

**Note:** Version bump only for package @revideo/create

# 2.0.0 (2023-02-04)

### Bug Fixes

- change executable file permissions
  ([#38](https://github.com/revideo/revideo/issues/38))
  ([23025a2](https://github.com/revideo/revideo/commit/23025a2caefd993f7e4751b1efced3a25ed497a6))
- **create:** fix package type
  ([#40](https://github.com/revideo/revideo/issues/40))
  ([f07aa5d](https://github.com/revideo/revideo/commit/f07aa5d8f6c3485464ed3158187340c7db7d5af7))
- fix scaffolding ([#93](https://github.com/revideo/revideo/issues/93))
  ([95c55ed](https://github.com/revideo/revideo/commit/95c55ed338127dad22f42b24c8f6b101b8863be7))

### Code Refactoring

- remove legacy package
  ([6a84120](https://github.com/revideo/revideo/commit/6a84120d949a32dff0ad413a9f359510ff109af1))

### Features

- add scaffolding package ([#36](https://github.com/revideo/revideo/issues/36))
  ([266a561](https://github.com/revideo/revideo/commit/266a561c619b57b403ec9c64185985b48bff29da)),
  closes [#30](https://github.com/revideo/revideo/issues/30)
- extract konva to separate package
  ([#60](https://github.com/revideo/revideo/issues/60))
  ([4ecad3c](https://github.com/revideo/revideo/commit/4ecad3ca2732bd5147af670c230f8f959129a707))
- make scenes independent of names
  ([#53](https://github.com/revideo/revideo/issues/53))
  ([417617e](https://github.com/revideo/revideo/commit/417617eb5f0af771e7413c9ce4c7e9b998e3e490)),
  closes [#25](https://github.com/revideo/revideo/issues/25)
- support for multiple projects
  ([#57](https://github.com/revideo/revideo/issues/57))
  ([573752d](https://github.com/revideo/revideo/commit/573752dd4d79d62a1a30958f1ed550d2cf22c344)),
  closes [#141414](https://github.com/revideo/revideo/issues/141414)

### Reverts

- "ci(release): 9.1.3 [skip ci]"
  ([62953a6](https://github.com/revideo/revideo/commit/62953a6a8a1b1da3eb2e5f51c9fe60c716d6b94b))
- ci(release): 1.0.1 [skip ci]
  ([#175](https://github.com/revideo/revideo/issues/175))
  ([161a046](https://github.com/revideo/revideo/commit/161a04647ecdc8203daf2d887a6a44c79a92ee20))
- ci(release): 2.0.0 [skip ci]
  ([#176](https://github.com/revideo/revideo/issues/176))
  ([551096b](https://github.com/revideo/revideo/commit/551096bf636a791ea7c7c1d38d8e03c360433008))

### BREAKING CHANGES

- remove legacy package
- change to import paths

See [the migration guide](https://revideo.github.io/guides/migration/12.0.0) for
more info.

- change the way scenes are imported

Scene files no longer need to follow the pattern: `[name].scene.tsx`. When
importing scenes in the project file, a dedicated `?scene` query param should be
used:

```ts
import example from './scenes/example?scene';

export default new Project({
  name: 'project',
  scenes: [example],
});
```
