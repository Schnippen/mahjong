import React from 'react';
import store from './Store/store';
import {Provider} from 'react-redux';
import MainApp from './MainApp';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App(): React.JSX.Element {
  //useEffect for initializing Supabase, is it necessary

  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MainApp />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;