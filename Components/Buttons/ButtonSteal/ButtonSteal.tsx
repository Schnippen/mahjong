import { Button } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";

const ButtonShape = ({text,firstColor,secondColor}:{text:string,firstColor:string,secondColor:string}) => {
    return (
      <Button radius={"md"}
      buttonStyle={{height:40,width:120,}}
      titleStyle={{fontWeight:"bold"}}
      ViewComponent={LinearGradient} 
      linearGradientProps={{
        colors: [firstColor, secondColor],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}>
        {text}
      </Button>
    );
  };
  export const ButtonRIICHI=()=>{
    return(
      <ButtonShape text="RIICHI" firstColor="#f6d106" secondColor="#cc7000"/>
    )
  }
  export const ButtonPON=()=>{
    return(
      <ButtonShape text="PON" firstColor="#48cae4" secondColor="#023e8a"/>
    )
  }
  export const ButtonPASS=()=>{
    return(
      <ButtonShape text="PASS" firstColor="#9dc1db" secondColor="#688aa5"/>
    )
  }
  const ButtonCANCEL=()=>{
    return(
      <ButtonShape text="CANCEL" firstColor="#9dc1db" secondColor="#688aa5"/>
    )
  }
  export const ButtonCHII=()=>{
    return(
      <ButtonShape text="CHII" firstColor="#19e09f" secondColor="#12bf63"/>
    )
  }
  export const ButtonKAN=()=>{
    return(
      <ButtonShape text="KAN" firstColor="#be95c4" secondColor="#5e548e"/>
    )
  }
  export const ButtonRON=()=>{
    return(
      <ButtonShape text="RON" firstColor="#dc2f02" secondColor="#fb8b24"/>
    )
  }
  export const ButtonTSUMO=()=>{ 
    return(
      <ButtonShape text="TSUMO" firstColor="#dc2f02" secondColor="#fb8b24"/>
    )
  }
  