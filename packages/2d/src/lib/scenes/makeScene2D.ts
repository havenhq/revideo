import {
  createSceneMetadata,
  FullSceneDescription,
  ThreadGeneratorFactory,
} from '@revideo/core';
import type {View2D} from '../components';
import {Scene2D} from './Scene2D';

export function makeScene2D(runner: ThreadGeneratorFactory<View2D>) {
  return {
    klass: Scene2D,
    config: runner,
    stack: new Error().stack,
    meta: createSceneMetadata(),
    plugins: ['@revideo/2d/editor'],

    /**
     * We need to cast this to `FullSceneDescription` because all makeScene2D calls
     * are transformed into `FullSceneDescription` by the vite plugin.
     *
     * This transformation happens inside of `/packages/vite-plugin/src/partials/scenes.ts`.
     */
  } as unknown as FullSceneDescription;
}

/*type CyclicConfig<T> = (params: T) => CyclicConfig<T>;

export function parametrize<T>(scene: FullSceneDescription, params: T) {
  const typeScene = scene as FullSceneDescription<CyclicConfig<T>>;
  const newScene = {
    ...typeScene,
    config: typeScene.config(params),
    onReplaced: new ValueDispatcher(typeScene),
  };

  typeScene.onReplaced.subscribe(value => {
    newScene.onReplaced.current = {
      ...newScene,
      config: value.config(params),
    };
  }, false);

  return newScene;
}

export function makeParametrizedScene<T>(
  factory: (view: View2D, params: T) => ThreadGenerator,
) {
  return makeScene2D(
    ((params: T) =>
      function* (view: View2D) {
        yield* factory(view, params);
      }) as unknown as ThreadGeneratorFactory<View2D>,
  );
}*/
