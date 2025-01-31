import './index.css'
import {Component} from 'react'

import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="app-Container">
        <Header />
        <h1 className="mainHeading">
          Find The Job That <br /> Fits Your Life{' '}
        </h1>
        <p className="homeDesc">
          Millions of people are searching for jobs, salary information, company
          reviews. Finds the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="findJobButton">
            Find Jobs
          </button>
        </Link>
      </div>
    )
  }
}

export default Home
