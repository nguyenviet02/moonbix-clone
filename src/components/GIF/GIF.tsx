import { useEffect, useMemo, useRef } from 'react';
import { Image } from 'react-konva';
import 'gifler';

type GIFProps = {
  src: string;
  x: number;
  y: number;
};

const GIF = ({ src, x, y }: GIFProps) => {
  const imageRef = useRef(null);
  const canvas = useMemo(() => {
    const node = document.createElement('canvas');
    return node;
  }, []);

  useEffect(() => {
    // save animation instance to stop it on unmount
    let anim;
    window.gifler(src).get((a) => {
      anim = a;
      anim.animateInCanvas(canvas);
      anim.onDrawFrame = (ctx, frame) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y);
        imageRef.current.getLayer().draw();
      };
    });
    return () => anim.stop();
  }, [src, canvas]);

  return <Image x={x} y={y} image={canvas} ref={imageRef} />;
};

export default GIF;
