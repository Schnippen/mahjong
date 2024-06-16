import {TTileObject, TstolenTiles} from '../../Types/types';
import {isChiitoitsu} from './Yaku/isChiitoitsu';
import { isChinitsu } from './Yaku/isChinitsu';
import { isDaisangen } from './Yaku/isDaisangen';
import { isIipeikou } from './Yaku/isIipeikou';
import { isIttsuu } from './Yaku/isIttsuu';
import { isJunchan } from './Yaku/isJunchan';
import { isRyanpeikou } from './Yaku/isRyanpeikou';
import { isSanshokuDoujun } from './Yaku/isSanshokuDoujun';
import { isShousangen } from './Yaku/isShousangen';
import { isSuuankou } from './Yaku/isSuuankou';
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
  const start = performance.now();
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
  //TODO add point score in isYaku functions. it will be helpful to create AI in future

  //yakus based on sequences:
  //Iipeikou pure double sequence  //closed //WORKING
  isIipeikou({hand, discard, playerMelds: currentMelds})

  //Ittsuu pure straight //WORKING
  isIttsuu({hand, discard, playerMelds: currentMelds})

  //Pinfu //TODO closed

  //Ryanpeikou Two Pure Double Sequences //closed  //WORKING
  isRyanpeikou({hand, discard, playerMelds: currentMelds})

  //Sanshoku doujun Three Colored Sequences //WORKING
  isSanshokuDoujun({hand, discard, playerMelds: currentMelds})

  //other yakus:
  //Riichi
  //Daburu Riichi
  //Ippatsu
  //Menzen tsumo
  //Haitei raoyue
  //Houtei raoyui
  //Rinshan kaihou
  //Chankan
  //Tenhou  yakuman
  //Chiihou yakuman
  //renhou

  //yakus based on terminals / honors

  //Tanyao 2-8 //WORKING
  isTanyao({hand, discard, playerMelds: currentMelds});
  
  //yakuhai Dragon, Players Seat Wind or Round Wind Triplet.

  //Shousangen 小三元 • Small Three Dragons //WORKING
  isShousangen({hand, discard, playerMelds: currentMelds})

  //Daisangen 大三元 • Big Three Dragons yakuman
  isDaisangen({hand, discard, playerMelds: currentMelds})

  //REMEMBER //TODO if there is daisangen do not count shousangen

  //Shousuushii 小四喜 • Little Four Winds yakuman ... //CHECK

  //Daisuushii 大四喜 • Big Four Winds yakuman //CHECK

  //REMEMBER //TODO if there is Daisuushii do not count Shousuushii

  //Chanta 全帯 • Terminals and Honors Everywhere

  //Junchan 純全帯么 • Terminals Everywhere //WORKING //but check it with checkMelds 2.0 ver
  isJunchan({hand, discard, playerMelds: currentMelds})

  //Honroutou 混老頭 • All Terminals and Honors

  //Chinroutou 清老頭 • All Terminals yakuman

  //Tsuuiisou 字 色 • All Honors yakuman

  //Kokushi musou 国士無双 • Thirteen Orphans yakuman

  //yakus based on PAIRS / triplets / quads
  isChiitoitsu({hand,discard})

  //Toitoi 対々 • All Triplets
  isToiToi({hand, discard, playerMelds: currentMelds});
  
  //San ankou 三暗刻 • Three Concealed Triplets

  //Suuankou 四暗刻 • Four Concealed Triplets yakuman
  isSuuankou({hand, discard, playerMelds: currentMelds})

  //Sanshoku doukou 三色同刻 • Three Colored Triplets

  //Sankantsu 三槓子 • Three Quads

  //Suukantsu 四槓子 • Four Quads yakuman

  //yakus basED ON SUITS

  //Hon itsu 混 色 • Half Flush

  //Chinistu // only one  suit full flush
  isChinitsu({hand, discard, playerMelds: currentMelds})

  // /Ryuuiisou 緑 色 • All Green yakuman

  //Chuuren poutou 九連宝燈 • Nine Gates yakuman
  
  //yakumab
  /* Tenhou
  Chiihou
  Daisangen
  Shousuushi
  Daisuushi
  Chinrouutou
  Tsuuiisou
  Suuankou
  Suukantsu
  Ryuuiisou
  Chuuren Poutou
  Kokushi Musou */
  const end = performance.now();
  console.log(`isWinning() took ${end - start} milliseconds.`);
}
