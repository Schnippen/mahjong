import {Button, Image, Overlay, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {ScrollView, View, Dimensions, FlatList, Settings} from 'react-native';
import {mahjongTilesSVGsArray} from '../Assets/MahjongTiles/MahjongTiles';
import {SvgXml} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import ButtonSettings from '../Components/Buttons/ButtonSettings';
import ButtonQuestionmark from '../Components/Buttons/ButtonQuestionmark';
import SettingsOverlay from '../Components/SettingsOverlay';
import {
  StolenTilesPlayerFRONT,
  StolenTilesPlayerKANCLOSED,
  StolenTilesPlayerKANFRONT,
  StolenTilesPlayerKANLEFT,
  StolenTilesPlayerKANRIGHT,
  StolenTilesPlayerLEFT,
  StolenTilesPlayerRIGHT,
} from '../Components/StolenTiles/StolenTilesPlayer/StolenTilesPlayer';
import {
  ButtonCHII,
  ButtonPASS,
} from '../Components/Buttons/ButtonSteal/ButtonSteal';
import {PlayersRiver} from '../Components/River/PlayersRiver';
import {
  TileInTheRiverComponentFront,
  TileInTheRiverComponentLeft,
  TileInTheRiverComponentRight,
  TileInTheRiverComponentTop,
} from '../Components/RiverTiles/RiverTiles';
import {RiverRight} from '../Components/River/RiverRight';
import {RiverLeft} from '../Components/River/RiverLeft';
import {rollDice} from '../Store/wallReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store/store';
import WallCalculation from '../Functions/wallCalculation';
//tiles
//winning conditions
//tile component
//wall component
//center compass component with
//handle tile discard - double tap, or drag???
//hand component
//handle turn?
//https://www.npmjs.com/package/react-native-orientation-locker

//SCREEN COMPOSITION
// bottom ROW - player hand
//player hand buttons timer tile to take ,

//PERSPECTIVe in richii city from bottom up
//padding to hand 5px
//player tile height 159px
//from top of tile to bottom of wall 27px
//wall height - two tiles 74px - one tile 58px
//from top of player hand to the bottom compass 344px
//compass dimensions bottom perimeter 323 px/ top perimeter 305px/ height all 208px

//Colors:
//In the River:
//Tile Front: e9ebe8
//tile shadow: bdbbc0
//tile back: 56a2c4
//In the Wall:
//tile Front: 98dffb"
//tile shadow: 44809a
//tile back: a39f9e
//
//number of tiles: 17*4
//types of styling
//-on hand NESW
//-on wall NESW
//-on sidetabke NESW
//-on River NESW
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
//console.log("Dimensions: ",screenWidth,"width x height:",screenHeight)

const TileComponent = ({
  svg,
  tileRatioProp = 3,
}: {
  svg: string;
  tileRatioProp: number;
}) => {
  const tileRatio = tileRatioProp;
  const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
  const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
  const tileDepth = +(7.66 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
  const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileSecondLayer = +(tileHeight + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height
  const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
  const tileBorderRadiusHandPlayerPerspective = 8;
  //ramka 5 px - szare 13   = 18 +1 = 19+2=21
  //sare ma padding 1 z lewej i prawej, kontur ma grubość 2 //TODO create perspective that is scalable
  return (
    <View
      style={{
        backgroundColor: '#56a2c4',
        height: tileBottomLayer,
        width: tileWidth,
        justifyContent: 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
      }}>
      <View
        style={{
          backgroundColor: '#bdbbc0',
          height: tileSecondLayer,
          width: tileWidth - 2,
          justifyContent: 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#e9ebe8',
            height: tileHeight,
            width: tileWidth - 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
          }}>
          <SvgXml
            width={tileImageWidth}
            height={tileImageHeight}
            xml={svg}
            style={{borderRadius: tileBorderRadiusHandPlayerPerspective}}
          />
        </View>
      </View>
    </View>
  );
};

const RichiiStick = ({degrees}: {degrees: number}) => {
  //use transform on it
  const position =
    degrees === 0
      ? 'front'
      : degrees === 90
      ? 'right'
      : degrees === 180
      ? 'top'
      : degrees === 270
      ? 'left'
      : null;
  return (
    <View
      style={{
        width: 130,
        backgroundColor: '#bdbbc0',
        height: 18,
        borderWidth: 1,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderRadius: 6,
      }}>
      <View
        style={{
          backgroundColor: '#e9ebe8',
          width: position === 'front' || 'top' ? 126 : 124,
          height: position === 'front' || 'top' ? 14 : 16,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: position === 'front' || 'top' ? 'center' : 'flex-end',
          borderRadius: 4,
        }}>
        <View
          style={{
            backgroundColor: '#bd383b',
            height: 8,
            width: 8,
            borderRadius: 8,
          }}></View>
      </View>
    </View>
  );
};

const PlayersHandComponent = () => {
  const playersHandData = mahjongTilesSVGsArray.slice(14, 27);
  const nextTile = mahjongTilesSVGsArray.slice(28, 29).toString();

  const renderItem = ({item}: {item: string}) => (
    <TileComponent svg={item} tileRatioProp={1.5} />
  );

  return (
    <View style={{flexDirection: 'row', backgroundColor: 'gray'}}>
      <View style={{flex: 14, alignItems: 'center'}}>
        <FlatList
          horizontal
          scrollEnabled={false}
          data={playersHandData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{backgroundColor: 'red'}}
        />
      </View>
      <View style={{backgroundColor: 'blue', flex: 2}}>
        <TileComponent svg={nextTile} tileRatioProp={1.5} />
      </View>
    </View>
  );
};

const RiverTop = () => {
  const data = mahjongTilesSVGsArray.slice(12, 30); //river data
  //TODO add riichi indicator in conditional styling, richii tile will not be in the center ;c //-120 elevation: 1
  //add zIndex to the last tile //TODO just use transform translate flip it on its head and flip Y axis
  const renderItem = ({item, index}: {item: string; index: number}) => (
    <View
      style={{
        marginTop: index >= 6 && index < 18 ? -25 : index >= 18 ? -105 : 0,
        marginLeft: index >= 18 ? 360 : 0,
        zIndex: -1,
      }}>
      <TileInTheRiverComponentTop svg={item} tileRatioProp={2} index={index} />
    </View>
  );

  const numOfColumns = 6;
  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: 'lightblue',
        width: 420,
        height: 270,
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        scrollEnabled={false}
        numColumns={numOfColumns}
        keyExtractor={(item, index) => index.toString()}
        CellRendererComponent={({children}) => children}
        removeClippedSubviews={false}
      />
    </View>
  );
};

const Compass = () => {
  //measuring from screenshot as a scale of reference
  const compassBottomPerimeter = 320; //320-200=120
  const compassTilesCounterBottomPerimeter = +(100 * 1.0188).toFixed(2);
  const compassTurnIndicatorBottomPerimeter = 200;
  const backgroundColor = '#5a5a66';
  const backgroundColorSec = '#2f2f39';
  const CompassTileCounter = () => {
    //317  /100 //center piece
    return (
      <View
        style={{
          backgroundColor: '#1d1d1f',
          width: compassTilesCounterBottomPerimeter,
          height: compassTilesCounterBottomPerimeter,
          alignItems: 'center',
          borderBottomWidth: 4,
          borderBottomColor: '#1b2a2d',
          borderRadius: 2,
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 22,
            textAlign: 'center',
            width: '100%',
            textAlignVertical: 'center',
            color: '#4affff',
            borderTopRightRadius: 2,
            borderTopLeftRadius: 2,
          }}>
          EAST 3
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 40,
            width: '100%',
            textAlign: 'center',
            color: '#4affff',
          }}>
          69
        </Text>
      </View>
    );
  };
  const CompassTurnIndicator = () => {
    const TriangleRight = () => {
      return (
        <View
          style={{
            width: 0,
            height: 0,
            borderLeftWidth: 0,
            borderRightWidth: 50,
            borderBottomWidth: 40,
            borderTopWidth: 0,
            borderStyle: 'solid',
            backgroundColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'lime',
            borderTopColor: 'lime',
            position: 'absolute',
            top: 0,
            right: 0,
          }}></View>
      );
    };
    const TriangleLeft = () => {
      return (
        <View
          style={{
            width: 0,
            height: 0,
            borderLeftWidth: 50,
            borderRightWidth: 0,
            borderBottomWidth: 40,
            borderTopWidth: 0,
            borderStyle: 'solid',
            backgroundColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'lime',
            borderTopColor: 'lime',
            position: 'absolute',
            top: 0,
            left: 0,
          }}></View>
      );
    };
    const containerWidth = 200;
    return (
      <View
        style={{
          width: 200,
          height: 40,
          backgroundColor: 'transparent',
          position: 'relative',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            height: 70,
            width: containerWidth,
            backgroundColor: 'transparent',
            bottom: 0,
            position: 'absolute',
          }}>
          <View style={{width: containerWidth, position: 'relative'}}>
            <View
              style={{
                position: 'absolute',
                height: 40,
                width: 100,
                backgroundColor: 'lime',
                top: 0,
                left: 50,
              }}
            />
            <TriangleRight />
            <TriangleLeft />
          </View>
        </View>
        <View style={{backgroundColor: '#39383d', height: 30}}>
          <Text
            style={{
              fontSize: 20,
              color: '#ffdb51',
              textAlignVertical: 'center',
              textAlign: 'center',
            }}>
            25000
          </Text>
        </View>
      </View>
    );
  };
  const CompassRichiiIndicator = ({
    isRichiiActive,
    degrees,
  }: {
    isRichiiActive: boolean;
    degrees: number;
  }) => {
    return (
      <View
        style={{
          width: 200,
          height: 30,
          justifyContent: 'center',
          backgroundColor: '#5d5d69',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'black',
            height: 20,
            width: 150,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isRichiiActive ? <RichiiStick degrees={degrees} /> : null}
        </View>
      </View>
    );
  };
  const CompassWindIndicator = () => {
    const Triangle = () => {
      return (
        <View
          style={{
            width: 0,
            height: 0,
            borderLeftWidth: 30,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderTopWidth: 30,
            borderStyle: 'solid',
            backgroundColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#39383d',
            borderTopColor: '#39383d',
            position: 'absolute',
            top: 0,
            right: 0,
          }}></View>
      );
    };
    //16=south
    //17=north
    //28=west
    //39=east #bc2f38
    let index = 28;
    let defaultWindBackground = 'beige';
    let currentWindBackground =
      index === 39 ? '#bc2f38' : defaultWindBackground;
    return (
      //65 45
      <View
        style={{
          borderBottomLeftRadius: 8,
          width: 60,
          height: 60,
          backgroundColor: currentWindBackground,
          position: 'absolute',
          bottom: 0,
          left: 0,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}>
        <Triangle />
        <SvgXml
          width={50}
          height={50}
          xml={mahjongTilesSVGsArray[index]}
          style={{marginLeft: 2, marginBottom: 2}}
        />
      </View>
    );
  };
  const PlayerSide = ({
    isRichiiActive,
    degrees = 0,
    bottomPosition = 0,
    topPosition = 0,
    leftPosition = 0,
    rightPosition = 0,
  }: {
    isRichiiActive: boolean;
    degrees: number;
    bottomPosition: number;
    topPosition: number;
    leftPosition: number;
    rightPosition: number;
  }) => {
    //TODO to 125 to have perspecive
    //const degrees=0
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flexDirection: 'row',
          height: 70,
          justifyContent: 'center',
          width: compassBottomPerimeter,
          transform: [{rotate: `${degrees}deg`}],
          position: 'absolute',
          top: rightPosition,
          left: leftPosition,
          right: rightPosition,
          bottom: bottomPosition,
        }}>
        <CompassWindIndicator />
        <View
          style={{
            flexDirection: 'column',
            height: 70,
            backgroundColor: 'transparent',
          }}>
          <CompassTurnIndicator />
          <CompassRichiiIndicator
            isRichiiActive={isRichiiActive}
            degrees={degrees}
          />
        </View>
      </View>
    );
  };
  //        <CompassTileCounter/>
  //transform: [{rotateX: '45deg'}]
  return (
    <View
      style={{
        borderBottomWidth: 8,
        borderRadius: 8,
        /*  transform: [{rotateX: '45deg'}, {rotateZ: '0deg'},{scale:0.75}] */ backgroundColor:
          '#5d5d69',
        width: 320,
      }}>
      <View
        style={{
          backgroundColor: '#39383d',
          width: compassBottomPerimeter, //
          height: compassBottomPerimeter, //padding 8   8 45
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}>
        <CompassTileCounter />
        <PlayerSide
          isRichiiActive={true}
          degrees={0}
          leftPosition={0}
          rightPosition={250}
          bottomPosition={0}
          topPosition={0}
        />
        <PlayerSide
          isRichiiActive={false}
          degrees={90}
          leftPosition={-125}
          rightPosition={125}
          bottomPosition={0}
          topPosition={0}
        />
        <PlayerSide
          isRichiiActive={false}
          degrees={180}
          leftPosition={0}
          rightPosition={0}
          bottomPosition={0}
          topPosition={0}
        />
        <PlayerSide
          isRichiiActive={false}
          degrees={270}
          leftPosition={125}
          rightPosition={125}
          bottomPosition={0}
          topPosition={0}
        />
      </View>
    </View>
  );
};

const WallTile = ({
  svg,
  tileRatioProp = 3,
  zIndex,
}: {
  svg: string;
  tileRatioProp: number;
  zIndex: number;
}) => {
  const tileRatio = tileRatioProp;
  const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
  const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
  const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
  const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileSecondLayer = +(tileHeight + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height
  const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
  const tileBorderRadiusHandPlayerPerspective = 8;
  const riverJustifyContent = true;
  const isTileFaceUp = false; //TODO fix the perspective
  const colorBottomLayer = '#98dffb';
  const colorSecondLayer = '#44809a';
  const colorFaceLayer = '#a39f9e';
  return (
    <View
      style={{
        backgroundColor: colorFaceLayer,
        height: tileBottomLayer,
        width: tileWidth,
        justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
        zIndex: zIndex,
      }}>
      <View
        style={{
          backgroundColor: colorSecondLayer,
          height: tileSecondLayer - 5,
          width: tileWidth - 2,
          justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: colorBottomLayer,
            height: tileHeight,
            width: tileWidth - 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
          }}>
          <SvgXml
            width={tileImageWidth}
            height={tileImageHeight}
            xml={svg}
            style={{
              borderRadius: tileBorderRadiusHandPlayerPerspective,
              transform: [{rotate: `${0}deg`}],
            }}
          />
        </View>
      </View>
    </View>
  );
};

const WallFront = () => {
  const evenTiles: any = [];
  const oddTiles: any = [];

  mahjongTilesSVGsArray.slice(0, 8).forEach((item, index) => {
    const zIndex = index % 2 === 0 ? 1 : 0;
    if (index % 2 === 0) {
      evenTiles.push(
        <WallTile svg={item} tileRatioProp={1} key={index + 'a'} zIndex={1} />,
      );
    } else {
      oddTiles.push(
        <WallTile svg={item} tileRatioProp={1} key={index + 'a'} zIndex={0} />,
      );
    }
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        height: 80,
        position: 'relative',
      }}>
      <View
        style={{
          backgroundColor: 'lime',
          flexDirection: 'row',
          position: 'absolute',
          top: 10,
        }}>
        {oddTiles}
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          flexDirection: 'row',
          position: 'absolute',
          top: 0,
        }}>
        {evenTiles}
      </View>
    </View>
  );
};

const WallTileLeft = ({
  svg,
  tileRatioProp = 3,
  zIndex,
}: {
  svg: string;
  tileRatioProp: number;
  zIndex: number;
}) => {
  const tileRatio = tileRatioProp;
  const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
  const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
  const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
  const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileSecondLayer = +(tileHeight + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height
  const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2); //TODO check the Riverleft values
  const tileBorderRadiusHandPlayerPerspective = 8;
  const riverJustifyContent = true;
  const isTileFaceUp = false; //TODO fix the perspective
  const colorBottomLayer = '#98dffb';
  const colorSecondLayer = '#44809a';
  const colorFaceLayer = '#a39f9e';
  return (
    <View
      style={{
        backgroundColor: colorFaceLayer,
        height: tileWidth + 8,
        width: tileBottomLayer - 6,
        justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
        zIndex: zIndex,
        marginTop: -6,
      }}>
      <View
        style={{
          backgroundColor: colorSecondLayer,
          height: tileWidth + 2,
          width: tileSecondLayer - 5,
          justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            backgroundColor: colorBottomLayer,
            height: tileWidth - 2,
            width: tileHeight,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
          }}>
          <SvgXml
            width={tileImageWidth}
            height={tileImageHeight}
            xml={svg}
            style={{
              borderRadius: tileBorderRadiusHandPlayerPerspective,
              transform: [{rotate: `${90}deg`}],
            }}
          />
        </View>
      </View>
    </View>
  );
};

const WallLeft = () => {
  const evenTiles: any = [];
  const oddTiles: any = [];

  mahjongTilesSVGsArray.slice(0, 8).forEach((item, index) => {
    const zIndex = index % 2 === 0 ? 1 : 0;
    if (index % 2 === 0) {
      evenTiles.push(
        <WallTileLeft
          svg={item}
          tileRatioProp={1}
          key={index + 'a'}
          zIndex={1}
        />,
      );
    } else {
      oddTiles.push(
        <WallTileLeft
          svg={item}
          tileRatioProp={1}
          key={index + 'a'}
          zIndex={0}
        />,
      );
    }
  });

  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: 'lightblue',
        width: 80,
        position: 'relative',
      }}>
      <View
        style={{
          backgroundColor: 'lime',
          flexDirection: 'column',
          position: 'absolute',
          top: 5,
          left: 3,
        }}>
        {oddTiles}
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          flexDirection: 'column',
          position: 'absolute',
          top: 0,
        }}>
        {evenTiles}
      </View>
    </View>
  );
};
const WallTileRight = ({
  svg,
  tileRatioProp = 3,
  zIndex,
}: {
  svg: string;
  tileRatioProp: number;
  zIndex: number;
}) => {
  const tileRatio = tileRatioProp;
  const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
  const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
  const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
  const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileSecondLayer = +(tileHeight + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height
  const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2); //TODO check the Riverleft values
  const tileBorderRadiusHandPlayerPerspective = 8;
  const riverJustifyContent = true;
  const isTileFaceUp = false; //TODO fix the perspective
  const colorBottomLayer = '#98dffb';
  const colorSecondLayer = '#44809a';
  const colorFaceLayer = '#a39f9e';
  return (
    <View
      style={{
        backgroundColor: colorFaceLayer,
        height: tileWidth + 8,
        width: tileBottomLayer - 6,
        justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
        zIndex: zIndex,
        marginTop: -6,
        alignItems: 'flex-end',
      }}>
      <View
        style={{
          backgroundColor: colorSecondLayer,
          height: tileWidth + 2,
          width: tileSecondLayer - 5,
          justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: colorBottomLayer,
            height: tileWidth - 2,
            width: tileHeight,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
          }}>
          <SvgXml
            width={tileImageWidth}
            height={tileImageHeight}
            xml={svg}
            style={{
              borderRadius: tileBorderRadiusHandPlayerPerspective,
              transform: [{rotate: `${90}deg`}],
            }}
          />
        </View>
      </View>
    </View>
  );
};

const WallRight = () => {
  const evenTiles: any = [];
  const oddTiles: any = [];
  mahjongTilesSVGsArray.slice(9, 17).forEach((item, index) => {
    const zIndex = index % 2 === 0 ? 1 : 0;
    if (index % 2 === 0) {
      evenTiles.push(
        <WallTileRight
          svg={item}
          tileRatioProp={1}
          key={index + 'a'}
          zIndex={1}
        />,
      );
    } else {
      oddTiles.push(
        <WallTileRight
          svg={item}
          tileRatioProp={1}
          key={index + 'a'}
          zIndex={0}
        />,
      );
    }
  });

  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: 'lightblue',
        width: 80,
        position: 'relative',
      }}>
      <View
        style={{
          backgroundColor: 'lime',
          flexDirection: 'column',
          position: 'absolute',
          top: 5,
          left: 0,
        }}>
        {oddTiles}
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          flexDirection: 'column',
          position: 'absolute',
          top: 0,
          left: 3,
        }}>
        {evenTiles}
      </View>
    </View>
  );
};

const WallTileTop = ({
  svg,
  tileRatioProp = 3,
  zIndex,
}: {
  svg: string;
  tileRatioProp: number;
  zIndex: number;
}) => {
  const tileRatio = tileRatioProp;
  const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
  const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
  const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
  const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileSecondLayer = +(tileHeight + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height
  const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
  const tileBorderRadiusHandPlayerPerspective = 8;
  const riverJustifyContent = true;
  const isTileFaceUp = false; //TODO fix the perspective
  const colorBottomLayer = '#98dffb';
  const colorSecondLayer = '#44809a';
  const colorFaceLayer = '#a39f9e';
  return (
    <View
      style={{
        backgroundColor: colorFaceLayer,
        height: tileBottomLayer,
        width: tileWidth,
        justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
        zIndex: zIndex,
      }}>
      <View
        style={{
          backgroundColor: colorSecondLayer,
          height: tileSecondLayer - 5,
          width: tileWidth - 2,
          justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: colorBottomLayer,
            height: tileHeight,
            width: tileWidth - 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
          }}>
          <SvgXml
            width={tileImageWidth}
            height={tileImageHeight}
            xml={svg}
            style={{
              borderRadius: tileBorderRadiusHandPlayerPerspective,
              transform: [{rotate: `${0}deg`}],
            }}
          />
        </View>
      </View>
    </View>
  );
};

const WallTop = () => {
  const evenTiles: any = [];
  const oddTiles: any = [];

  mahjongTilesSVGsArray.slice(17, 25).forEach((item, index) => {
    const zIndex = index % 2 === 0 ? 1 : 0;
    if (index % 2 === 0) {
      evenTiles.push(
        <WallTileTop
          svg={item}
          tileRatioProp={1}
          key={index + 'a'}
          zIndex={1}
        />,
      );
    } else {
      oddTiles.push(
        <WallTileTop
          svg={item}
          tileRatioProp={1}
          key={index + 'a'}
          zIndex={0}
        />,
      );
    }
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        height: 80,
        position: 'relative',
      }}>
      <View
        style={{
          backgroundColor: 'lime',
          flexDirection: 'row',
          position: 'absolute',
          top: 12,
        }}>
        {oddTiles}
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          flexDirection: 'row',
          position: 'absolute',
          top: 0,
        }}>
        {evenTiles}
      </View>
    </View>
  );
};

const PlayerPanel = () => {
  return (
    <View
      style={{
        backgroundColor: 'purple',
        height: 130,
        width: screenWidth,
        rowGap: 12,
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 8,
          justifyContent: 'flex-end',
        }}>
        <ButtonCHII />
        <ButtonPASS />
      </View>
      <PlayersHandComponent />
    </View>
  );
};

//TODO oficjalna skala z perspektywą???
function MahjongScreen({navigation, route}: any) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };

  const MenuPanel = ({navigation}: {navigation: any}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'pink',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: 0,
        }}>
        <ButtonQuestionmark />
        <ButtonSettings navigation={navigation} toggleOverlay={toggleOverlay} />
      </View>
    );
  };
  const DICE_ROLL = useSelector(
    (state: RootState) => state.wallReducer.diceRoll,
  );
  const dispatch = useDispatch();
  console.log('DICE_ROLL:', DICE_ROLL);
  return (
    <ScrollView style={{flex: 1}}>
      <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay}>
        <SettingsOverlay />
      </Overlay>
      <Button title="rollDice" onPress={() => dispatch(rollDice())}></Button>
      <Button title="startGame" onPress={() => WallCalculation()}></Button>

      {/* MAIN SCREEN WITH GAME BOARD */}
      <View style={{backgroundColor: 'red', flex: 1, alignItems: 'center'}}>
        <MenuPanel navigation={navigation} />
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'blue',
            justifyContent: 'center',
            width: 540,
            height: 560,
            position: 'relative',
            transform: [{rotateX: '45deg'}, {rotateZ: '0deg'}, {scale: 0.5}],
          }}>
          <Compass />
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 600,
              alignItems: 'center',
            }}>
            {/* <RiverTop/> */}
          </View>
          <View
            style={{
              position: 'absolute',
              right: 460,
              top: 50,
              height: 460,
              width: 250,
              justifyContent: 'center',
              backgroundColor: 'orange',
              alignItems: 'center',
            }}>
            {/* <RiverLeft/> */}
          </View>
          <View
            style={{
              position: 'absolute',
              left: 460,
              bottom: 50,
              height: 460,
              width: 250,
              backgroundColor: 'pink',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <RiverRight/>*/}
          </View>
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 460,
              width: 600,
              alignItems: 'center',
              marginBottom: 5,
            }}>
            {/* <PlayersRiver/>  */}
            {/* <RiverLeft/>  */}
            {/* <RiverTop/> */}
          </View>
        </View>
      </View>
      <View style={{flex: 1, height: 300}}>
        {/* <WallFront/>  */}
        {/* <View style={{flexDirection:"row"}}><StolenTilesPlayerKANCLOSED/>
            <StolenTilesPlayerRIGHT/>
            <StolenTilesPlayerFRONT/>
            </View> */}

        {/* <DoraPanel/> */}
        {/* <WallLeft/> */}
        {/* <WallRight/> */}
        {/* <RichiiStick degrees={180}/> */}
        {/* <WallTop/> */}
        {/*  <ButtonRON/>         
             <ButtonRIICHI/>
             <ButtonKAN/>
             <ButtonPON/>
             <ButtonPASS/>   
             <ButtonCHII/>
             <ButtonCANCEL/> */}
        {/* <PlayerPanel/> */}
      </View>
    </ScrollView>
  );
} //TODO change the left and right tiles in compass with correct width and height
export default MahjongScreen;
//https://github.com/software-mansion/react-native-reanimated/issues/2750
