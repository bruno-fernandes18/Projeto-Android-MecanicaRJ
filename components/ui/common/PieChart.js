import { View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const PieChart = ({ slices, radius = 80, strokeWidth = 20, style }) => {
  const center = radius + strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercentage = 0;

  return (
    <View style={style}>
      <Svg
        height={center * 2}
        width={center * 2}
        viewBox={`0 0 ${center * 2} ${center * 2}`}>
        <G rotation="-90" origin={`${center}, ${center}`}>
          {slices.map((slice, index) => {
            const strokeDashoffset = circumference * (1 - slice.percentage);
            const rotation = cumulativePercentage * 360;
            cumulativePercentage += slice.percentage;
            if (slice.percentage === 0) {
              return null;
            }

            return (
              <Circle
                key={index}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                rotation={rotation}
                origin={`${center}, ${center}`}
              />
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

export default PieChart;
