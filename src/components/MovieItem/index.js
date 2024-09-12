import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movieCardContainer">
      <img className="movieCardImage" alt={title} src={posterPath} />
      <div className="movieDetails">
        <h1 className="movieTitle">{title}</h1>
        <p className="movieRating">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="viewDetailsLink">
        <button className="viewDetailsButton" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieItem
