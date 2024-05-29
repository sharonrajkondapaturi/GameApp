import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', submitError: false}

  enterUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <div className="credintial-column">
        <label htmlFor="userName" className="credintial-color">
          USERNAME
        </label>
        <input
          id="userName"
          value={username}
          type="text"
          placeholder="Username"
          className="credintial-input"
          onChange={this.enterUsername}
        />
      </div>
    )
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="credintial-column">
        <label htmlFor="password" className="credintial-color">
          PASSWORD
        </label>
        <input
          id="password"
          value={password}
          type="password"
          placeholder="Password"
          className="credintial-input"
          onChange={this.enterPassword}
        />
      </div>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({submitError: true, errorMsg})
  }

  renderUserInformation = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, submitError} = this.state
    return (
      <div className="login-background">
        <form className="login-card" onSubmit={this.renderUserInformation}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="jobby-logo"
          />
          {this.renderUserName()}
          {this.renderPassword()}
          <button type="submit" className="login-btn">
            Login
          </button>
          {submitError ? <p className="error-msg">{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}
export default LoginForm
