import {Component} from 'react'
import Header from '../Header'
import GameList from '../GameList'
import './index.css'

const gameData = [
  {
    id: 1,
    game: 'God of War',
    imageUrl:
      'https://s3.amazonaws.com/gameopedia_covers/covers/487756/a1c58274bdad7ca6a4295b6504b17274.png',
    rating: 4.9,
    category: 'Action',
    date: '19-11-2018',
    inr: 2000,
    stock: 'available',
  },
  {
    id: 2,
    game: 'Uncharted a theif’s  End',
    imageUrl:
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTTI7W8yGFyguZY4bwRKpVJPj2G0fCni_NIZ5PIJnD_Qdt1RSScKtMAd2NEpwV8q1BMKYGaGg',
    rating: 4.5,
    category: 'Adventure',
    date: '19-10-2016',
    inr: 2000,
    stock: 'available',
  },
  {
    id: 3,
    game: 'God of War Ragnorok',
    imageUrl:
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQBpKExUXYCIoaXavPJIX66YU3rQJg3Nldi9dwvO6vSIMcCVOgaWS-v8L6mzyQtrUepelpwDQ',
    rating: 5.0,
    category: 'Action',
    date: '18-11-2022',
    inr: 2000,
    stock: 'available',
  },
  {
    id: 4,
    game: 'Sekiro Shadow Die Twice',
    imageUrl: 'https://i.ebayimg.com/images/g/qskAAOSwVSZmOddx/s-l1200.webp',
    rating: 4.7,
    category: 'Adventure',
    date: '06-11-2018',
    inr: 2000,
    stock: 'available',
  },
  {
    id: 5,
    game: 'God of War 3 Remastered',
    imageUrl:
      'https://m.media-amazon.com/images/I/91Ec4DX538L._AC_UF1000,1000_QL80_.jpg',
    rating: 4.8,
    category: 'Action',
    date: '19-06-2010',
    inr: 2000,
    stock: 'available',
  },
  {
    id: 6,
    game: 'Marvel SpiderMan',
    imageUrl:
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQFkS9_l5oPvE6wnL_-MuOXZp7G6NPajc1B-A5h6CMkt-KpgcNO-XJi5m5Bmep1ya6AWk45UA',
    rating: 5.0,
    category: 'Action',
    date: '11-11-2018',
    inr: 2000,
    stock: 'available',
  },
  {
    id: 7,
    game: 'Marvel SpiderMan 2',
    imageUrl:
      'https://cdn.marvel.com/content/1x/marvelsspiderman2_lob_crd_02.jpg',
    rating: 5.0,
    category: 'Action',
    date: '06-11-2023',
    inr: 2000,
    stock: 'available',
  },
  {
    id: 8,
    game: 'Marvel SpiderMan Miles Morales',
    imageUrl:
      'https://www.jiomart.com/images/product/original/491936188/marvel-s-spider-man-miles-morales-ps5-game-digital-o491936188-p590441677-0-202108122025.jpeg?im=Resize=(1000,1000)',
    rating: 4.9,
    category: 'Action',
    date: '10-10-2018',
    inr: 2000,
    stock: 'Out Of Stock',
  },
  {
    id: 9,
    game: 'Resident Evil Village',
    imageUrl:
      'https://m.media-amazon.com/images/I/71jB-sHH51L._AC_UF1000,1000_QL80_.jpg',
    rating: 4.2,
    category: 'Adventure',
    date: '07-06-2021',
    inr: 2000,
    stock: 'available',
  },
  {
    id: 10,
    game: 'Assassins Creed Valhalla',
    imageUrl: 'https://m.media-amazon.com/images/I/81citugjIUL.jpg',
    rating: 4.0,
    category: 'Adventure',
    date: '07-11-2021',
    inr: 2000,
    stock: 'available',
  },
]
class Home extends Component {
  state = {gameId: 'All'}

  presentId = event => {
    this.setState({gameId: event.target.value})
  }

  render() {
    const {gameId} = this.state
    return (
      <div className="game-main-container">
        <Header />
        <div className="tab">
          <button
            type="button"
            className={gameId === 'All' ? 'tabs' : 'no'}
            onClick={this.presentId}
            value="All"
          >
            All Games
          </button>
          <button
            type="button"
            className={gameId === 'Action' ? 'tabs' : 'no'}
            value="Action"
            onClick={this.presentId}
          >
            Action
          </button>
          <button
            type="button"
            className={gameId === 'Adventure' ? 'tabs' : 'no'}
            onClick={this.presentId}
            value="Adventure"
          >
            Adventure
          </button>
        </div>
        <ul className="game-wrap">
          {gameData.map(eachGame =>
            eachGame.category === gameId || gameId === 'All' ? (
              <GameList key={eachGame.id} games={eachGame} />
            ) : (
              ''
            ),
          )}
        </ul>
      </div>
    )
  }
}

export default Home
