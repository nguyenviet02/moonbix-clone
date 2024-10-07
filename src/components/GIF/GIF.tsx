import { useEffect, useMemo, useRef } from 'react';
import { Image } from 'react-konva';
import { Image as ImageType } from 'konva/lib/shapes/Image';
import 'gifler';

declare global {
  interface Window {
    gifler: (src: string) => {
      get: (callback: (a: Animator2) => void) => void;
    };
  }
}

type TFrame = {
  buffer: CanvasImageSource;
  x: number;
  y: number;
};

type Animator2 = {
  animateInCanvas: (canvas: HTMLCanvasElement) => void;
  stop: () => void;
  onDrawFrame: (ctx: CanvasRenderingContext2D, frame: TFrame) => void;
};

type GIFProps = {
  src: string;
  x: number;
  y: number;
};

const GIF = ({ src, x, y }: GIFProps) => {
  const imageRef = useRef<ImageType | null>(null);
  const canvas = useMemo(() => {
    const node = document.createElement('canvas');
    return node;
  }, []);

  useEffect(() => {
    // save animation instance to stop it on unmount
    let anim: Animator2;
    window.gifler(src).get((a: Animator2) => {
      anim = a;
      console.log('☠️ ~ useEffect ~ anim:', anim);
      anim.animateInCanvas(canvas);
      anim.onDrawFrame = (ctx, frame) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y);
        imageRef?.current?.getLayer?.()?.draw();
      };
    });
    return () => anim.stop();
  }, [src, canvas]);

  return <Image x={x} y={y} image={canvas} ref={imageRef} />;
};

export default GIF;
