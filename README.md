<br/>
<p align="center">
  <a href="https://re.video">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./logo_dark.svg">
      <img width="360" alt="Revideo logo" src="./logo.svg">
    </picture>
  </a>
</p
<p align="center">
  <a href="https://lerna.js.org"><img src="https://img.shields.io/badge/published%20with-lerna-c084fc?style=flat" alt="published with lerna"></a>
  <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/powered%20by-vite-646cff?style=flat" alt="powered by vite"></a>
  <a href="https://www.npmjs.com/package/@revideo/core"><img src="https://img.shields.io/npm/v/@revideo/core?style=flat" alt="npm package version"></a>
  <a href="https://discord.com/invite/JDjbfp6q2G"><img src="https://img.shields.io/discord/1071029581009657896?style=flat&logo=discord&logoColor=fff&color=404eed" alt="discord"></a>
</p>
<br/>

# Revideo - Create Videos with Code

Revideo is an open source framework for programmatic video editing. It is forked from the amazing [Motion Canvas](https://motioncanvas.io/) editor, with the goal of turning it from a standalone application into a library that developers can use to build entire video editing apps. 

Revideo lets you create video templates in Typescript and deploy an API endpoint to render them with dynamic inputs, and also provides a React player component to provide real-time preview in the browser. If you want to learn more, you can check out our [docs](https://docs.re.video/), our [examples repository](https://github.com/redotvideo/revideo-examples), and join our [Discord server](https://discord.com/invite/MVJsrqjy3j).


#### News 🔥

- [05/21/2024] We have released an [example](https://github.com/redotvideo/revideo-examples/tree/main/google-cloud-run-parallelized) on how to parallelize rendering jobs with Google Cloud Functions
- [05/20/2024] We have a [new website](https://re.video/)!

<br/>

## Getting Started

To create an example project, run the following command:

```bash
npm init @revideo@latest
```

The example project will have the following code, which defines the video shown
below.

```tsx
import {Audio, Img, Video, makeScene2D} from '@revideo/2d';
import {all, chain, createRef, waitFor} from '@revideo/core';

export default makeScene2D(function* (view) {
  const logoRef = createRef<Img>();

  yield view.add(
    <>
      <Video
        src={'https://revideo-example-assets.s3.amazonaws.com/stars.mp4'}
        size={['100%', '100%']}
        play={true}
      />
      <Audio
        src={'https://revideo-example-assets.s3.amazonaws.com/chill-beat.mp3'}
        play={true}
        time={17.0}
      />
    </>,
  );

  yield* waitFor(1);

  view.add(
    <Img
      width={'1%'}
      ref={logoRef}
      src={
        'https://revideo-example-assets.s3.amazonaws.com/revideo-logo-white.png'
      }
    />,
  );

  yield* chain(
    all(logoRef().scale(40, 2), logoRef().rotation(360, 2)),
    logoRef().scale(60, 1),
  );
});
```

https://github.com/havenhq/revideo/assets/122226645/4d4e56ba-5143-4e4b-9acf-d8a04330d162

<br/>

## Differences between Revideo and Motion Canvas

Motion Canvas is a [standalone editor](https://github.com/orgs/motion-canvas/discussions/1015) for animations that happens to be distributed as an npm package, while Revideo aims to be a library that developers can build on top of to create their own video editing apps. These goals are somewhat conflicting, and Motion Canvas' plugin API is not yet flexible enough to enable the changes we want to make, which is why we decided to fork the project (our [blog post](https://re.video/blog/fork) explains this in detail).

Concretely, some of the differences to Motion Canvas are the following ones:

- **Headless Rendering:** Motion Canvas currently requires you to press a button in its UI to render a video. We have exposed this functionality as a [function call](https://docs.re.video/renderer/renderVideo/) and are making it possible to deploy a rendering API to services like Google Cloud Run ([example](https://github.com/redotvideo/revideo-examples/tree/main/google-cloud-run), or to use our CLI to expose a rendering endpoint from your Revideo project ([docs](https://docs.re.video/render-endpoint))
- **Faster Rendering:** When building an app rather than creating videos for yourself, rendering speeds are quite important. We have sped up rendering speeds by enabling [parallelized rendering](https://github.com/redotvideo/revideo/pull/74) and replacing the `seek()` operation for HTML video with our ffmpeg-based [video frame extractor](https://github.com/redotvideo/revideo/pull/33)
- **Better Audio Support:** We have enabled audio export from `<Video/>` tags during rendering, and have also added an `<Audio/>` tag that makes it easy to synchronize audio with your animations.



## Telemetry

To understand how people use Revideo, we **anonymously** track how many videos
are rendered using the open-source tool
[Posthog](https://github.com/PostHog/posthog). You can find our code
implementing Posthog
[here](https://github.com/redotvideo/revideo/tree/main/packages/ffmpeg/server/telemetry).

If you want to disable telemetry, just set the following environent variable:

```bash
DISABLE_TELEMETRY=true
```

## Learn More

To learn more about Revideo, feel free to check out our
[documentation](http://docs.re.video/) or join our
[Discord server](https://discord.gg/hexYBZGBY8).
