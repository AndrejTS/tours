import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Tours from './components/Tours';

function App() {
  const [tours, setTours] = useState([]);
  const [filtering, setFiltering] = useState({
    minPrice: '',
    maxPrice: '',
    location: '',
  });

  const fetchData = async () => {
    // fetch('/tours', {
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

  useEffect(() => {
    fetchData();
  }, []);

  function changeFiltering(event) {
    const value = event.target.value;
    setFiltering({
      ...filtering,
      [event.target.name]: value,
    });
  }

  function filterTours() {
    console.log('Filtering...');
  }

  const deleteTour = (id) => {
    setTours(tours.filter((tour) => tour.id != id));
  };

  const editTour = (id, updatedTour) => {
    setTours(tours.map((tour) => (tour.id === id ? updatedTour : tour)));
  };

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <Header />
          {tours.length > 0 ? (
            <Tours
              tours={tours}
              filtering={filtering}
              changeFiltering={changeFiltering}
              filterTours={filterTours}
              deleteTour={deleteTour}
              editTour={editTour}
            />
          ) : (
            'No tours to show'
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
