import {Component} from 'react'
import Header from '../Header'
import './index.css'

class RegisterForm extends Component {
  state = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  enterInput = event => {
    this.setState({userName: event.target.value})
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  enterFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  enterLastName = event => {
    this.setState({lastName: event.target.value})
  }

  getDetails = event => {
    event.preventDefault()
    const {history} = this.props
    const {userName, password, firstName, lastName} = this.state
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '[]')
    console.log(userDetails)
    const newUserDetails = {
      userName,
      password,
      firstName,
      lastName,
    }
    userDetails.push(newUserDetails)
    console.log(userDetails)
    localStorage.setItem('userDetails', JSON.stringify(userDetails))
    console.log(localStorage.getItem('userDetails'))
    this.setState({
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
    })
    history.push('/login')
  }

  render() {
    const {userName, password, firstName, lastName} = this.state
    return (
      <div>
        <Header />
        <div className="form-container">
          <form className="form" onSubmit={this.getDetails}>
            <h1 className="register-head">Registration Details</h1>
            <label htmlFor="user" onChange={this.enterInput} className="labels">
              USERNAME
            </label>
            <input
              id="user"
              value={userName}
              onChange={this.enterInput}
              placeholder="Username"
              className="inputs"
            />
            <label htmlFor="first" className="labels">
              FIRSTNAME
            </label>
            <input
              id="first"
              onChange={this.enterFirstName}
              placeholder="Firstname"
              value={firstName}
              className="inputs"
            />
            <label htmlFor="last" className="labels">
              LASTNAME
            </label>
            <input
              id="last"
              onChange={this.enterLastName}
              value={lastName}
              placeholder="Lastname"
              className="inputs"
            />
            <label htmlFor="password" className="labels">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={this.enterPassword}
              placeholder="Password"
              className="inputs"
            />
            <button type="submit" className="register-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default RegisterForm
