import * as React from 'react';
import { Switch, Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';

import routerConfig from './routerConfig';

const history = createBrowserHistory();
const router =  () => (
  <Router history={history}>
    <Switch>
    { renderRoutes(routerConfig)}
    </Switch>    
  </Router>
)
export default router;