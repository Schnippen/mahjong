import {INTERRUPT_TURN, START_GAME} from '../../Store/gameReducer';
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
  dispatch(START_GAME({phase: 'ended'}));
  dispatch(INTERRUPT_TURN({val: true})); //interrupt turn prevent crashing the app during reset to another round
  soundFunc({type: 'tsumo'});
};
