import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

function Tour({ tour, deleteTour, editTour }) {
  const [name, setName] = useState(tour.name);
  const [city, setCity] = useState(tour.address.city);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const updatedTour = {
    ...tour,
    name: name,
    address: { ...tour.address, city: city },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTour(tour.id, updatedTour);
    setEditModalIsOpen(false);
  };

  return (
    <div className="tour">
      <p>{tour.name}</p>
      <FaTimes
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => setDeleteModalIsOpen(true)}
      />

      <span onClick={() => setEditModalIsOpen(true)}>Edit</span>

      <Modal
        show={deleteModalIsOpen}
        onHide={() => setDeleteModalIsOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete tour {tour.id}?</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => deleteTour(tour.id)}>Delete</Button>
          <Button
            variant="secondary"
            onClick={() => setDeleteModalIsOpen(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <p>{tour.address.city}</p>

      <Modal show={editModalIsOpen} onHide={() => setEditModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit">Save</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <br />
    </div>
  );
}

export default Tour;
