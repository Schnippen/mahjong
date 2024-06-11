import {TTileObject, TstolenTiles} from '../../Types/types';
import {isChiitoitsu} from './Yaku/isChiitoitsu';
import {isTanyao} from './Yaku/isTanyao';
import {isToiToi} from './Yaku/isToiToi';

//type isWinningTypes closed hand and opened hand
type isWinningTypes = {
  hand: TTileObject[];
  player1Melds: TstolenTiles[];
  player2Melds: TstolenTiles[];
  player3Melds: TstolenTiles[];
  player4Melds: TstolenTiles[];
  discard: TTileObject[];
  currentPlayer: 'player1' | 'player2' | 'player3' | 'player4';
  setDisplayRonButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayTsumoButton: React.Dispatch<React.SetStateAction<boolean>>;
};

export function isWinning({
  hand,
  player1Melds,
  player2Melds,
  player3Melds,
  player4Melds,
  discard,
  currentPlayer,
  setDisplayRonButton,
  setDisplayTsumoButton,
}: isWinningTypes) {
  let currentMelds: TstolenTiles[] = [];
  if (currentPlayer === 'player1') {
    currentMelds = player1Melds;
  } else if (currentPlayer === 'player2') {
    currentMelds = player2Melds;
  } else if (currentPlayer === 'player3') {
    currentMelds = player3Melds;
  } else if (currentPlayer === 'player4') {
    currentMelds = player4Melds;
  }
  if (currentMelds.length === 0) {
    let {result, typeOfAction} = isChiitoitsu({hand, discard}); // add is tenpai with chiitoitsu

    if (result && typeOfAction === 'RON') {
      //if player1 show buttons
      if (currentPlayer === 'player1') {
        setDisplayRonButton(true);
      }
    } else if (result && typeOfAction === 'TSUMO') {
      if (currentPlayer === 'player1') {
        setDisplayTsumoButton(true);
      }
    }
  }
  //opened hand win condition
  ///next
  isTanyao({hand, discard, playerMelds: currentMelds});
  isToiToi({hand, discard, playerMelds: currentMelds});
  //let {result, typeOfAction} =
  //smoki, wiatr stoły wiatr gracza
  //toi toi
  //https://pixabay.com/users/universfield-28281460/ sounds
}
