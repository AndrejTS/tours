import ReactPortal from './ReactPortal';

function Modal({ tourId, modalIsOpen, handleClose, deleteTour }) {
  if (!modalIsOpen) return null;
  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className="overlay" onClick={handleClose} />
      <div className="deleteModal">
        <div>Delete Tour {tourId}</div>
        <button onClick={handleClose}>Close</button>
        <button onClick={() => deleteTour(tourId)}>Delete</button>
      </div>
    </ReactPortal>
  );
}
export default Modal;
