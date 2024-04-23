import { View, FlatList } from "react-native"
import { mahjongTilesSVGsArray } from "../../Assets/MahjongTiles/MahjongTiles"
import { TileInTheRiverComponentRight } from "../RiverTiles/RiverTiles"

export const RiverRight=()=>{
    const data=mahjongTilesSVGsArray.slice(12,31) //river data 
    //TODO add riichi indicator in conditional styling, richii tile will not be in the center ;c //-120
    //add zIndex to the last tile, index >= 6 && index < 18 ? -25 : index >= 18 ? -105 : 0 
      const renderItem = ({ item,index }:{item:string,index:number}) => (
        
  <View
      style={{
        marginLeft: index === 18? 399 : (index === 0 || index === 6 || index === 12 ? 0 : -14),
        marginTop: index === 18 ? -82 : 0,
        zIndex:-index
      }}
    > 
        <TileInTheRiverComponentRight svg={item} tileRatioProp={2} index={index}/>
        </View>
      )
      const numOfColumns = 6
    return(//480 250
      <View style={{backgroundColor:"lightblue",width:460,height:250,transform: [{rotateZ: '270deg'}],alignItems:'center'}}>
        <FlatList data={data}          
         renderItem={renderItem}
         scrollEnabled={false} numColumns={numOfColumns}
         keyExtractor={(item, index) => index.toString()}/>
      </View>
  )
  }