import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

function NavBarLink(props) {

    return(      
      <li className='nav-item'>
          <NavLink 
            activeClassName='nav-link active' 
            to={`${props.path}`} 
            className='nav-link'
            aria-label={props.text}
          >
            {props.text}
          <span className='sr-only'>(current)</span>
        </NavLink>
      </li>
    );
}

export default NavBarLink;

NavBarLink.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,  
};