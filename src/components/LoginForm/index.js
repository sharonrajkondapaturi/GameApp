import {Component} from 'react'
import Header from '../Header'
import './index.css'

class LoginForm extends Component {
  state = {userName: '', password: '', passed: true}

  enterInput = event => {
    this.setState({userName: event.target.value})
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  gameDetails = event => {
    event.preventDefault()
    const loggedInDetails = localStorage.getItem('userDetails')
    const userDetails = JSON.parse(loggedInDetails)
    const {history} = this.props
    const {userName, password} = this.state
    userDetails.filter(eachDetail =>
      eachDetail.userName === userName && eachDetail.password === password
        ? history.push('/')
        : this.setState({passed: false}),
    )
  }

  render() {
    const {passed, userName, password} = this.state
    return (
      <>
        <Header />
        <div className="login-container">
          <form className="login-form" onSubmit={this.gameDetails}>
            <h1 className="login-head">Login</h1>
            <label htmlFor="userName" className="labels">
              USERNAME
            </label>
            <input
              id="userName"
              className="inputs"
              placeholder="Username"
              value={userName}
              onChange={this.enterInput}
            />
            <label htmlFor="password" className="labels">
              PASSWORD
            </label>
            <input
              id="password"
              className="inputs"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.enterPassword}
            />
            <button type="submit" className="game-btn">
              Submit
            </button>
            {passed ? null : (
              <p className="error"> Username or Password are wrong</p>
            )}
          </form>
        </div>
      </>
    )
  }
}

export default LoginForm
