import React, {memo, useEffect, useState} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import PlayerTileOnHand from './PlayerTileOnHand';
import {TTileObject} from '../../Types/types';

/* let timer= null;
const TIMEOUT = 500
const debounce = (onSingle:() => void, onDouble:() => void) => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
    onDouble();
  } else {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      onSingle();
    }, TIMEOUT);
  }
}; */

const TileOnHand = ({
  handlePress,
  item,
  index,
  marginLeft,
  selected,
  handDataLastIndex,
  helperNumber,
  isHelperNumberActive
}: {
  handlePress: (item: TTileObject, tileID: number) => void;
  item: TTileObject;
  index: number;
  selected: number | null;
  handDataLastIndex: number;
  marginLeft: number;
  helperNumber?:string
  isHelperNumberActive?:boolean
}) => {
  /*  const [tap, setTap] = useState("...");

    useEffect(() => {
      setTimeout(() => {
        setTap("...");
        console.log(tap)
      }, 2000);
    }, [tap]);
  
    const onSingleTap = () => {
        setTap("single tap"),
        };

    const onDoubleTap = () => {setTap("double tap"),console.log(`doubleTAP: discard ${item.name}`)}; */

  const onPress = () => {
    //debounce(onSingleTap, onDoubleTap);
    handlePress(item, item.tileID);
    //console.log("onPress()")
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => onPress()}
      style={{backgroundColor: 'pink'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          marginBottom: selected === item.tileID ? 39 * 1 : 0,
          position: 'relative',
          height: 39 * 1.3,
          width: 30 * 1.3,
          alignSelf: 'center',
          marginLeft: marginLeft, //isLastItem ? 10 : 0,
        }}>
        <PlayerTileOnHand svg={item.image} tileRatioProp={1.3} numeralHelper={helperNumber} isHelperNumberActive={isHelperNumberActive}/>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TileOnHand;
