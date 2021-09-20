import {
  Jimp as JimpType,
  UnionToIntersection,
  GetPluginVal,
  GetPluginConst,
  GetPluginEncoders,
  GetPluginDecoders,
  JimpConstructors
} from '@jimp/core';
import typeFn from '@jimp/types';
import pluginFn from '@jimp/plugins';

export * from '@jimp/core';
export * from '@jimp/types'

export type Types = ReturnType<typeof typeFn>;
export type Plugins = ReturnType<typeof pluginFn>;

export type IntersectedPluginTypes = UnionToIntersection<
  GetPluginVal<Types> | GetPluginVal<Plugins>
>;

export type IntersectedPluginConsts = UnionToIntersection<
  GetPluginConst<Types> | GetPluginConst<Plugins>
>;

export type IntersectedPluginEncoders = UnionToIntersection<
  GetPluginEncoders<Types> | GetPluginEncoders<Plugins>
>;

export type IntersectedPluginDecoders = UnionToIntersection<
  GetPluginDecoders<Types> | GetPluginDecoders<Plugins>
>;

export type Jimp = JimpType & IntersectedPluginTypes;

export declare const Jimp: JimpConstructors & IntersectedPluginConsts & {
  prototype: Jimp;
  encoders: IntersectedPluginEncoders;
  decoders: IntersectedPluginDecoders;
};

export default Jimp;
