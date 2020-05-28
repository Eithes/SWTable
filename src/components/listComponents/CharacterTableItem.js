import React, { memo } from 'react';
import PropTypes from 'prop-types';

import AlterCharButton from '../buttons/AlterCharButton';

function CharacterTableItem(props) {
  
  const { id, name, species, gender, homeworld } = props;
  
  return (  
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{species}</td>
      <td>{gender}</td>
      <td>{homeworld}</td>
      <td>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Actions"
        >
          <AlterCharButton buttonType='aditChar' buttonText='Edit' id={id} history={props.history} />
          <AlterCharButton buttonType='deleteChar' buttonText='Remove' id={id}  /> 
        </div>
      </td>
    </tr>
  );
}

export default memo(CharacterTableItem);

CharacterTableItem.propTypes = {  
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  homeworld: PropTypes.string,
  history: PropTypes.object //eslint-disable-line  
};