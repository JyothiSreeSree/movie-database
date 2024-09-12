import React from 'react'
import Loader from 'react-loader-spinner'
import MovieItem from '../MovieItem'
import Navbar from '../Navbar'
import Pagination from '../Pagination'
import './index.css'

class UpcomingPage extends React.Component {
  state = {
    isLoading: true,
    upcomingMovieResponse: {},
  }

  componentDidMount() {
    this.getUpcomingMoviesResponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getUpcomingMoviesResponse = async (page = 1) => {
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, upcomingMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loaderContainer">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderUpcomingMoviesList = () => {
    const {upcomingMovieResponse} = this.state
    const {results} = upcomingMovieResponse

    return (
      <ul className="movieListContainer">
        {results.map(movie => (
          <MovieItem key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, upcomingMovieResponse} = this.state

    return (
      <>
        <Navbar />
        <div className="routePageBody">
          {isLoading
            ? this.renderLoadingView()
            : this.renderUpcomingMoviesList()}
        </div>
        <Pagination
          totalPages={upcomingMovieResponse.totalPages}
          apiCallback={this.getUpcomingMoviesResponse}
        />
      </>
    )
  }
}

export default UpcomingPage
