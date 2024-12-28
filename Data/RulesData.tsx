import { Divider } from "@rneui/themed"
import React from "react"
import { Text, ScrollView } from "react-native"
//TODO make it good
export const RulesOverView = "Riichi mahjong is a Japanese variant of the ancient Chinese game of mahjong. It is a tabletop game that is played by four players, with each player having a hand which they must try and complete to win points from the other players. It shares similarities with Rummikub, and card games such as gin rummy and poker."
export const RulesTheTiles = `Riichi mahjong is played with 34 different tiles, of which there are four of each type, to make up 136 tiles used in total. The majority of the tiles consist of the numbers 1 to 9 in three "suits", which are:`
export const RulesFlowers = `Riichi mahjong does not use the flower or season tiles found in Chinese sets, nor the joker tiles used in American Mah Jongg. As an optional rule, riichi mahjong can also be played with one five from each suit being replaced with a red five tile.`
export const RulesTheHand = `Players are dealt 13 tiles each. At the start of their turn, each player will draw a tile from the wall, or claim the discard from another player, which will temporarily give them 14 tiles. At this point, if they have a complete hand of four groups and one pair (3+3+3+3+2=14), and have a valid yaku (explained below), they can declare they have won. If the player doesn’t have a finished hand, they must discard and will go back to 13 tiles.`
export const RulesKan = `As a kan uses up four tiles instead of the usual three for sets, to form part of a winning hand it needs to be declared, and the player receives an extra tile from the dead wall to make up for the extra tile inside the set (otherwise the player will have one too few tiles to make four sets plus one pair). A closed kan is declared by showing all four tiles, and then flipping over a tile at either end. Closed kans do not have to be called as soon as they are formed in the hand – a player can choose when to declare them, though they must be declared before the player can win.`
const RulesPlayingFirstParagraph=`At the start of the game all tiles are shuffled and placed in rows (called “walls”) face-down on the table (see Setting Up below, if playing with physical tiles). Once starting hands have been dealt, the dealer takes a tile from the end of the wall. He then either wins from this tile, or discards a tile of their choosing, placing the discarded tile in front of them. Discards are placed in rows in front of each player, in chronological order, and typically in rows six tiles long.`
const RulesPlayingSecondParagraph=`When a player discards a tile, other players may call it if they wish to use it to complete a set. A tile can only be picked up if it is the final tile in a complete set, which must be displayed face up to the side of the player’s remaining hand. Once a set is called (melded), it no longer forms an active part of the players hand and the tiles that form that meld may not be discarded or swapped. If the tile is not called, then play goes anti-clockwise, and the player to the dealer’s right then picks up a tile from the end of the wall, and will then either discard or complete their hand to win. If the tile is called, the turn switches to the player who called, and play resumes from their position, skipping any players who would otherwise have had a turn.`
const RulesPlayingThirdParagraph=`Play continues until either a player wins, or all tiles in the wall are dealt (except for the dead wall – the last 14 tiles in the wall), in which case the hand is drawn. If the dealer wins, or is in tenpai (one tile away from winning – a 14th tile will complete their hand) in the case of a draw, then they retain their dealership, else dealership passes to the player on their right. The first round is East round, and once all players have been dealer once (i.e. the dealer is the person who started the game as dealer initially) the game becomes South round. Typically a game will consist of an East and a South round.`
export const FirstComponent = () => {
  return (<ScrollView>
    <Text>Basics</Text>
    <Text>{RulesOverView}</Text>
    <Divider />
    <Text>The Tiles</Text>
    <Text>{RulesTheTiles}</Text>
    <Text>Souzu (aka Sou, Bamboo, Sticks):</Text>
    {/* Flatlist with sou */}
    <Text>(Note that the 1 Sou is represented with a bird, usually a peacock or owl, rather than a single stick)</Text>
    <Divider />
    <Text>Pinzu (aka Pin, Circles, Dots):</Text>
    {/* Flatlist with pin */}
    <Divider />
    <Text>Manzu (aka Man, Characters, Cracks):</Text>
    {/* Flatlist with man */}
    <Text>(The numbers are represented with the Chinese/Japanese number characters)</Text>
    <Divider />
    <Text>Winds:</Text>
    {/* Flatlist with man */}
    <Text>(East, South, West, North respectively)</Text>
    <Divider />
    <Text>Dragons:</Text>
    {/* Flatlist with man */}
    <Text>(Green, Red, White respectively)</Text>
    <Divider />
    <Text>{RulesFlowers}</Text>
    <Divider />
    <Text>The Hand</Text>
    <Text>{RulesTheHand}</Text>
    <Text>SPACE SPACE</Text>
    <Text>The core aim of a player while playing mahjong is to create a winning hand by forming sets. There are three types of set:</Text>
    <Divider />
    <Text>Sequence (Shuntsu)</Text>
    <Text>This is the easiest set to form, and consist of a run of three consecutive tiles of the same suit, for example:</Text>
    {/* Flatlist with man */}
    <Text>A sequence cannot wrap around the ends of a suit, cannot be made of tiles from different suits and cannot be made from honour tiles, so the following are not valid sequences:</Text>
    {/* Flatlist with man */}
    <Divider />
    <Text>Triplet (Koutsu)</Text>
    <Text>A triplet consists of three of the same tile, eg:</Text>
    {/* Flatlist with trips */}
    <Divider />
    <Text>Kan (Kantsu)</Text>
    <Text>A kan is four of the same tile, eg:</Text>
    {/* Flatlist with kan */}
    <Text>{RulesKan}</Text>
    <Divider />
  </ScrollView>
  )
}