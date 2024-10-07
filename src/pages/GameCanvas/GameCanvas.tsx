import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Stage, Layer, Line, Image, Rect, Text } from 'react-konva';
import Konva from 'konva';
import type { Stage as TStage } from 'konva/lib/Stage';
import useImage from 'use-image';
import backgroundImage from 'images/background.png';
import hookImage from 'images/hook.png';
import spaceshipImage from 'images/spaceship.png';
import IconScore from 'images/icon-score.png';
import IconTimer from 'images/icon-timer.png';
import IconSound from 'images/icon-sound.png';
import IconMute from 'images/icon-mute.png';
import starBlueGif from 'images/star-blue.gif';
import starPurpleGif from 'images/star-purple.gif';
import { IAnimationRef, ICropHookImage, TObjectProperties } from '@/types/type';
import ObjectComp from '@/components/Game/Object';
import { listObjects } from '@/apis/gameApi';
import { useNavigate, useParams } from 'react-router-dom';
import GIF from '@/components/GIF/GIF';

const HookAnimation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const defaultHookLength = 15;
  const spaceshipSize = useRef({
    width: 160,
    height: 130,
    scale: 0.5,
  });
  // Ref
  const stageRef = useRef<TStage>(null);
  const textScoreRef = useRef<Konva.Text>(null);
  const animationRef = useRef<IAnimationRef | null>(null);
  const spaceshipRef = useRef<IAnimationRef | null>(null);
  const layerRef = useRef<Konva.Layer>(null);

  // Image
  const [backgroundImageCanvas] = useImage(backgroundImage);
  const [hookImageCanvas] = useImage(hookImage);
  const [spaceshipImageCanvas] = useImage(spaceshipImage);
  const [iconScoreImageCanvas] = useImage(IconScore);
  const [iconTimerImageCanvas] = useImage(IconTimer);
  const [iconSoundImageCanvas] = useImage(IconSound);
  const [iconMuteImageCanvas] = useImage(IconMute);

  // State
  const [isOpenSound, setIsOpenSound] = useState(true);
  const [isTextScoreVisible, setIsTextScoreVisible] = useState(false);
  const [second, setSecond] = useState(90);
  const [isGameOver, setIsGameOver] = useState(false);
  const [positionSpaceship, setPositionSpaceship] = useState({ x: 0, y: 0 });
  const [hookLength, setHookLength] = useState(defaultHookLength);
  const [retractSpeed, setRetractSpeed] = useState(5);
  const [isFluctuating, setIsFluctuating] = useState(true);
  const [angle, setAngle] = useState(90); // Initial angle of the hook
  const [extendHook, setExtendHook] = useState(false); // Hook extending flag
  const [retracting, setRetracting] = useState(false); // Retracting flag
  const [isCollideWithObject, setIsCollideWithObject] = useState(false);
  const [cropHookImage, setCropHookImage] = useState<ICropHookImage>({
    width: 205,
    height: 185,
    x: 0,
    y: 0,
  });
  const [collectedObject, setCollectedObject] = useState<{ point: number; id: number } | null>(null);
  const [totalScore, setTotalScore] = useState(0);

  const deepCloneListObjects = listObjects.map((object) => ({ ...object }));

  const [objectList, setObjectList] = useState<TObjectProperties[]>(deepCloneListObjects);

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
      const newY = 55 + 2 * Math.sin(frame?.time / 250);
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

  const handleCollectObject = useCallback((point: number, id: number, speed: number) => {
    setCollectedObject({ point, id });
    setRetractSpeed(speed);
  }, []);

  const handleSound = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
    e.cancelBubble = true;
    setIsOpenSound((prev) => !prev);
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

  //* Handle fluctuation of the hook
  useEffect(() => {
    if (isFluctuating) {
      setCropHookImage({
        width: 205,
        height: 185,
        x: 0,
        y: 0,
      });
      animationRef.current?.start();
    }
  }, [isFluctuating]);
  useEffect(() => {
    fluctuateHook();
  }, []);

  //* Handle extending the hook
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

  //* Handle retraction of the hook
  useEffect(() => {
    if (retracting) {
      const anim = new Konva.Animation(() => {
        if (hookLength > defaultHookLength) {
          setHookLength((prev) => prev - retractSpeed);
        } else {
          if (collectedObject?.id) {
            // Get point from object and remove it from the layer
            const newTotalScore = totalScore + collectedObject?.point;
            setTotalScore(newTotalScore < 0 ? 0 : newTotalScore);
            setObjectList((prev) => prev.filter((object) => object.id !== collectedObject.id));
            setRetractSpeed(5);
            setIsTextScoreVisible(true);
            // setCollectedObject(null);
          }
          // Stop retracting and resume fluctuation
          setRetracting(false);
          setIsFluctuating(true);
          setIsCollideWithObject(false);
        }
      }, stageRef?.current?.getLayers()[0]);

      anim.start();
      return () => anim.stop();
    }
    return () => {};
  }, [retracting, hookLength, collectedObject]);

  //* Handle collision with object
  useEffect(() => {
    if (!isCollideWithObject) {
      return;
    }
    setExtendHook(false);
    setRetracting(true);
    setCropHookImage({
      width: 130,
      height: 185,
      x: 240,
      y: 0,
    });
  }, [isCollideWithObject]);

  //* Set spaceship position
  useEffect(() => {
    setPositionSpaceship({
      x: window.innerWidth / 2 - 5,
      y: 55,
    });
  }, []);
  useEffect(() => {
    floatSpaceship();
  }, []);

  //* Show score when collect object
  useEffect(() => {
    if (totalScore === 0) {
      return;
    }
    textScoreRef.current?.to({
      y: 100,
      duration: 1,
      opacity: 0,
      onFinish: () => {
        textScoreRef.current?.to({
          y: 140,
          duration: 1,
          opacity: 1,
        });
        setCollectedObject(null);
        setIsTextScoreVisible(false);
      },
    });
  }, [totalScore]);

  //* Handle time
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((prev) => (prev - 1 > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //* Handle game over
  useEffect(() => {
    if (second === 0) {
      animationRef.current?.stop();
      spaceshipRef.current?.stop();
      setIsFluctuating(false);
      setExtendHook(false);
      setRetracting(false);
      setTimeout(() => {
        navigate('/game-over', { replace: true, state: { totalScore, level: params?.level } });
      }, 1000);
    }
  }, [second]);
  useEffect(() => {
    if (objectList.length === 0) {
      setIsGameOver(true);
    }
  }, [objectList]);

  return (
    <>
      <Stage visible={!isGameOver} ref={stageRef} width={window.innerWidth} height={window.innerHeight} onClick={handleStageClick} onTap={handleStageClick}>
        <Layer>
          <Image
            offset={{
              x: 100,
              y: 400,
            }}
            image={backgroundImageCanvas}
          />

          {isOpenSound ? (
            <Image onClick={handleSound} x={10} y={15} image={iconSoundImageCanvas} width={20} height={20} />
          ) : (
            <Image onClick={handleSound} x={10} y={15} image={iconMuteImageCanvas} width={20} height={20} />
          )}

          <GIF src={starBlueGif} x={window.innerWidth - 90} y={180} />
					<GIF src={starPurpleGif} x={60} y={100} />

          {/* Time */}
          <Rect x={window.innerWidth - 100} y={10} width={100} height={40} fill="#181A20" cornerRadius={[40, 0, 0, 40]} />
          <Image x={window.innerWidth - 90} y={15} image={iconTimerImageCanvas} width={25} height={25} />
          <Text text={`${second} s`} fontSize={18} fill={'white'} x={window.innerWidth - 60} y={20} fontStyle="bold" />

          {/* Point */}
          <Rect x={window.innerWidth - 100} y={60} width={100} height={40} fill="#181A20" cornerRadius={[40, 0, 0, 40]} />
          <Image x={window.innerWidth - 90} y={68} image={iconScoreImageCanvas} width={25} height={25} />
          <Text text={totalScore?.toString()} fontSize={18} fill={'white'} x={window.innerWidth - 60} y={72} fontStyle="bold" />
        </Layer>
        <Layer ref={layerRef}>
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
          {objectList?.map((object) => (
            <ObjectComp
              key={object.id}
              objectProperties={object}
              positionHookX={lineEndX}
              positionHookY={lineEndY + (cropHookImage.height * 0.15) / 2}
              stageRef={stageRef}
              onCollect={() => handleCollectObject(object?.point, object?.id, object?.speed)}
              isCollecting={collectedObject?.id === object?.id}
              setIsCollideWithObject={setIsCollideWithObject}
              rotation={angle - 90}
            />
          ))}
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
            offsetX={cropHookImage.width / 2}
            rotation={angle - 90}
          />
          <Text
            text={collectedObject?.point && collectedObject?.point > 0 ? `+${collectedObject?.point}` : collectedObject?.point.toString()}
            visible={isTextScoreVisible}
            fontSize={16}
            ref={textScoreRef}
            fill={'white'}
            x={window.innerWidth / 2 - 20}
            y={140}
            fontStyle="800"
            stroke={'black'}
            strokeWidth={0.9}
          />
        </Layer>
      </Stage>
    </>
  );
};

export default HookAnimation;
