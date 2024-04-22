# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 0.2.11 (2024-04-22)


### Bug Fixes

* calculate audio padding according to input sample rate, not target sample rate ([#41](https://github.com/havenhq/revideo/issues/41)) ([cae94e5](https://github.com/havenhq/revideo/commit/cae94e5b1017d31688028d8a3de9b86916580155))
* correct dependencies for create package ([#15](https://github.com/havenhq/revideo/issues/15)) ([27a2737](https://github.com/havenhq/revideo/commit/27a273782f0f22fbe261712f26709c9708020b18))
* **ffmpeg:** check if audio stream is present in video before extracting ([#12](https://github.com/havenhq/revideo/issues/12)) ([1234fd1](https://github.com/havenhq/revideo/commit/1234fd17769ca332061b4252aa770ea623a5348a))
* remove console.log ([#25](https://github.com/havenhq/revideo/issues/25)) ([dd376bc](https://github.com/havenhq/revideo/commit/dd376bcd2ad6ba21dc5b5ff564fe70d7bc52a2f7))
* resolve asset file paths differently when they are inside project ([#5](https://github.com/havenhq/revideo/issues/5)) ([e0a3917](https://github.com/havenhq/revideo/commit/e0a39175a34f501ffce0fa4508c83e84244fd43c))
* resolve path correctly when file is in public folder ([#8](https://github.com/havenhq/revideo/issues/8)) ([d1a74a4](https://github.com/havenhq/revideo/commit/d1a74a4b0aaf89a535d7e7f95ce51de8ba3aaa78))
* resolve remote file urls in exporter correctly ([#7](https://github.com/havenhq/revideo/issues/7)) ([1807191](https://github.com/havenhq/revideo/commit/18071918fa295f83a9d12f885d2079965a694d7f))
* surface error ([#38](https://github.com/havenhq/revideo/issues/38)) ([15cddfb](https://github.com/havenhq/revideo/commit/15cddfba081c79d0315cbfa02cd448bab5817195))


### Features

* add volume parameter for media and make playbackrate work with audio export ([#9](https://github.com/havenhq/revideo/issues/9)) ([9e0d67b](https://github.com/havenhq/revideo/commit/9e0d67bade97ab6aefb9198c3b7910e26a857ffa))
* expose revideo project as web service ([#29](https://github.com/havenhq/revideo/issues/29)) ([c2a2a96](https://github.com/havenhq/revideo/commit/c2a2a96db199f772471833cf51bddd2574f08289))
* publish package to npm ([#6](https://github.com/havenhq/revideo/issues/6)) ([1e508b9](https://github.com/havenhq/revideo/commit/1e508b983d75cc7a647f5d6de5ce62ff4ec90953))
* range parameters for rendering ([#56](https://github.com/havenhq/revideo/issues/56)) ([794a37e](https://github.com/havenhq/revideo/commit/794a37e9553bec4f15176cda991bbc513b8e2aea))
* **renderer:** use ffmpeg to step through frames of video elements ([#33](https://github.com/havenhq/revideo/issues/33)) ([a6e1bcd](https://github.com/havenhq/revideo/commit/a6e1bcdf0ca8200d646a3bca65122b50120f1013))


### Performance Improvements

* parallelize image and audio processing during render ([#61](https://github.com/havenhq/revideo/issues/61)) ([2119a01](https://github.com/havenhq/revideo/commit/2119a0179636a91e1f2fd86f7857814a6a907407))
