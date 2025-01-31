import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {GrShare} from 'react-icons/gr'
import SimilarJob from '../SimilarJob'
import Header from '../Header'

const apiUrlContants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failuar: 'FAILUAR',
  nojobDetails: 'NOJOBDETAILS',
}

class JobItemsDetailsRoute extends Component {
  state = {
    updatedjobdetails: [],
    updatedSimilarjobs: [],
    updatedskills: [],
    lifeAtCompany: [],
    apiState: apiUrlContants.initial,
  }

  componentDidMount = () => {
    this.getEachJobItemDetails()
  }

  getEachJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({apiState: apiUrlContants.inProgress})
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    console.log(data)
    const {skills} = data.job_details
    const similarJobs = data.similar_jobs
    const updatedSkills = skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    }))

    const updatedSimilarJobs = similarJobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))
    const jobDetails = data.job_details
    const updatedJobDetails = {
      title: jobDetails.title,
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
    }

    const lifeatcompany = data.job_details.life_at_company
    const updateLifeAtCompany = {
      description: lifeatcompany.description,
      imageUrl: lifeatcompany.image_url,
    }

    this.setState({
      updatedjobdetails: updatedJobDetails,
      updatedSimilarjobs: updatedSimilarJobs,
      updatedskills: updatedSkills,
      lifeAtCompany: updateLifeAtCompany,
    })

    if (data.length === 0) {
      this.setState({apiState: apiUrlContants.nojobDetails})
    } else if (response.ok === true) {
      this.setState({
        apiState: apiUrlContants.success,
      })
    } else {
      this.setState({apiState: apiUrlContants.failuar})
    }
  }

  renderJobDetails = () => {
    const {
      updatedjobdetails,
      updatedSimilarjobs,
      updatedskills,
      lifeAtCompany,
    } = this.state

    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = updatedjobdetails

    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <div className="cardContiner">
          <div className="nameAndImgContainer">
            <img
              className="job-details-company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="nameAndRatingContiner">
              <h1 className="title">{title}</h1>
              <div className="ratingContiner">
                <FaStar className="fastar" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobDetailsContiner">
            <div className="locationAndjobDetailsContiner">
              <MdLocationOn className="icon1" size="25" />
              <p className="text">{location}</p>
              <BsBriefcaseFill className="icon2" size="20" />
              <p className="text">{employmentType}</p>
            </div>
            <p className="title">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="headingContiner">
            <h1 className="DescriptionHead">Description</h1>
            <a className="hrefAtribute" href={companyWebsiteUrl}>
              <p>Visit</p>
              <GrShare />
            </a>
          </div>

          <p className="text">{jobDescription}</p>
          <div>
            <h1 className="skillShead">Skills</h1>
            <ul className="skillsContiner">
              {updatedskills.map(each => (
                <li className="eachSkill">
                  <img
                    src={each.imageUrl}
                    className="skillImg"
                    alt={each.name}
                  />
                  <p className="skillName">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="skillShead">Life at Company</h1>
          <div className="lifeatCompanyContiner">
            <p className="liefAttext">{description}</p>
            <img
              src={imageUrl}
              className="lifeatCompanyimg"
              alt="life at company"
            />
          </div>
        </div>
        <ul className="similarCardComponent">
          {updatedSimilarjobs.map(each => (
            <SimilarJob each={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loadingContinaer">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  onclikcRetryButton = () => {
    this.setState({apiState: apiUrlContants.inProgress})
    this.getEachJobItemDetails()
  }

  renderFailuar = () => (
    <div className="failuarViewContiner">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failuarHead">Oops! Something Went Wrong</h1>
      <p className="failuarDesc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        onClick={this.onclikcRetryButton}
        className="retryButton"
      >
        Retry
      </button>
    </div>
  )

  renderTheoutPut = () => {
    const {apiState} = this.state
    switch (apiState) {
      case apiUrlContants.inProgress:
        return this.renderLoadingView()
      case apiUrlContants.success:
        return this.renderJobDetails()
      case apiUrlContants.failuar:
        return this.renderFailuar()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobDetailsContinaer">
        <Header />
        {this.renderTheoutPut()}
      </div>
    )
  }
}

export default JobItemsDetailsRoute
