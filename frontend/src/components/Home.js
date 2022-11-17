import Header from './Header';
import Tours from './Tours';

function Home({
  tours,
  filtering,
  changeFiltering,
  filterTours,
  deleteTour,
  editTour,
}) {
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

export default Home;
