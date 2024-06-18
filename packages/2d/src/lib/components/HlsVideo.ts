import {
  BBox,
  DependencyContext,
  PlaybackState,
  SerializedVector2,
  SignalValue,
  SimpleSignal,
  viaProxy,
} from '@revideo/core';
import Hls from 'hls.js';
import {computed, initial, nodeName, signal} from '../decorators';
import {DesiredLength} from '../partials';
import {drawImage} from '../utils';
import {Media, MediaProps} from './Media';

export interface HlsVideoProps extends MediaProps {
  /**
   * {@inheritDoc Video.alpha}
   */
  alpha?: SignalValue<number>;
  /**
   * {@inheritDoc Video.smoothing}
   */
  smoothing?: SignalValue<boolean>;
  /**
   * {@inheritDoc Video.png}
   */
  png?: SignalValue<boolean>;
}

@nodeName('HlsVideo')
export class HlsVideo extends Media {
  /**
   * The alpha value of this video.
   *
   * @remarks
   * Unlike opacity, the alpha value affects only the video itself, leaving the
   * fill, stroke, and children intact.
   */
  @initial(1)
  @signal()
  public declare readonly alpha: SimpleSignal<number, this>;

  /**
   * Whether the video should be smoothed.
   *
   * @remarks
   * When disabled, the video will be scaled using the nearest neighbor
   * interpolation with no smoothing. The resulting video will appear pixelated.
   *
   * @defaultValue true
   */
  @initial(true)
  @signal()
  public declare readonly smoothing: SimpleSignal<boolean, this>;

  /**
   * Whether the video frames should be extracted as PNGs. Uses JPEGs when
   * set to false.
   *
   * @remarks
   * PNGs have better image quality and support transparency, but they make
   * rendering slower.
   *
   * @defaultValue false
   */
  @initial(true)
  @signal()
  public declare readonly png: SimpleSignal<boolean, this>;

  private static readonly pool: Record<string, HTMLVideoElement> = {};

  public constructor(props: HlsVideoProps) {
    super(props);
  }

  protected override desiredSize(): SerializedVector2<DesiredLength> {
    const custom = super.desiredSize();
    if (custom.x === null && custom.y === null) {
      const image = this.video();
      return {
        x: image.videoWidth,
        y: image.videoHeight,
      };
    }

    return custom;
  }

  protected mediaElement(): HTMLVideoElement {
    return this.video();
  }

  protected seekedMedia(): HTMLVideoElement {
    return this.seekedVideo();
  }

  protected fastSeekedMedia(): HTMLVideoElement {
    return this.fastSeekedVideo();
  }

  @computed()
  private video(): HTMLVideoElement {
    const src = viaProxy(this.fullSource());
    const key = `${this.key}/${src}`;
    let video = HlsVideo.pool[key];
    if (!video) {
      video = document.createElement('video');
      video.crossOrigin = 'anonymous';

      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      HlsVideo.pool[key] = video;
    }

    if (video.readyState < 2) {
      DependencyContext.collectPromise(
        new Promise<void>(resolve => {
          const onCanPlay = () => {
            resolve();
            video.removeEventListener('canplay', onCanPlay);
          };

          const onError = () => {
            const reason = this.getErrorReason(video.error?.code);
            console.log(`ERROR: Error loading video: ${src}, ${reason}`);
          };

          video.addEventListener('canplay', onCanPlay);
          video.addEventListener('error', onError);
        }),
      );
    }

    return video;
  }

  @computed()
  protected seekedVideo(): HTMLVideoElement {
    const video = this.video();
    const time = this.clampTime(this.time());

    video.playbackRate = this.playbackRate();

    if (!video.paused) {
      video.pause();
    }

    if (this.lastTime === time) {
      return video;
    }

    this.setCurrentTime(time);

    return video;
  }

  @computed()
  protected fastSeekedVideo(): HTMLVideoElement {
    const video = this.video();
    const time = this.clampTime(this.time());

    video.playbackRate = this.playbackRate();

    if (this.lastTime === time) {
      return video;
    }

    const playing =
      this.playing() && time < video.duration && video.playbackRate > 0;
    if (playing) {
      if (video.paused) {
        DependencyContext.collectPromise(video.play());
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }

    if (Math.abs(video.currentTime - time) > 0.3) {
      this.setCurrentTime(time);
    } else if (!playing) {
      video.currentTime = time;
    }

    return video;
  }

  protected lastFrame: HTMLImageElement | null = null;

  protected async seekFunction() {
    const playbackState = this.view().playbackState();
    if (
      playbackState === PlaybackState.Playing ||
      playbackState === PlaybackState.Presenting
    ) {
      return this.fastSeekedVideo();
    }

    if (playbackState === PlaybackState.Rendering) {
      return this.seekedVideo();
    }

    return this.seekedVideo();
  }

  protected override async draw(context: CanvasRenderingContext2D) {
    this.drawShape(context);
    const alpha = this.alpha();
    if (alpha > 0) {
      const video = await this.seekFunction();

      const box = BBox.fromSizeCentered(this.computedSize());
      context.save();
      context.clip(this.getPath());
      if (alpha < 1) {
        context.globalAlpha *= alpha;
      }
      context.imageSmoothingEnabled = this.smoothing();
      drawImage(context, video, box);
      context.restore();
    }

    if (this.clip()) {
      context.clip(this.getPath());
    }

    await this.drawChildren(context);
  }

  protected override applyFlex() {
    super.applyFlex();
    const video = this.video();
    this.element.style.aspectRatio = (
      this.ratio() ?? video.videoWidth / video.videoHeight
    ).toString();
  }
}
