import { useState } from 'react';
import Modal from './DeleteModal';
import { FaTimes } from 'react-icons/fa';

function Tour({ obj, deleteTour }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="tour">
      <p>{obj.name}</p>
      <FaTimes
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => setModalIsOpen(true)}
      />
      <Modal
        tourId={obj.id}
        deleteTour={deleteTour}
        handleClose={() => setModalIsOpen(false)}
        modalIsOpen={modalIsOpen}
      />
      <p>{obj.address.city}</p>
      <br />
    </div>
  );
}

export default Tour;
