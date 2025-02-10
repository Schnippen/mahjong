import {Dimensions} from 'react-native';

export const getFontSize = (baseFontSize: number) => {
  const {fontScale} = Dimensions.get('screen');
  fontScale !== 1;
  return baseFontSize / (fontScale !== 1 ? fontScale * 1.1 : fontScale);
};
