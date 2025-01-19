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
      buttonStyle={{height: 40, width: 110}}
      titleStyle={{
        fontFamily: 'TheLastShuriken',
        textAlignVertical: 'center',
      }}
      activeOpacity={0.8}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: [firstColor, secondColor],
        start: {x: 0, y: 0.5},
        end: {x: 1, y: 0.5},
      }}
      raised={true}
      title={text}
    />
  );
};

export const ButtonRIICHI = ({handlePress}: {handlePress: () => void}) => {
  return (
    <ButtonShape
      text="RIICHI"
      firstColor="#f6d106"
      secondColor="#cc7000"
      handlePress={() => {
        handlePress();
        console.log('pressed Riichii');
      }}
    />
  );
};
export const ButtonPON = ({handlePress}: {handlePress: () => void}) => {
  return (
    <ButtonShape
      text="PON"
      firstColor="#48cae4"
      secondColor="#023e8a"
      handlePress={() => {
        handlePress();
        console.log('pressed PON');
      }}
    />
  );
};
export const ButtonPASS = ({handlePress}: {handlePress: () => void}) => {
  return (
    <ButtonShape
      text="PASS"
      firstColor="#9dc1db"
      secondColor="#688aa5"
      handlePress={() => {
        handlePress();
        console.log('pressed PASS');
      }}
    />
  );
};
const ButtonCANCEL = () => {
  return (
    <ButtonShape text="CANCEL" firstColor="#9dc1db" secondColor="#688aa5" />
  );
};
export const ButtonCHII = ({handlePress}: {handlePress: () => void}) => {
  return (
    <ButtonShape
      text="CHII"
      firstColor="#19e09f"
      secondColor="#12bf63"
      handlePress={() => {
        handlePress();
        console.log('pressed CHII');
      }}
    />
  );
};
export const ButtonKAN = ({handlePress}: {handlePress: () => void}) => {
  return (
    <ButtonShape
      text="KAN"
      firstColor="#be95c4"
      secondColor="#5e548e"
      handlePress={() => {
        handlePress();
        console.log('pressed KAN');
      }}
    />
  );
};
export const ButtonRON = ({handlePress}: {handlePress: () => void}) => {
  return (
    <ButtonShape
      text="RON"
      firstColor="#dc2f02"
      secondColor="#fb8b24"
      handlePress={() => {
        handlePress();
        console.log('pressed RON');
      }}
    />
  );
};
export const ButtonTSUMO = ({handlePress}: {handlePress: () => void}) => {
  return (
    <ButtonShape
      text="TSUMO"
      firstColor="#dc2f02"
      secondColor="#fb8b24"
      handlePress={() => {
        handlePress();
        console.log('pressed TSUMO');
      }}
    />
  );
};

export const ButtonAI = () => {
  return (
    <ButtonShape text="AITurn" firstColor="#dc2f02" secondColor="#fb8b24" />
  );
};
