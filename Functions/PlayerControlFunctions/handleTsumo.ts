import {INTERRUPT_TURN} from '../../Store/gameReducer';
import {TTileObject, TstolenTiles, WindTypes} from '../../Types/types';
import {soundFunc} from '../playSounds/soundFunc';

type handleTsumoTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  currentMelds: TstolenTiles[];
  dispatch: any;
  winnerWind: WindTypes;
  isRichiiActive: boolean;
};

export const handleTsumo = ({
  hand,
  discard,
  currentMelds,
  dispatch,
  winnerWind,
  isRichiiActive,
}: handleTsumoTypes) => {
  soundFunc({type: 'tsumo'});
  dispatch(INTERRUPT_TURN({val: true})); //interrupt turn prevent crashing the app during reset to another round
};
