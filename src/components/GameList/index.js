import {IoIosStar} from 'react-icons/io'
import './index.css'

const GameList = props => {
  const {games} = props
  const {game, rating, category, date, inr, stock, imageUrl, id} = games

  return (
    <li className="game">
      <img src={imageUrl} alt={game} className="game-image" />
      <h2 className="game-name">{game}</h2>
      <p className="game-elements">Release Date: {date}</p>
      <div className="game-container">
        <p>
          <IoIosStar className="star" />
          <span className="star">{rating}</span>
        </p>
        <p className="game-elements">Category: {category}</p>
      </div>
      <div className="game-container">
        <p className="game-elements">INR: {inr}</p>
        <p className="game-elements">Stock : {stock}</p>
      </div>
      <div className="contain-btn">
        <button className="game-button">Add to Cart</button>
      </div>
    </li>
  )
}

export default GameList
