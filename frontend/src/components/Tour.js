function Tour({ obj }) {
  return (
    <div className="tour">
      <p>{obj.name}</p>
      <p>{obj.address.city}</p>
      <br />
    </div>
  );
}

export default Tour;
