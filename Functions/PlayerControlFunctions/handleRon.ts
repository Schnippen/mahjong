import {INTERRUPT_TURN, START_GAME} from '../../Store/gameReducer';
import {TTileObject, TstolenTiles, WindTypes} from '../../Types/types';
import {soundFunc} from '../playSounds/soundFunc';

type handleRonTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  currentMelds: TstolenTiles[];
  dispatch: any;
  winnerWind: WindTypes;
  isRichiiActive: boolean;
};

export const handleRon = ({
  hand,
  discard,
  currentMelds,
  dispatch,
  winnerWind,
  isRichiiActive,
}: handleRonTypes) => {
  dispatch(START_GAME({phase: 'ended'}));
  dispatch(INTERRUPT_TURN({val: true}));
  soundFunc({type: 'ron'});
};
