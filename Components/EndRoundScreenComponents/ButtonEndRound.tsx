import React from "react"
import { Button } from "@rneui/themed"
export const ButtonEndRound=()=>{return(
    <Button
      title="OK"
      buttonStyle={{
        borderColor: 'rgba(78, 116, 289, 1)',
        borderRadius:8
      }}
      type="outline"
      raised
      titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
      containerStyle={{
        width: 80,
/*         marginHorizontal: 50,
        marginVertical: 10, */
        borderRadius:8,
      }}
    />
  )}