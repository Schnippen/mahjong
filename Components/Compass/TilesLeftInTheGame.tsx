import { Text } from "@rneui/themed"
import React from "react"
import { useSelector} from 'react-redux';
import { RootState } from "../../Store/store";

const TilesLeftInTheGame=()=>{
    const tilesToEnd= useSelector((state: RootState) => state.wallReducer.tilesLeftInWall,
  )
    return <Text style={{
      flex: 1,
      fontSize: 40,
      width: '100%',
      textAlign: 'center',
      color: '#4affff',
    }}>{tilesToEnd}</Text>
  }

  export default TilesLeftInTheGame