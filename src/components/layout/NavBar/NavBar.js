import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';

import NavBarToggleBtn from './NavBarToggleBtn';
import NavBarLink from './NavBarLink';

function NavBar() {

  const [ isOpen, toggleOpen ] = useState(false);

  const onToggle = () => {
    toggleOpen(!isOpen);
  }
 
  return(
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
      <Link to="/" className="navbar-brand">
        StarWars Characters
      </Link>
      <NavBarToggleBtn onToggle={onToggle} isOpen={isOpen} />
      <div
        className={classNames('collapse', 'navbar-collapse', {
          show: isOpen
        })}
      >
        <ul className="navbar-nav">
          <NavBarLink text={'List View'} path={'/'}/> 
        </ul>
      </div>
    </nav>
  );  
}

export default withRouter(NavBar);
