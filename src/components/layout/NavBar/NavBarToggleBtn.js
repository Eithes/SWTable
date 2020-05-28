import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function NavBarToggleBtn(props) {  
  const {isOpen, onToggle} = props;

  return(      
    <button
      type="button"
      onClick={() => onToggle()}
      className={classNames('navbar-toggler', {
        collapsed: !isOpen
      })}
      aria-expanded={isOpen}
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>  
  );
}

export default NavBarToggleBtn;

NavBarToggleBtn.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,  
};