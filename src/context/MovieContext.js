import {createContext, Component} from 'react'

const MovieContext = createContext()

class MovieProvider extends Component {
  state = {
    popularMovieResponse: {},
    topRatedMovieResponse: {},
    searchResponse: {
      results: [],
      totalPages: 0,
    },
    apiStatus: 'INITIAL',
    searchInput: '',
  }

  getPopularMoviesResponse = async (page = 1) => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    try {
      const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
      const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      const updatedData = this.getUpdatedData(data)
      this.setState({
        popularMovieResponse: updatedData,
        apiStatus: 'SUCCESS',
      })
    } catch (error) {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  getTopRatedMoviesResponse = async (page = 1) => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    try {
      const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
      const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      const updatedData = this.getUpdatedData(data)
      this.setState({
        topRatedMovieResponse: updatedData,
        apiStatus: 'SUCCESS',
      })
    } catch (error) {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  onTriggerSearchingQuery = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: 'IN_PROGRESS'})
    try {
      const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      this.setState({
        searchResponse: {
          results: data.results.map(movie => ({
            id: movie.id,
            posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            voteAverage: movie.vote_average,
            title: movie.title,
          })),
          totalPages: data.total_pages,
        },
        apiStatus: 'SUCCESS',
      })
    } catch (error) {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  onChangeSearchInput = value => {
    this.setState({searchInput: value})
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

  render() {
    const {
      popularMovieResponse,
      topRatedMovieResponse,
      searchResponse,
      apiStatus,
      searchInput,
    } = this.state
    const {children} = this.props
    return (
      <MovieContext.Provider
        value={{
          popularMovieResponse,
          topRatedMovieResponse,
          searchResponse,
          apiStatus,
          searchInput,
          onTriggerSearchingQuery: this.onTriggerSearchingQuery,
          onChangeSearchInput: this.onChangeSearchInput,
          getPopularMoviesResponse: this.getPopularMoviesResponse,
          getTopRatedMoviesResponse: this.getTopRatedMoviesResponse,
        }}
      >
        {children}
      </MovieContext.Provider>
    )
  }
}

export default MovieProvider
