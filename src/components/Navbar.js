import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUserId } from '../lib/auth';
import SearchByName from './SearchByName';

const Navbar = () => {
  const [whatUserTypes, setWhatUserTypes] = React.useState('');
  const [searchField, setSearchField] = React.useState('title');

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  function handleChange(event) {
    setWhatUserTypes(event.target.value);
  }

  function handleClick(event) {
    const searchByValue = event.target.innerText.toLowerCase();
    setSearchField(searchByValue);
    setWhatUserTypes('');
  }

  function handleIsActive(event) {
    event.target.parentElement.parentElement.parentElement.parentElement.classList.toggle(
      'is-active'
    );
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.toggle(
      'is-active'
    );
    event.target.parentElement.parentElement.parentElement.classList.toggle(
      'is-active'
    );
    event.target.parentElement.parentElement.classList.toggle('is-active');
  }

  function capitalizeFirstLetter(searchField) {
    return searchField.charAt(0).toUpperCase() + searchField.slice(1);
  }

  return (
    <>
      <nav>
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>
            Home
          </Link>
          <Link to='/podcasts' className='navbar-item'>
            Podcasts
          </Link>
          <Link to='/login' className='navbar-item'>
            Login
          </Link>
          <Link to='/register' className='navbar-item'>
            Register
          </Link>
          {getLoggedInUserId() && (
            <Link to='/' className='navbar-item' onClick={logout}>
              Logout
            </Link>
          )}
          {getLoggedInUserId() && (
            <Link to='/createpodcast' className='navbar-item'>
              Create New Podcast
            </Link>
          )}
          {getLoggedInUserId() && (
            <Link
              to={`/mypodcasts/${getLoggedInUserId()}`}
              className='navbar-item'
            >
              My Podcasts
            </Link>
          )}

          <div className='navbar-end is-hidden-touch'>
            <div className='dropdown' onClick={handleIsActive}>
              <div className='dropdown-trigger'>
                <button
                  className='button'
                  aria-haspopup='true'
                  aria-controls='dropdown-menu3'
                >
                  <span>Search by {capitalizeFirstLetter(searchField)}</span>
                </button>
              </div>
              <div className='dropdown-menu' id='dropdown-menu3' role='menu'>
                <div
                  className='dropdown-content'
                  name='selectList'
                  id='selectList'
                  onClick={handleClick}
                >
                  <a value='title' className='dropdown-item'>
                    Title
                  </a>
                  <a value='description' className='dropdown-item'>
                    Description
                  </a>
                  <a value='host' className='dropdown-item'>
                    Host
                  </a>
                  <a value='guests' className='dropdown-item'>
                    Guests
                  </a>
                  <a value='genre' className='dropdown-item'>
                    Genre
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='field'>
            <input
              className='input is-normal is-warning'
              placeholder='Search'
              name='search'
              onChange={handleChange}
              value={whatUserTypes}
            ></input>
          </div>
        </div>
        {!whatUserTypes ? (
          <></>
        ) : (
          <section className='hero is-fullheight-with-navbar mt-6'>
            <div className='hero-body'>
              <div className='container'>
                <div className='columns is-multiline'>
                  <SearchByName
                    key={whatUserTypes}
                    userSearches={whatUserTypes}
                    searchByField={searchField}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </nav>
    </>
  );
};

export default Navbar;
