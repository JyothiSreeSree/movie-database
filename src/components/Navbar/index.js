import {Link, withRouter} from 'react-router-dom'
import MovieContext from '../../context/MovieContext'
import './index.css'

const Navbar = props => {
  const {history} = props
  const renderSearchBar = () => (
    <MovieContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
        } = value

        const onChangeHandler = event => {
          onChangeSearchInput(event.target.value)
        }

        const onSearchHandler = event => {
          event.preventDefault()
          onTriggerSearchingQuery()
          history.push('/search')
        }

        return (
          <div className="searchBarContainer">
            <input
              type="text"
              className="searchInput"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="searchButton"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </MovieContext.Consumer>
  )

  return (
    <nav className="navBarContainer">
      <div className="logoContainer">
        <h1 className="pageLogo">movieDB</h1>
      </div>
      <ul className="navItemsList">
        <li className="navItem">
          <Link className="navLink" to="/">
            Home
          </Link>
        </li>
        <li className="navItem">
          <Link className="navLink" to="/top-rated">
            TopRatedPage
          </Link>
        </li>
        <li className="navItem">
          <Link className="navLink" to="/upcoming">
            UpcomingPage
          </Link>
        </li>
      </ul>
      {renderSearchBar()}
    </nav>
  )
}

export default withRouter(Navbar)
