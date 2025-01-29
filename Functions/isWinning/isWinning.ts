import {INTERRUPT_TURN, START_GAME} from '../../Store/gameReducer';
import {
  changeWhoTheLoserIs,
  changeWhoTheWinnerIs,
} from '../../Store/playersReducer';
import {
  GameWinds,
  TTileObject,
  TWhoTheWinnerIs,
  TplayerString,
  TstolenTiles,
  TypeOfAction,
  WindTypes,
  YakuCheckFunction,
  YakuType,
} from '../../Types/types';
import {handleAIWin} from '../AI-move/handleAIWin';
import {soundFunc} from '../playSounds/soundFunc';
import {calculateYakusAndPoints} from './calculateYakusAndPoints';
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
import {isRiichi} from './Yaku/isRiichi';
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
  //hand: TTileObject[];
  player1Hand: TTileObject[];
  player2Hand: TTileObject[];
  player3Hand: TTileObject[];
  player4Hand: TTileObject[];
  player1Melds: TstolenTiles[];
  player2Melds: TstolenTiles[];
  player3Melds: TstolenTiles[];
  player4Melds: TstolenTiles[];
  discard: TTileObject[];
  playerName: TplayerString;
  setDisplayRonButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayTsumoButton: React.Dispatch<React.SetStateAction<boolean>>;
  nextTile: TTileObject;
  dispatch: any; //TODO redux
  currentPlayer: TplayerString;
  nextPlayerX: TplayerString;
  riichiIndexPlayer1: number | null;
  riichiIndexPlayer2: number | null;
  riichiIndexPlayer3: number | null;
  riichiIndexPlayer4: number | null;
  player1Wind: WindTypes;
  player2Wind: WindTypes;
  player3Wind: WindTypes;
  player4Wind: WindTypes;
  dorasFromDeadWall: TTileObject[];
  uraDorasFromDeadWall: TTileObject[];
  whoTheWinnerIs: TWhoTheWinnerIs;
  latestTurn: GameWinds;
  navigation: any; //TODO add typescript
};

export function isWinning({
  //hand,
  player1Hand,
  player2Hand,
  player3Hand,
  player4Hand,
  player1Melds,
  player2Melds,
  player3Melds,
  player4Melds,
  discard,
  playerName,
  setDisplayRonButton,
  setDisplayTsumoButton,
  nextTile,
  dispatch,
  currentPlayer,
  nextPlayerX,
  riichiIndexPlayer1,
  riichiIndexPlayer2,
  riichiIndexPlayer3,
  riichiIndexPlayer4,
  player1Wind,
  player2Wind,
  player3Wind,
  player4Wind,
  dorasFromDeadWall,
  uraDorasFromDeadWall,
  whoTheWinnerIs,
  latestTurn,
  navigation,
}: isWinningTypes) {
  const start = performance.now();
  let hand: TTileObject[] = [];
  let currentMelds: TstolenTiles[] = [];
  let playerRiichiIndex: number | null = null;
  let playerWind: WindTypes = 'null';
  if (playerName === 'player1') {
    currentMelds = player1Melds;
    hand = player1Hand;
    playerRiichiIndex = riichiIndexPlayer1;
    playerWind = player1Wind;
  } else if (playerName === 'player2') {
    currentMelds = player2Melds;
    hand = player2Hand;
    playerRiichiIndex = riichiIndexPlayer2;
    playerWind = player2Wind;
  } else if (playerName === 'player3') {
    currentMelds = player3Melds;
    hand = player3Hand;
    playerRiichiIndex = riichiIndexPlayer3;
    playerWind = player3Wind;
  } else if (playerName === 'player4') {
    currentMelds = player4Melds;
    hand = player4Hand;
    playerRiichiIndex = riichiIndexPlayer4;
    playerWind = player4Wind;
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

  //Pinfu //TODO closed //working
  isPinfu({hand, discard, playerMelds: currentMelds});

  //Ryanpeikou Two Pure Double Sequences //closed  //WORKING
  isRyanpeikou({hand, discard, playerMelds: currentMelds});

  //Sanshoku doujun Three Colored Sequences //WORKING
  isSanshokuDoujun({hand, discard, playerMelds: currentMelds});

  //other yakus:

  //Riichi //DONE checkWinningHand.ts

  //Daburu Riichi //TODO //have sounds for that

  //TODO? :
  //Ippatsu //have sound for that
  //Menzen tsumo //have sound for that
  //Haitei raoyue //have sound for that
  //Houtei raoyui //have sound for that
  //Rinshan kaihou //have sound for that
  //Chankan //have sound for that
  //Tenhou  yakuman //have sound for that
  //Chiihou yakuman //have sound for that
  //renhou //have sound for that
  // ----------

  //yakus based on terminals / honors
  //Tanyao 2-8 //TODO need fixing, sometimes when in riichi tanyao counts terminals :/
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
  isChiitoitsu({hand, discard, playerMelds: currentMelds});
  // add is tenpai with chiitoitsu???

  //Toitoi 対々 • All Triplets //working
  isToiToi({hand, discard, playerMelds: currentMelds});

  //San ankou 三暗刻 • Three Concealed Triplets
  //TODO FIX ISSUES https://riichi.wiki/Sanankou
  //he third triplet may not be completed off another player's discard (ron), as the triplet would not be "concealed".
  isSanankou({hand, discard, playerMelds: currentMelds});

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

  //yakus based on suits

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

  //array of functions

  //TODO check if all yakus are in this array
  const yakuChecks: YakuCheckFunction[] = [
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
    isSanankou,
  ];

  let ron = false;
  let tsumo = false;

  //TODO make it more elegant, finish yakus

  //this for loop checks if tsumo or ron is valid
  //RON Process for Check Yakus
  type YakuResult = {
    result: boolean;
    typeOfAction: 'TSUMO' | 'RON' | '';
  };
  //jesli obecna tura nie jest player.name to wtedy sprawdzaj ron
  //nextplayerX!==playerName
  if (nextPlayerX !== playerName) {
    console.log(
      `|||||||| Current Player: ${currentPlayer} is ${playerName}. Checking for RON.`,
    );

    for (const check of yakuChecks) {
      const result: YakuResult = check({
        hand,
        discard,
        playerMelds: currentMelds,
        Process: 'ron',
      });
      //console.log('YakuResult', result);
      //console.log('RON:', discard[0].name);
      if (typeof result === 'object' && result.result) {
        if (result.typeOfAction === 'RON') {
          ron;
        }
      }
    }
  }
  //TSUMO Process for Check Yaku
  if (nextPlayerX === playerName) {
    console.log(
      `%%%%%%% Current Player: ${currentPlayer} is ${playerName}. Checking for TSUMO.`,
    );
    for (const check of yakuChecks) {
      let discard = [nextTile];
      const result: YakuResult = check({
        hand,
        discard,
        playerMelds: currentMelds,
        Process: 'tsumo',
      });
      if (typeof result === 'object' && result.result) {
        if (result.typeOfAction === 'TSUMO') {
          tsumo = true;
        }
      }
    }
  }
  //RON Process for Riichi Yaku
  if (nextPlayerX !== playerName) {
    if (playerRiichiIndex !== null) {
      //check if this whole function works - DONE
      const riichiResult = isRiichi({
        hand,
        discard,
        playerMelds: currentMelds,
        Process: 'ron',
      });
      //console.log('CHECKING FOR RON RIIIICHIIII !!!!!!!!!!!!!!!!!!!!');
      if (
        typeof riichiResult === 'object' &&
        riichiResult.result &&
        riichiResult.typeOfAction === 'RON'
      ) {
        ron = true;
      }
    } else {
      console.log(
        `Player ${playerName} is not in Riichi. Skipping isRiichi check.`,
      );
    }
  }
  //TSUMO Process for Riichi Yaku
  if (nextPlayerX === playerName) {
    if (playerRiichiIndex !== null) {
      //checking in if player declared RIICHI, there might be problem with tsumo?
      //check if this whole function works - DONE
      const discard = [nextTile];
      const riichiResult = isRiichi({
        hand,
        discard,
        playerMelds: currentMelds,
        Process: 'tsumo',
      });
      console.log('CHECKING FOR TSUMO RIIIICHIIII ###########');
      if (
        typeof riichiResult === 'object' &&
        riichiResult.result &&
        riichiResult.typeOfAction === 'TSUMO'
      ) {
        tsumo = true;
      }
    } else {
      console.log(
        `Player ${playerName} is not in Riichi. Skipping isRiichi check.`,
      );
    }
  }

  console.log(
    '~~~:',
    playerName,
    'ron:',
    ron,
    'tsumo:',
    tsumo,
    'cM:',
    currentMelds.map(i => i),
    'cH:',
    hand.map(t => t.name),
    playerName === 'player1',
    'cD:',
    discard[0]?.name,
    'nT:',
    [nextTile][0]?.name,
  );
  //ron works as intended
  if (ron && playerName === 'player1') {
    dispatch(INTERRUPT_TURN({val: true}));
    setDisplayRonButton(true); //turn should be interrupted
  }

  if (tsumo && playerName === 'player1') {
    dispatch(INTERRUPT_TURN({val: true}));
    setDisplayTsumoButton(true); //turn should be interrupted
  }

  const end = performance.now();
  if (ron || tsumo) {
    //IF RON OR TSUMO UPDATE WINNING HAND??????
    //calculate points and yakus HERE!?
    let winningAction: 'ron' | 'tsumo' = ron ? 'ron' : 'tsumo';
    let winningTile: TTileObject[] =
      winningAction === 'ron' ? discard : [nextTile];
    let winningHand: TTileObject[] = hand;
    let winningMelds: TstolenTiles[] = currentMelds;
    let winnerWind: WindTypes = playerWind;
    calculateYakusAndPoints({
      winningAction,
      winningTile,
      winningHand,
      winningMelds,
      playerRiichiIndex,
      dispatch,
      playerWind,
      winnerWind,
      dorasFromDeadWall,
      uraDorasFromDeadWall,
      whoTheWinnerIs,
    });

    //AI Win logic, press Ron or Tsumo
    //TODO test it
    handleAIWin({
      ron,
      tsumo,
      navigation,
      dispatch,
      playerName,
      winnerWind,
      latestTurn,
      player2Wind,
      player3Wind,
      player4Wind,
    });

    const end = performance.now();
    console.info(
      `isWinning() took  ${((end - start) / 1000).toFixed(3)} seconds`,
      'Ron:',
      ron,
      'Tsumo',
      tsumo,
      'playerName:',
      playerName,
    );
  }
  console.log(
    `isWinning() took  ${((end - start) / 1000).toFixed(3)} seconds`,
    'Ron:',
    ron,
    'Tsumo',
    tsumo,
    'playerName:',
    playerName,
  );
}

//https://speechgen.io/en/tts-japanese/
//Daichi
