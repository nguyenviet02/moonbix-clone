import useImage from 'use-image';
import { Image } from 'react-konva';
import goldImage from 'images/item-token.png';
import rockImage from 'images/item-planet.png';
import bonusImage from 'images/item-bonus.png';
import { useState, useEffect } from 'react';
import type { Stage as TStage } from 'konva/lib/Stage';
import { TObjectProperties } from '@/types/type';
import { ObjectType } from '@/types/enums';

export type Props = {
  objectProperties: TObjectProperties;
  positionHookX: number;
  positionHookY: number;
  stageRef: React.RefObject<TStage>;
  onCollect: () => void;
  isCollecting: boolean;
  setIsCollideWithObject(value: boolean): void;
  rotation: number;
};

const ObjectComp = ({ objectProperties, positionHookX, positionHookY, onCollect, isCollecting, setIsCollideWithObject, rotation }: Props) => {
  const [goldImageCanvas] = useImage(goldImage);
  const [rockImageCanvas] = useImage(rockImage);
  const [bonusImageCanvas] = useImage(bonusImage);
  const [position, setPosition] = useState({ x: objectProperties?.x, y: objectProperties?.y });
  const [rotationState, setRotationState] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const checkCollideWithHook = () => {
    const distance = Math.sqrt(
      Math.pow(positionHookX - (objectProperties?.x + objectProperties?.width / 2), 2) + Math.pow(positionHookY - (objectProperties?.y + objectProperties?.height / 2), 2)
    );
    return distance < objectProperties?.width / 2 + 5;
  };

  const renderByType = () => {
    switch (objectProperties?.type) {
      case ObjectType.REWARD:
        return <Image x={position.x} y={position.y} width={objectProperties?.width} height={objectProperties?.height} image={goldImageCanvas} rotation={rotationState} offsetX={offsetX} />;
      case ObjectType.TRAP:
        return <Image x={position.x} y={position.y} width={objectProperties?.width} height={objectProperties?.height} image={rockImageCanvas} rotation={rotationState} offsetX={offsetX} />;
      case ObjectType.BONUS:
        return <Image x={position.x} y={position.y} width={objectProperties?.width} height={objectProperties?.height} image={bonusImageCanvas} rotation={rotationState} offsetX={offsetX} />;
      default:
        return <Image x={position.x} y={position.y} width={objectProperties?.width} height={objectProperties?.height} image={goldImageCanvas} rotation={rotationState} offsetX={offsetX} />;
    }
  };

  useEffect(() => {
    if (isCollecting) {
      const newPosition = { x: positionHookX, y: positionHookY };
      setPosition(newPosition);
      setRotationState(rotation);
      setOffsetX(objectProperties?.width / 2);
    }
  }, [isCollecting, positionHookX, positionHookY]);

  useEffect(() => {
    if (checkCollideWithHook() && !isCollecting) {
      onCollect();
      setIsCollideWithObject(true);
    }
  }, [positionHookX, positionHookY]);

  return renderByType();
};

export default ObjectComp;
