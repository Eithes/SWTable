import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ListView from '../pages/ListView';
import NotFound from '../pages/NotFound';
import AddForm from '../forms/AddCharForm/AddForm';

function Routes() { 
  return (
    <Switch>
      <Route 
        exact path="/" 
        render={propTypes => <ListView history={propTypes.history} />}
      />
      <Route 
        exact path="/addChar" 
        render={propTypes => <AddForm history={propTypes.history}/>}
      />
       <Route      
        render={() => <NotFound  />}
      />
    </Switch>
  );
}

export default Routes;