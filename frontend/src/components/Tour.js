import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

function Tour({ obj, deleteTour }) {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  return (
    <div className="tour">
      <p>{obj.name}</p>
      <FaTimes
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => setDeleteModalIsOpen(true)}
      />

      <Modal
        show={deleteModalIsOpen}
        onHide={() => setDeleteModalIsOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete tour {obj.id}?</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => deleteTour(obj.id)}>Delete</Button>
          <Button
            variant="secondary"
            onClick={() => setDeleteModalIsOpen(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <p>{obj.address.city}</p>

      <Modal show={editModalIsOpen} onHide={() => setEditModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>{obj}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalIsOpen(false)}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>

      <br />
    </div>
  );
}

export default Tour;
