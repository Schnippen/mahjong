import {TTileObject, TstolenTiles, WindTypes} from '../../Types/types';
import {checkYakusInHand} from '../isWinning/calulateYakus';
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
};
