import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import TopRatedPage from './components/TopRatedPage'
import UpcomingPage from './components/UpcomingPage'
import SearchPage from './components/SearchPage'
import MovieContext from './context/MovieContext'
import './App.css'

const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'

const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onTriggerSearchingQuery = async () => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1`
    const response = await fetch(apiUrl)
    const data = await response.json()
    setSearchResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }

  return (
    <MovieContext.Provider
      value={{
        searchResponse,
        apiStatus,
        onTriggerSearchingQuery,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <div className="appContainer">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={TopRatedPage} />
          <Route exact path="/upcoming" component={UpcomingPage} />
          <Route exact path="/search" component={SearchPage} />
        </Switch>
      </div>
    </MovieContext.Provider>
  )
}

export default App
