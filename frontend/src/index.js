import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return <Tours />;
}

function Tours() {
  const [tours, setTours] = useState([]);
  const [filtering, setFiltering] = useState({
    minPrice: '',
    maxPrice: '',
  });

  const fetchData = async () => {
    // fetch("/tours", {
    //   method: 'GET',
    //   body: JSON.stringify(filtering),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })

    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return setTours(data);
  };

  React.useEffect(() => {
    fetchData();
  });

  function changeFiltering(event) {
    const value = event.target.value;
    setFiltering({
      ...filtering,
      [event.target.name]: value,
    });
  }

  return (
    <div class="tours">
      <form onSubmit={''}>
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
        <input type="submit" value="Filter" />
      </form>

      <h1>Tours</h1>
      {tours.map((tour) => (
        <Tour obj={tour} />
      ))}
    </div>
  );
}

function Tour({ obj }) {
  return (
    <div class="tour">
      <p>{obj.name}</p>
      <p>{obj.address.city}</p>
      <br />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
