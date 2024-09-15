import {TTileObject, TstolenTiles, YakuType} from '../../Types/types';
import {isChanta} from './Yaku/isChanta';
import {isChiitoitsu} from './Yaku/isChiitoitsu';
import {isChinitsu} from './Yaku/isChinitsu';
import {isChinroutou} from './Yaku/isChinroutou';
import {isChuurenPoutou} from './Yaku/isChuurenPoutou';
import {isDaisangen} from './Yaku/isDaisangen';
import {isDaisuushii} from './Yaku/isDaisuushii';
import {isHonitsu} from './Yaku/isHonitsu';
import {isHonrotou} from './Yaku/isHonrotou';
import {isIipeikou} from './Yaku/isIipeikou';
import {isIttsuu} from './Yaku/isIttsuu';
import {isJunchan} from './Yaku/isJunchan';
import {isKokushiMusou} from './Yaku/isKokushiMusou';
import {isPinfu} from './Yaku/isPinfu';
import {isRyanpeikou} from './Yaku/isRyanpeikou';
import {isRyuuiisou} from './Yaku/isRyuuiisou';
import {isSanankou} from './Yaku/isSanankou';
import {isSankantsu} from './Yaku/isSankantsu';
import {isSanshokuDoujun} from './Yaku/isSanshokuDoujun';
import {isSanshokuDoukou} from './Yaku/isSanshokuDoukou';
import {isShousangen} from './Yaku/isShousangen';
import {isShousuushii} from './Yaku/isShousuushii';
import {isSuuankou} from './Yaku/isSuuankou';
import {isSuukantsu} from './Yaku/isSuukantsu';
import {isTanyao} from './Yaku/isTanyao';
import {isToiToi} from './Yaku/isToiToi';
import {isTsuuiisou} from './Yaku/isTsuuiisou';
import {isYakuhai} from './Yaku/isYakuhai';

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

  //opened hand win condition
  ///next

  //TODO add point score in isYaku functions. it will be helpful to create AI in future

  //TODO there might be a problem with kans...
  //yakus based on sequences:
  //Iipeikou pure double sequence  //closed //WORKING
  isIipeikou({hand, discard, playerMelds: currentMelds});

  //Ittsuu pure straight //WORKING
  isIttsuu({hand, discard, playerMelds: currentMelds});

  //Pinfu //TODO closed //working??
  isPinfu({hand, discard, playerMelds: currentMelds});

  //Ryanpeikou Two Pure Double Sequences //closed  //WORKING
  isRyanpeikou({hand, discard, playerMelds: currentMelds});

  //Sanshoku doujun Three Colored Sequences //WORKING
  isSanshokuDoujun({hand, discard, playerMelds: currentMelds});

  //other yakus:

  //Riichi //TODO

  //Daburu Riichi //TODO //have sounds for that

  //Ippatsu //have sound for that
  //Menzen tsumo //have sound for that
  //Haitei raoyue //have sound for that
  //Houtei raoyui //have sound for that
  //Rinshan kaihou //have sound for that
  //Chankan //have sound for that
  //Tenhou  yakuman //have sound for that
  //Chiihou yakuman //have sound for that
  //renhou //have sound for that

  //yakus based on terminals / honors

  //Tanyao 2-8 //WORKING
  isTanyao({hand, discard, playerMelds: currentMelds});

  //yakuhai Dragon, Players Seat Wind or Round Wind Triplet. //CHECK
  //yakuhai table wind, players wind
  isYakuhai({hand, discard, playerMelds: currentMelds});

  //Shousangen 小三元 • Small Three Dragons //WORKING
  isShousangen({hand, discard, playerMelds: currentMelds});

  //Daisangen 大三元 • Big Three Dragons yakuman //WORKING
  isDaisangen({hand, discard, playerMelds: currentMelds});

  //REMEMBER //TODO if there is daisangen do not count shousangen

  //Shousuushii 小四喜 • Little Four Winds yakuman ... //WORKING
  isShousuushii({hand, discard, playerMelds: currentMelds});

  //Daisuushii 大四喜 • Big Four Winds yakuman //CHECK
  isDaisuushii({hand, discard, playerMelds: currentMelds});
  //REMEMBER //TODO if there is Daisuushii do not count Shousuushii

  //Chanta 全帯 • Terminals and Honors Everywhere //Working
  isChanta({hand, discard, playerMelds: currentMelds});

  //Junchan 純全帯么 • Terminals Everywhere //WORKING //but check it with checkMelds 2.0 ver //also it can be closed or opened
  isJunchan({hand, discard, playerMelds: currentMelds});

  //Honroutou 混老頭 • All Terminals and Honors //WORKING
  isHonrotou({hand, discard, playerMelds: currentMelds});

  //Chinroutou 清老頭 • All Terminals Yakuman //WORKING
  isChinroutou({hand, discard, playerMelds: currentMelds});

  //Tsuuiisou 字 色 • All Honors yakuman //WORKING
  isTsuuiisou({hand, discard, playerMelds: currentMelds});

  //yakus based on PAIRS / triplets / quads
  isChiitoitsu({hand, discard});
  // add is tenpai with chiitoitsu???

  //Toitoi 対々 • All Triplets //working
  isToiToi({hand, discard, playerMelds: currentMelds});

  //San ankou 三暗刻 • Three Concealed Triplets
  //TODO FIX ISSUES https://riichi.wiki/Sanankou
  //he third triplet may not be completed off another player's discard (ron), as the triplet would not be "concealed".
  //isSanankou({hand, discard, playerMelds: currentMelds});

  //Suuankou 四暗刻 • Four Concealed Triplets yakuman
  //TODO FIX ISSUES https://riichi.wiki/Suuankou
  //he third triplet may not be completed off another player's discard (ron), as the triplet would not be "concealed".
  isSuuankou({hand, discard, playerMelds: currentMelds});

  //Sanshoku doukou 三色同刻 • Three Colored Triplets //WORKING //TODO /
  isSanshokuDoukou({hand, discard, playerMelds: currentMelds});

  //Sankantsu 三槓子 • Three Quads //TODO //PROBLEM WITH KANS
  isSankantsu({hand, discard, playerMelds: currentMelds});

  //Suukantsu 四槓子 • Four Quads yakuman //TODO //PROBLEM WITH KANS
  isSuukantsu({hand, discard, playerMelds: currentMelds});

  //yakus basED ON SUITS

  //Hon itsu 混 色 • Half Flush //WORKING
  isHonitsu({hand, discard, playerMelds: currentMelds});

  //Chinistu // only one  suit full flush //WORKING
  isChinitsu({hand, discard, playerMelds: currentMelds});

  // /Ryuuiisou 緑 色 • All Green yakuman //WORKING
  isRyuuiisou({hand, discard, playerMelds: currentMelds});

  //Chuuren poutou 九連宝燈 • Nine Gates yakuman //closed only //WORKING
  isChuurenPoutou({hand, discard, playerMelds: currentMelds});

  //Kokushi musou 国士無双 • Thirteen Orphans yakuman //WORKING
  isKokushiMusou({hand, discard, playerMelds: currentMelds});

  /*      if (result && typeOfAction === 'RON') {
        //if player1 show buttons
        if (currentPlayer === 'player1') {
          setDisplayRonButton(true);
        }
      } else if (result && typeOfAction === 'TSUMO') {
        if (currentPlayer === 'player1') {
          setDisplayTsumoButton(true);
        }
      } else {
        return null;
      } */

  //array of functions

  //TODO check if all yakus are in this array
  const yakuChecks = [
    isPinfu,
    isIipeikou,
    isIttsuu,
    isRyanpeikou,
    isSanshokuDoujun,
    isTanyao,
    isYakuhai,
    isShousangen,
    isDaisangen,
    isShousuushii,
    isDaisuushii,
    isChanta,
    isJunchan,
    isHonrotou,
    isChinroutou,
    isTsuuiisou,
    isChiitoitsu,
    isToiToi,
    isSanshokuDoukou,
    isSuukantsu,
    isSankantsu,
    isSuuankou,
    isHonitsu,
    isChinitsu,
    isRyuuiisou,
    isChuurenPoutou,
    isKokushiMusou,
  ];

  let ron = false;
  let tsumo = false;

  //TODO make it more elegant, finish yakus

  //this function is now in handleRon, handleTsumo
  /* let totalHanRon = 0;
  let totalHanTsumo = 0;
  let listOfYakusInHand: YakuType[] = [];
  for (const check of yakuChecks) {
    const result = check({hand, discard, playerMelds: currentMelds});
    if (typeof result === 'object' && result.result) {
      if (result.typeOfAction === 'RON') {
        totalHanRon += result.han || 0;
        listOfYakusInHand.push({han:result.han, yakuName:result.yakuName});
      } else if (result.typeOfAction === 'TSUMO') {
        totalHanTsumo += result.han || 0;
        listOfYakusInHand.push({han:result.han, yakuName:result.yakuName});
      }
    }
  } */

  //this for loop checks if tsumo or ron is valid
  type YakuResult = {
    result: boolean;
    typeOfAction: 'TSUMO' | 'RON' | '';
  };
  for (const check of yakuChecks) {
    const result: YakuResult | boolean = check({
      hand,
      discard,
      playerMelds: currentMelds,
    });
    if (typeof result === 'object' && result.result) {
      if (result.typeOfAction === 'RON') {
        ron = true;
      } else if (result.typeOfAction === 'TSUMO') {
        tsumo = true;
      }
    }
  }

  if (ron && currentPlayer === 'player1') {
    setDisplayRonButton(true);
  }

  if (tsumo && currentPlayer === 'player1') {
    setDisplayTsumoButton(true);
  }

  const end = performance.now();
  console.log(
    `isWinning() took  ${
      (end - start) / 1000
    } seconds`,
  );
}

//https://speechgen.io/en/tts-japanese/
//Daichi
