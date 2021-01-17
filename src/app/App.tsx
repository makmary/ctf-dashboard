import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { Spinner, Intent } from '@blueprintjs/core';
import Router from './pages/Router';
import { store, history } from './store';

const App: React.FC = () => (
  <Provider store={store}>
    <Suspense fallback={<Spinner intent={Intent.PRIMARY} />}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Suspense>
  </Provider>
);

export default App;
