import { Link } from 'react-router-dom';


function Header() {
  return (
    <header>
      <h1>Tours</h1>
      <Link to='/import'><button>Import</button></Link>
    </header>
  );
}

export default Header;
