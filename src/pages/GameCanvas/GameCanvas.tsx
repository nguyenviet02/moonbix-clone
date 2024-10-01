import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Stage, Layer, Line, Image } from 'react-konva';
import Konva from 'konva';
import type { Stage as TStage } from 'konva/lib/Stage';
import useImage from 'use-image';
import backgroundImage from 'images/background.png';
import hookImage from 'images/hook.png';
import spaceshipImage from 'images/spaceship.png';

interface IAnimationRef {
  start: () => void;
  stop: () => void;
}

const HookAnimation = () => {
  const defaultHookLength = 15;
  const retractSpeed = 5; // Speed at which the hook retracts
  const spaceshipSize = useRef({
    width: 160,
    height: 130,
    scale: 0.5,
  });
  // ref
  const stageRef = useRef<TStage>(null);
  const animationRef = useRef<IAnimationRef | null>(null);
  const spaceshipRef = useRef<IAnimationRef | null>(null);

  // image
  const [backgroundImageCanvas] = useImage(backgroundImage);
  const [hookImageCanvas] = useImage(hookImage);
  const [spaceshipImageCanvas] = useImage(spaceshipImage);

  // state
  const [positionSpaceship, setPositionSpaceship] = useState({ x: 0, y: 0 });
  const [hookLength, setHookLength] = useState(defaultHookLength); // Initial hook length
  const [isFluctuating, setIsFluctuating] = useState(true);
  const [angle, setAngle] = useState(90); // Initial angle of the hook
  const [extendHook, setExtendHook] = useState(false); // Hook extending flag
  const [retracting, setRetracting] = useState(false); // Retracting flag
  const [cropHookImage, setCropHookImage] = useState({
    width: 205,
    height: 185,
    x: 0,
    y: 0,
  });

  const fluctuateHook = useCallback(() => {
    const animation = new Konva.Animation((frame) => {
      if (!frame) {
        return;
      }
      const newAngle = 85 + 45 * Math.sin(frame?.time / 500);
      setAngle(newAngle);
    }, stageRef?.current?.getLayers?.()?.[0]);

    animation.start();
    animationRef.current = animation;
  }, []);

  const floatSpaceship = useCallback(() => {
    const animation = new Konva.Animation((frame) => {
      if (!frame) {
        return;
      }
      const newY = 55 + 5 * Math.sin(frame?.time / 250);
      setPositionSpaceship((prev) => ({ ...prev, y: newY }));
    }, stageRef?.current?.getLayers?.()?.[0]);
    animation.start();
    spaceshipRef.current = animation;
  }, []);

  const handleStageClick = useCallback(() => {
    if (isFluctuating) {
      // Stop fluctuation and extend hook
      animationRef?.current?.stop();
      setIsFluctuating(false);
      setExtendHook(true);
    }
  }, [isFluctuating]);

  // Collision detection with screen edges (both X and Y edges)
  const checkCollisionWithEdges = useCallback((x: number, y: number) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Check if the hook end reaches any edge of the screen (left, right, bottom)
    if (x <= 0 || x >= screenWidth || y >= screenHeight) {
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    if (isFluctuating) {
      setCropHookImage({
        width: 205,
        height: 185,
        x: 0,
        y: 0,
      });
      // setCropHookImage({
      //   width: 130,
      //   height: 185,
      //   x: 240,
      //   y: 0,
      // });
      animationRef.current?.start();
    }
  }, [isFluctuating]);

  useEffect(() => {
    fluctuateHook();
  }, []);

  useEffect(() => {
    if (extendHook) {
      const anim = new Konva.Animation(() => {
        const hookX = window.innerWidth / 2;
        const hookY = 50 + spaceshipSize?.current?.height * spaceshipSize?.current?.scale;
        const lineEndX = hookX + hookLength * Math.cos((angle * Math.PI) / 180);
        const lineEndY = hookY + hookLength * Math.sin((angle * Math.PI) / 180);

        if (checkCollisionWithEdges(lineEndX, lineEndY)) {
          setCropHookImage({
            width: 130,
            height: 185,
            x: 445,
            y: 0,
          });
          setExtendHook(false); // Stop extending and start retracting
          setRetracting(true);
        } else {
          setHookLength((prev) => prev + 5); // Extend the hook
        }
      }, stageRef?.current?.getLayers()?.[0]);
      anim.start();

      return () => anim.stop();
    }
    return () => {};
  }, [extendHook, hookLength, angle]);

  // Handle retraction of the hook
  useEffect(() => {
    if (retracting) {
      const anim = new Konva.Animation(() => {
        if (hookLength > defaultHookLength) {
          setHookLength((prev) => prev - retractSpeed); // Gradually retract the hook
        } else {
          setRetracting(false); // Stop retracting and resume fluctuation
          setIsFluctuating(true);
        }
      }, stageRef?.current?.getLayers()[0]);

      anim.start();
      return () => anim.stop();
    }
    return () => {};
  }, [retracting, hookLength]);

  useEffect(() => {
    setPositionSpaceship({
      x: window.innerWidth / 2 - 5,
      y: 55,
    });
  }, []);

  useEffect(() => {
    floatSpaceship();
  }, []);

  const hookX = useMemo(() => {
    return window.innerWidth / 2;
  }, []);
  const hookY = useMemo(() => {
    return positionSpaceship?.y - 5 + spaceshipSize?.current?.height * spaceshipSize?.current?.scale;
  }, [positionSpaceship]);
  const lineEndX = useMemo(() => {
    return hookX + hookLength * Math.cos((angle * Math.PI) / 180);
  }, [hookLength, angle]); // X position based on the angle and length
  const lineEndY = useMemo(() => {
    return hookY + hookLength * Math.sin((angle * Math.PI) / 180);
  }, [hookLength, angle]); // Y position based on the angle and length

  return (
    <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight} onClick={handleStageClick}>
      <Layer>
        <Image
          offset={{
            x: 100,
            y: 400,
          }}
          image={backgroundImageCanvas}
        />
      </Layer>
      <Layer>
        {/* Spaceship image */}
        <Image
          x={positionSpaceship.x}
          y={positionSpaceship.y}
          image={spaceshipImageCanvas}
          width={spaceshipSize?.current?.width}
          height={spaceshipSize?.current?.height}
          scale={{
            x: spaceshipSize?.current?.scale,
            y: spaceshipSize?.current?.scale,
          }}
          offsetX={80}
        />
        {/* Line representing the hook */}
        <Line points={[hookX, hookY, lineEndX, lineEndY]} stroke="white" strokeWidth={2} />
        {/* Hook image */}
        <Image
          x={lineEndX}
          y={lineEndY}
          image={hookImageCanvas}
          crop={cropHookImage}
          width={cropHookImage.width}
          scale={{
            x: 0.15,
            y: 0.15,
          }}
          // fill={'red'}
          offsetX={cropHookImage.width / 2}
          rotation={angle - 90}
        />
      </Layer>
    </Stage>
  );
};

export default HookAnimation;
