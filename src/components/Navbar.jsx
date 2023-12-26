import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";


const Navbar = ({ onSearch, keyword }) => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    
    const inputSearchChangeHandler = (e) => {
      onSearch(e.target.value)
    }

    return (
      <nav>
        <div className="navbar fixed z-10 bg-secondary w-full shadow-md">
          <div className="navbar-start">
            <div className="dropdown text-white">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to="/" className="text-white">Home</Link>
                </li>
                <li>
                  <Link to="/archived" className="text-white">Archived Note</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <a className="btn btn-ghost text-xl text-white">Notes App</a>
          </div>
          <div className="navbar-end">
          {
            (location.pathname !== `/note/${id}` && location.pathname !== '/add' ) && (
                <div className="form-control">
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="input input-bordered w-24 md:w-auto"
                    onChange={inputSearchChangeHandler}
                    value={keyword}
                  />
                </div>
          )}
          </div>
        </div>
      </nav>
    );
}

export default Navbar

Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
};