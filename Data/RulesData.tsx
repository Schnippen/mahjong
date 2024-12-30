import React from 'react';
//TODO make it good
export const RulesOverview =
  'Riichi Mahjong is a Japanese variant of the Chinese game of Mahjong.\n' +
  'Four players compete to complete a winning hand and score points from others.\n' +
  'It shares similarities with Rummikub, gin rummy, and poker.';

export const RulesTheTiles =
  'The game uses 34 different tiles, each with four copies, totaling 136 tiles.\n' +
  'Tiles are grouped into three suits with numbers 1 to 9:\ncharacters, circles, and bamboo.';

export const RulesFlowers =
  'Riichi Mahjong does not use flower, season, or joker tiles like in other variants.';

export const RulesTheHand =
  'Players start with 13 tiles and draw one each turn, forming 14 tiles temporarily.\n' +
  'A winning hand consists of four sets and a pair (3+3+3+3+2=14) with a valid yaku.\n' +
  'If incomplete, discard one tile to return to 13 tiles.';

export const RulesKan =
  'A kan uses four tiles and must be declared to form part of a winning hand.\n' +
  'After declaring, draw a replacement tile from the dead wall.\n' +
  'Closed kans can be declared at any time before winning.';

export const RulesPlayingFirstParagraph = `The game starts with tiles shuffled into face-down walls. Players take turns drawing a tile, then discarding one, placing it in rows in front of them. Discards are arranged in order, typically six per row.`;

export const RulesPlayingSecondParagraph = `Players may call a discarded tile to complete a set, which must be shown face-up and cannot be changed later. If no one calls the tile, play continues anti-clockwise, with the next player drawing from the wall.`;

export const RulesPlayingThirdParagraph = `The hand ends when a player wins or the wall is empty (except the dead wall). If the dealer wins or is one tile from winning in a draw, they keep the dealership; otherwise, it passes to the right. The game progresses from East round to South round.`;

export const RulesCallingTilesFirst = `Players can call discarded tiles to complete a set or their hand. The types of calls are:`;

export const RulesCallChii = `Chii: Used to complete a sequence, only from the player to your left.`;
export const RulesCallPon = `Pon: Used to complete a triplet, callable from any player.`;
export const RulesCallKan = `Kan: Used to complete a kan, callable from any player or with four identical tiles in hand.`;
export const RulesCallRon = `Ron: Called when a discarded tile completes your winning hand.`;
export const RulesCallTsumo = `Tsumo: Called when you draw the winning tile yourself from the wall.`;

export const RulesCallingTilesSecond = `After a set is called, tiles are placed face-up to the right of the player who called them. The called tile is rotated sideways to show who discarded it. For example, in a 567 sou sequence, if the 6 sou is sideways, it means the player to the left discarded it.`;

const RulesWinningFirst = `A winning hand has 14 tiles, usually four sets and a pair, and must include a yaku (a special condition). Yaku increase hand value and add strategy.`;

const RulesWinningSecond = `Each yaku adds han, doubling hand value. Some add multiple han. Players win by calling ron (from a discard) or tsumo (drawing their own tile).`;

const RulesRiichi = `Riichi is declared when a player has a closed hand and is one tile away from winning. Players bet 1000 points and play without altering their hand. Riichi adds yaku and enables reverse dora but limits flexibility.`;

const RulesDora = `Dora tiles, shown in the dead wall, add han to a winning hand but don’t count as yaku. Red fives are also dora. Kans can reveal extra dora indicators, and riichi allows for hidden ura-dora.`;
