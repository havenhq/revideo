# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 0.2.11 (2024-04-22)

### Bug Fixes

- change executable file permissions
  ([#38](https://github.com/havenhq/revideo/issues/38))
  ([23025a2](https://github.com/havenhq/revideo/commit/23025a2caefd993f7e4751b1efced3a25ed497a6))
- correct dependencies for create package
  ([#15](https://github.com/havenhq/revideo/issues/15))
  ([27a2737](https://github.com/havenhq/revideo/commit/27a273782f0f22fbe261712f26709c9708020b18))
- **create:** fix package type
  ([#40](https://github.com/havenhq/revideo/issues/40))
  ([f07aa5d](https://github.com/havenhq/revideo/commit/f07aa5d8f6c3485464ed3158187340c7db7d5af7))
- **create:** update templates
  ([#439](https://github.com/havenhq/revideo/issues/439))
  ([8483557](https://github.com/havenhq/revideo/commit/8483557f0a3ca7914aafacceab5d466abba59df0))
- fix scaffolding ([#93](https://github.com/havenhq/revideo/issues/93))
  ([95c55ed](https://github.com/havenhq/revideo/commit/95c55ed338127dad22f42b24c8f6b101b8863be7))
- move hardcoded imports and plugins outside of loop
  ([af6a4a9](https://github.com/havenhq/revideo/commit/af6a4a9e27a29b1e6d21139fb9dfff86dcc835da))
- **player:** visibility on white background
  ([#36](https://github.com/havenhq/revideo/issues/36))
  ([4376d11](https://github.com/havenhq/revideo/commit/4376d1170ee33f3a364a5f51a186a1e92fbf61b5))
- remove unnecessary rendererplugins to fix parameterized rendering
  ([#27](https://github.com/havenhq/revideo/issues/27))
  ([c5f9bd6](https://github.com/havenhq/revideo/commit/c5f9bd678b40fae532a1bc6b3c466a5d6920e4ac))
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
- publish package to npm ([#6](https://github.com/havenhq/revideo/issues/6))
  ([1e508b9](https://github.com/havenhq/revideo/commit/1e508b983d75cc7a647f5d6de5ce62ff4ec90953))
- support for multiple projects
  ([#57](https://github.com/havenhq/revideo/issues/57))
  ([573752d](https://github.com/havenhq/revideo/commit/573752dd4d79d62a1a30958f1ed550d2cf22c344)),
  closes [#141414](https://github.com/havenhq/revideo/issues/141414)
- update quickstart project in "create" package
  ([#11](https://github.com/havenhq/revideo/issues/11))
  ([7d30483](https://github.com/havenhq/revideo/commit/7d304834e2305d1fac0079ac057eaea3bcb33c66))
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
