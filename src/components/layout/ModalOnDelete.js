import React, { useContext }  from 'react';
import PropTypes from 'prop-types';
import CharItemsContext from '../contexts/charsContext/Chars.context';


const ModalOnDelete = props => {

  const { deleteCharacter, currentChar } = useContext(CharItemsContext);
  const handleDeleteCharacter = () => {
    deleteCharacter(currentChar.id);
  }

  return (
    <div className="modal fade" id="modalOnDelete" tabIndex="-1" role="dialog" aria-labelledby="modalOnDelete" aria-hidden="true" keyboard>
      <div className="modal-dialog modal-dialog-centered " role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center" id="modalOnDeleteHeader">Do yoy want to delete {currentChar && currentChar.name} ?</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>         
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-danger"  data-dismiss="modal"
            onClick={handleDeleteCharacter}
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
};

ModalOnDelete.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
};

export default ModalOnDelete
