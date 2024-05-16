import {Button} from '@rneui/themed';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const ButtonShape = ({
  text,
  firstColor,
  secondColor,
  handlePress,
}: {
  text: string;
  firstColor: string;
  secondColor: string;
  handlePress?: () => void;
}) => {
  return (
    <Button
      onPress={handlePress} // Pass handlePress directly
      radius={'md'}
      buttonStyle={{ height: 35, width: 110 }}
      titleStyle={{
        fontWeight: 'bold',
        textAlign: 'center',
        verticalAlign: 'middle',
      }}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: [firstColor, secondColor],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      title={text}
    />
  );
};

export const ButtonRIICHI = () => {
  return (
    <ButtonShape text="RIICHI" firstColor="#f6d106" secondColor="#cc7000" />
  );
};
export const ButtonPON = () => {
  return <ButtonShape text="PON" firstColor="#48cae4" secondColor="#023e8a" />;
};
export const ButtonPASS = ({handlePress}:{handlePress:()=>void}) => {
  return <ButtonShape text="PASS" firstColor="#9dc1db" secondColor="#688aa5" handlePress={()=>{handlePress();console.log("pressed")}} />;
};
const ButtonCANCEL = () => {
  return (
    <ButtonShape text="CANCEL" firstColor="#9dc1db" secondColor="#688aa5" />
  );
};
export const ButtonCHII = ({handlePress}:{handlePress:()=>void}) => {
  return <ButtonShape text="CHII" firstColor="#19e09f" secondColor="#12bf63" handlePress={()=>{handlePress();console.log("pressed CHII")}} />;
};
export const ButtonKAN = () => {
  return <ButtonShape text="KAN" firstColor="#be95c4" secondColor="#5e548e" />;
};
export const ButtonRON = () => {
  return <ButtonShape text="RON" firstColor="#dc2f02" secondColor="#fb8b24" />;
};
export const ButtonTSUMO = () => {
  return (
    <ButtonShape text="TSUMO" firstColor="#dc2f02" secondColor="#fb8b24" />
  );
};

export const ButtonAI = () => {
  return (
    <ButtonShape text="AITurn" firstColor="#dc2f02" secondColor="#fb8b24" />
  );
};
