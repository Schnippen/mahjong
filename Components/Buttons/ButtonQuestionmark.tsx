import {Button} from '@rneui/themed';
import React from 'react';

function ButtonQuestionmark({text}: {text: string}) {
  return (
    <Button
      buttonStyle={{
        height: 40,
        width: 40,
        backgroundColor: 'blue',
        borderWidth: 1,
        borderColor: 'beige',
      }}
      radius={50}
      onPress={() => console.log('pressed questionmark')}
      title={text}
    />
  );
}

export default ButtonQuestionmark;
