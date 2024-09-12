import {useContext} from 'react'
import Loader from 'react-loader-spinner'
import MovieItem from '../MovieItem'
import Navbar from '../Navbar'
import Pagination from '../Pagination'
import MovieContext from '../../context/MovieContext'
import './index.css'

const SearchPage = () => {
  const {searchResponse, apiStatus, onTriggerSearchingQuery} = useContext(
    MovieContext,
  )

  const renderEmptyView = () => (
    <div className="emptyViewContainer">
      <h1>No results found.</h1>
      <p>Dont worry, try searching again.</p>
    </div>
  )

  const renderMoviesList = () => {
    const {results} = searchResponse

    if (!results.length) {
      return renderEmptyView()
    }

    return (
      <ul className="movieListContainer">
        {results.map(movie => (
          <MovieItem key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div className="loaderContainer">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const renderSearchResultViews = () => {
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMoviesList()
      default:
        return renderEmptyView()
    }
  }

  return (
    <>
      <Navbar />
      <div className="routePageBody">{renderSearchResultViews()}</div>
      {searchResponse.totalPages && (
        <Pagination
          totalPages={searchResponse.totalPages}
          apiCallback={onTriggerSearchingQuery}
        />
      )}
    </>
  )
}

export default SearchPage
