import Tour from './Tour';

function Tours({ tours, filtering, changeFiltering, filterTours, deleteTour, editTour }) {
  const onSubmit = (event) => {
    event.preventDefault();
    filterTours();
  };

  return (
    <div className="tours">
      <form onSubmit={onSubmit}>
        <label>
          Min Price:
          <input
            name="minPrice"
            type="text"
            value={filtering.minPrice}
            onChange={changeFiltering}
          />
        </label>
        <label>
          Max Price:
          <input
            name="maxPrice"
            type="text"
            value={filtering.maxPrice}
            onChange={changeFiltering}
          />
        </label>
        <label htmlFor="location-select">Choose a location:</label>
        <select
          name="location"
          id="location-select"
          value={filtering.location}
          onChange={changeFiltering}
        >
          <option value="">Location</option>
          <option value="Prague">Prague</option>
          <option value="New York">New York</option>
        </select>
        <input type="submit" value="Filter" />
      </form>

      {tours.map((tour) => (
        <Tour tour={tour} key={tour.id} deleteTour={deleteTour} editTour={editTour} />
      ))}
    </div>
  );
}

export default Tours;
