import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FiltersOnTypesOnEmployment from '../FiltersOnTypesOnEmployment'
import FiltersOnSalaryRange from '../FiltersOnSalaryRange'
import JobsItems from '../JobsItems'

const apiUrlContants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failuar: 'FAILUAR',
  noJobs: 'NOJOBS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const newObject = []
let searchInput = ''

class Jobs extends Component {
  state = {
    profileDetails: [],
    apiStateforProfileView: apiUrlContants.initial,
    apiStateforJobsView: apiUrlContants.initial,
    jobData: [],
    selectedList: [],
    salaryRange: '',
    search: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsData()
  }

  getSearchOutPut = () => {
    this.getJobsData()
  }

  onChangeSearchInput = event => {
    searchInput = event.target.value
    this.setState({search: event.target.value})
  }

  onChangeSalaryOption = salaryRange => {
    this.setState({salaryRange}, this.getJobsData)
  }

  getSelectedEmploymentTypesList = emp => {
    const {selectedList} = this.state
    console.log(selectedList.includes(emp))
    if (selectedList.includes(emp) === false) {
      newObject.push(emp)
      this.setState({selectedList: newObject}, this.getJobsData)
    } else {
      const filtered = selectedList.filter(each => each !== emp)
      this.setState({selectedList: filtered}, this.getJobsData)
    }
  }

  getJobsData = async () => {
    const {selectedList, salaryRange, search} = this.state
    const employmentType = selectedList.join()
    console.log(employmentType)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({apiStateforJobsView: apiUrlContants.inProgress})
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${search}`,
      options,
    )
    const data = await response.json()
    const {jobs} = data
    const jobsData = jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))

    if (jobsData.length === 0) {
      this.setState({apiStateforJobsView: apiUrlContants.noJobs})
    } else if (response.ok === true) {
      this.setState({
        jobData: jobsData,
        apiStateforJobsView: apiUrlContants.success,
      })
    } else {
      this.setState({apiStateforJobsView: apiUrlContants.failuar})
    }
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({apiStateforProfileView: apiUrlContants.inProgress})
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const profileDetailsData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: profileDetailsData,
        apiStateforProfileView: apiUrlContants.success,
      })
    } else {
      this.setState({apiStateforProfileView: apiUrlContants.failuar})
    }
  }

  renderLoading = () => (
    <div className="loadingContinaer">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div>
        <div className="profileContainer">
          <img src={profileImageUrl} className="profile" alt="profile" />
          <h1 className="name">{name}</h1>
          <p className="shortBio">{shortBio}</p>
        </div>
      </div>
    )
  }

  onclikcRetry = () => {
    this.setState({apiStateforProfileView: apiUrlContants.inProgress})
    this.getProfileDetails()
  }

  renderFailuarView = () => (
    <div className="loadingContinaer">
      <button type="button" onClick={this.onclikcRetry} className="retryButton">
        Retry
      </button>
    </div>
  )

  noJobsView = () => (
    <div className="nojobs-Continer">
      <img
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="noJobsImg"
      />
    </div>
  )

  renderTheoutPut = () => {
    const {apiStateforProfileView} = this.state
    switch (apiStateforProfileView) {
      case apiUrlContants.inProgress:
        return this.renderLoading()
      case apiUrlContants.success:
        return this.renderProfile()
      case apiUrlContants.failuar:
        return this.renderFailuarView()
      default:
        return null
    }
  }

  renderTheJobsoutPut = () => {
    const {apiStateforJobsView} = this.state
    switch (apiStateforJobsView) {
      case apiUrlContants.inProgress:
        return this.renderLoading()
      case apiUrlContants.success:
        return this.renderTheJobsItems()
      case apiUrlContants.noJobs:
        return this.noJobsView()
      default:
        return null
    }
  }

  renderTheJobsItems = () => {
    const {jobData} = this.state
    return (
      <ul className="jobsItemsContiner">
        {jobData.map(each => (
          <JobsItems key={each.id} each={each} />
        ))}
      </ul>
    )
  }

  render() {
    const {search} = this.state
    return (
      <div className="jobs-Container">
        <Header />
        <div className="filterAndJobsContiners">
          <div className="filtersAndProfileContiner">
            <div className="searchInputContiner1">
              <input
                type="search"
                placeholder="Search"
                className="searchInput1"
                value={search}
                onChange={this.onChangeSearchInput}
              />
              <button
                label="search"
                type="button"
                className="button1"
                data-testid="searchButton"
                onClick={this.getSearchOutPut}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderTheoutPut()}
            <hr className="sparator" />
            <h1 className="typesOfEmplyment">Types of Employment</h1>
            <ul className="employmentTypesList">
              {employmentTypesList.map(eachItem => (
                <FiltersOnTypesOnEmployment
                  eachItem={eachItem}
                  key={eachItem.employmentTypeId}
                  getSelectedEmploymentTypesList={
                    this.getSelectedEmploymentTypesList
                  }
                />
              ))}
            </ul>
            <hr className="sparator" />
            <h1 className="typesOfEmplyment">Types of Employment</h1>
            <ul className="employmentTypesList">
              {salaryRangesList.map(eachItem => (
                <FiltersOnSalaryRange
                  eachItem={eachItem}
                  key={eachItem.salaryRangeId}
                  onChangeSalaryOption={this.onChangeSalaryOption}
                />
              ))}
            </ul>
            <hr className="sparator" />
          </div>
          <div className="jobsDetailsContainers">
            <div className="searchInputContiner">
              <input
                type="search"
                placeholder="Search"
                className="searchInput"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                label="search"
                className="button"
                data-testid="searchButton"
                onClick={this.getSearchOutPut}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderTheJobsoutPut()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
