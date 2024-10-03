import { ObjectType } from "./enums";

export interface IAnimationRef {
  start: () => void;
  stop: () => void;
}

export interface ICropHookImage {
  width: number;
  height: number;
  x: number;
  y: number;
}

export type TObjectProperties = {
  id: number;
  type: ObjectType;
  x: number;
  y: number;
  width: number;
  height: number;
  point: number;
  speed: number;
};
