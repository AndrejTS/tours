import { FaTimes } from 'react-icons/fa';

function Tour({ obj, onDelete }) {
  return (
    <div className="tour">
      <p>{obj.name}</p>
      <FaTimes
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => onDelete(obj.id)}
      />
      <p>{obj.address.city}</p>
      <br />
    </div>
  );
}

export default Tour;
