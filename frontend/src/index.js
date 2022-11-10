import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return <Tours />;
}

function Tours() {
  const [tours, setTours] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return setTours(data);
  };

  //
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="tours">
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
      <br/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
