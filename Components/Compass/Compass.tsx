import {TouchableOpacity, View} from 'react-native';
import CompassPlayerSide from './CompassPlayerSide';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../Store/store';
import React from 'react';
import CompassTileCounter from './CompassTileCounter';
import {setShowScoreDifference} from '../../Store/settingsReducer';
const Compass = () => {
  //measuring from screenshot as a scale of reference
  const compassBottomPerimeter = 320; //320-200=120
  const compassSidePerimeter = 320;
  const compassTilesCounterBottomPerimeter = +(100 * 1.0188).toFixed(2);
  const compassTurnIndicatorBottomPerimeter = 200;
  const backgroundColor = '#5a5a66';
  const backgroundColorSec = '#2f2f39';
  const dispatch = useDispatch();
  const {
    playersReducer: {
      player1: {wind: playerBottomMainPlayer},
      player2: {wind: playerRight},
      player3: {wind: playerTop},
      player4: {wind: playerLeft},
    },
  } = useSelector((state: RootState) => state);
  const {
    playersReducer: {
      player1: {isRiichi: player1IsRiichi},
      player2: {isRiichi: player2IsRiichi},
      player3: {isRiichi: player3IsRiichi},
      player4: {isRiichi: player4IsRiichi},
    },
  } = useSelector((state: RootState) => state);

  const handleChangeScoringDisplaySystem = () => {
    dispatch(setShowScoreDifference());
  };
  return (
    <View
      style={{
        borderBottomWidth: 8,
        borderRadius: 8,
        /*  transform: [{rotateX: '45deg'}, {rotateZ: '0deg'},{scale:0.75}] */ backgroundColor:
          '#5d5d69',
        width: 320,
      }}>
      <View
        style={{
          backgroundColor: '#39383d',
          width: compassBottomPerimeter, //
          height: compassBottomPerimeter, //padding 8   8 45
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}>
        <TouchableOpacity
          style={{
            width: compassBottomPerimeter,
            height: compassSidePerimeter,
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            zIndex: 999,
          }}
          onPress={() => handleChangeScoringDisplaySystem()}></TouchableOpacity>
        <CompassTileCounter
          compassTilesCounterBottomPerimeter={
            compassTilesCounterBottomPerimeter
          }
        />
        <CompassPlayerSide
          isRichiiActive={player1IsRiichi}
          degrees={0}
          leftPosition={0}
          rightPosition={250}
          bottomPosition={0}
          topPosition={0}
          playerIndicator={'player1'} //bottom
          compassBottomPerimeter={compassBottomPerimeter}
          currentWindDisplay={playerBottomMainPlayer}
        />
        <CompassPlayerSide
          isRichiiActive={player2IsRiichi}
          degrees={270}
          leftPosition={125}
          rightPosition={125}
          bottomPosition={0}
          topPosition={0}
          playerIndicator={'player2'} //right
          compassBottomPerimeter={compassBottomPerimeter}
          currentWindDisplay={playerRight}
        />
        <CompassPlayerSide
          isRichiiActive={player3IsRiichi}
          degrees={180}
          leftPosition={0}
          rightPosition={0}
          bottomPosition={0}
          topPosition={0}
          playerIndicator={'player3'} //front
          compassBottomPerimeter={compassBottomPerimeter}
          currentWindDisplay={playerTop}
        />
        <CompassPlayerSide
          isRichiiActive={player4IsRiichi}
          degrees={90}
          leftPosition={-125}
          rightPosition={125}
          bottomPosition={0}
          topPosition={0}
          playerIndicator={'player4'} //left
          compassBottomPerimeter={compassBottomPerimeter}
          currentWindDisplay={playerLeft}
        />
      </View>
    </View>
  );
};
export default Compass;
