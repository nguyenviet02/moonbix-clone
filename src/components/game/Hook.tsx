import { Circle, Line } from 'react-konva';

type THookProps = {
  centerX: number;
  centerY: number;
  lineLength: number;
  angle: number;
};

// Hook Component (Functional Version)
const HookComponent = ({ centerX, centerY, lineLength, angle }: THookProps) => {
  const x = centerX + lineLength * Math.cos(angle);
  const y = centerY + lineLength * Math.sin(angle);

  return (
    <>
      {/* Line (Rope) */}
      <Line points={[centerX, centerY, x, y]} stroke="black" strokeWidth={3} />
      {/* Hook (Circle) */}
      <Circle x={x} y={y} radius={10} fill="gold" />
    </>
  );
};

export default HookComponent;
