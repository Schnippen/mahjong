import React from 'react';
import store from './Store/store';
import {Provider} from 'react-redux';
import MainApp from './MainApp';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
        <MainApp />
    </Provider>
  );
}

export default App;