import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';
import {useAppDispatch} from '../../Store/hooks';
import {setSortTileOnHand, toggleNumerals} from '../../Store/settingsReducer';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import {soundFunc} from '../../Functions/playSounds/soundFunc';
import LinearGradient from 'react-native-linear-gradient';
const AutoSort = () => {
  const dispatch = useAppDispatch();
  const sortTilesOnHand = useSelector(
    (state: RootState) => state.settingsReducer.sortTilesOnHand,
  );
  const handleSortToggle = () => {
    dispatch(setSortTileOnHand());
    if (sortTilesOnHand === true) {
      soundFunc({type: 'popUp'});
    }
    if (sortTilesOnHand === false) {
      soundFunc({type: 'pop'});
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        borderTopRightRadius: 8,
      }}
      onPress={() => handleSortToggle()}>
      <Text
        style={{
          color: sortTilesOnHand ? 'rgb(233, 195, 170)' : 'white',
          textAlign: 'center',
          fontSize: 16,
          fontFamily: 'TheLastShuriken',
        }}>
        S
      </Text>
    </TouchableOpacity>
  );
};
const ShowNumerals = () => {
  const dispatch = useAppDispatch();
  const showNumerals = useSelector(
    (state: RootState) => state.settingsReducer.settings.numerals,
  );
  const handleShowNumerals = () => {
    dispatch(toggleNumerals(!showNumerals));
    if (showNumerals === true) {
      soundFunc({type: 'popUp'});
    }
    if (showNumerals === false) {
      soundFunc({type: 'pop'});
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        borderTopRightRadius: 8,
      }}
      onPress={() => handleShowNumerals()}>
      <Text
        style={{
          color: showNumerals ? 'rgb(233, 195, 170)' : 'white',
          textAlign: 'center',
          fontFamily: 'TheLastShuriken',
          fontSize: 16,
        }}>
        N
      </Text>
    </TouchableOpacity>
  );
};
const SidePanel = () => {
  const topPanelBackgroundColor = '#3c7fc3';
  const panelBackgroundColor = 'rgba(22, 60, 85, 0.9)';

  const screenHeight = Dimensions.get('window').height;
  return (
    <LinearGradient
      colors={[panelBackgroundColor, 'transparent']}
      useAngle={true}
      angle={90}
      angleCenter={{x: 0.4, y: 1}}
      style={{
        height: 130,
        width: 50,
        //backgroundColor: panelBackgroundColor,
        left: 0,
        top: 130,
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      }}>
      <AutoSort />
      <ShowNumerals />
    </LinearGradient>
  );
};

export default SidePanel;
