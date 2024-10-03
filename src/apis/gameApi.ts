import { ObjectType } from '@/types/enums';
import { TObjectProperties } from '@/types/type';

export const listObjects: TObjectProperties[] = [
  { id: 1, type: ObjectType.REWARD, x: 50, y: 400, width: 25, height: 25, point: 10, speed: 4 },
  { id: 5, type: ObjectType.REWARD, x: 220, y: 270, width: 25, height: 25, point: 25, speed: 4 },
  { id: 2, type: ObjectType.REWARD, x: 180, y: 350, width: 50, height: 50, point: 50, speed: 1.5 },
  { id: 6, type: ObjectType.REWARD, x: 55, y: 300, width: 50, height: 50, point: 50, speed: 1.5 },
  { id: 3, type: ObjectType.TRAP, x: 140, y: 250, width: 25, height: 25, point: -20, speed: 2 },
  { id: 4, type: ObjectType.TRAP, x: 120, y: 400, width: 40, height: 40, point: -40, speed: 1.5 },
  { id: 7, type: ObjectType.TRAP, x: 300, y: 350, width: 40, height: 40, point: -40, speed: 1.5 },
  { id: 8, type: ObjectType.BONUS, x: 260, y: 400, width: 40, height: 40, point: 70, speed: 1.2 },
];
