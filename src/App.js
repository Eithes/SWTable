import React, { Component } from 'react';

import NavBar from './components/layout/NavBar/NavBar';
import Routes from './components/Routes/Routes';
import CharsState from './components/contexts/charsContext/CharsState.context';
import PaginationState from './components/contexts/paginationContext/PaginationState.context';
import AddFormState from './components/contexts/addFormContext/addFormState.context';

class App extends Component {
  render() {    
    return (
      <div className="App">
        <NavBar />
        <div className="container">      
          <PaginationState>
            <CharsState>
              <AddFormState>
              <Routes />
              </AddFormState>
            </CharsState>
          </PaginationState>
        </div>
      </div>
    );
  }
}

export default App;
