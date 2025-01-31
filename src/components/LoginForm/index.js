import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {
    username: '',
    userpassword: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailuar = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, userpassword} = this.state
    const userDetails = {username, password: userpassword}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.jwt_token)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailuar(data.error_msg)
    }
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  userNameInput = () => {
    const {username} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <label className="label" htmlFor="userName">
          USERNAME
        </label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          id="userName"
          className="inputElement"
          onChange={this.onChangeName}
        />
      </>
    )
  }

  onChangePassword = event => {
    this.setState({userpassword: event.target.value})
  }

  userPasswordInput = () => {
    const {userpassword} = this.state
    return (
      <>
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          placeholder="Password"
          value={userpassword}
          id="password"
          className="inputElement"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="loginFormContainer">
        <form className="loginFormCard-Container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websiteLogo"
          />
          <div className="inputsContainer">{this.userNameInput()}</div>
          <div className="inputsContainer">{this.userPasswordInput()}</div>
          <button type="submit" className="loginButton">
            Login
          </button>
          {showSubmitError && <p className="error-mag">* {errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
