import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

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

const apiContentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}
const profileContentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}
class Jobs extends Component {
  state = {
    apiStatus: apiContentStatus.initial,
    profileStatus: profileContentStatus.initial,
    profileData: [],
    employmentType: [],
    salaryRange: '',
    search: '',
  }

  componentDidMount() {
    this.profileView()
    this.renderDetails()
  }

  renderDetails = async () => {
    const {employmentType, salaryRange, search} = this.state
    this.setState({apiStatus: apiContentStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    const data = await response.json()
    const newJobData = data.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    if (response.ok === true) {
      this.setState({
        jobData: newJobData,
        apiStatus: apiContentStatus.success,
      })
    } else {
      this.setState({apiStatus: apiContentStatus.failure})
    }
  }

  profileView = async () => {
    this.setState({profileStatus: profileContentStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const newProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: newProfileData,
        profileStatus: profileContentStatus.success,
      })
    } else {
      this.setState({profileStatus: profileContentStatus.failure})
    }
  }

  renderProfile = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-background">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profile-header">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderEmployement = event => {
    const {employmentType} = this.state
    const checkList = employmentType.filter(
      eachEmployee => eachEmployee === event.target.id,
    )
    if (checkList.length === 0) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.id],
        }),
        this.renderDetails,
      )
    } else {
      const checkAgainList = employmentType.filter(
        eachEmployee => eachEmployee !== event.target.id,
      )
      this.setState({employmentType: checkAgainList}, this.renderDetails)
    }
  }

  typesOfEmployment = () => (
    <ul>
      {employmentTypesList.map(eachEmployee => {
        return (
          <li className="salary-gap" key={eachEmployee.employmentTypeId}>
            <input
              type="checkbox"
              id={eachEmployee.employmentTypeId}
              onChange={this.renderEmployement}
            />
            <label htmlFor={eachEmployee.employmentTypeId} className="cursor">
              {eachEmployee.label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  renderSalary = event => {
    this.setState({salaryRange: event.target.value}, this.renderDetails)
  }

  salaryRange = () => (
    <ul>
      {salaryRangesList.map(eachSalary => {
        return (
          <li className="salary-gap" key={eachSalary.salaryRangeId}>
            <input
              type="radio"
              name="option"
              id={eachSalary.salaryRangeId}
              onChange={this.renderSalary}
              value={eachSalary.salaryRangeId}
            />
            <label htmlFor={eachSalary.salaryRangeId} className="cursor">
              {eachSalary.label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  renderSearch = event => {
    this.setState({search: event.target.value})
  }

  renderClick = () => {
    this.setState(this.renderDetails)
  }

  renderEnter = event => {
    if (event.key === 'Enter') {
      this.setState({search: event.target.value}, this.renderDetails)
    }
  }

  onRetry = () => {
    this.renderDetails()
  }

  renderFailure = () => {
    return (
      <div className="failure">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="no-image"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button onClick={this.onRetry} className="job-btn">
          retry
        </button>
      </div>
    )
  }

  jobDetails = () => {
    const {jobData} = this.state
    const noJobs = jobData.length === 0
    return noJobs ? (
      <div className="failure">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-image"
        />
        <h1>No jobs found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    ) : (
      <ul>
        {jobData.map(eachDetail => (
          <JobItem key={eachDetail.id} job={eachDetail} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiContentStatus.success:
        return this.jobDetails()
      case apiContentStatus.failure:
        return this.renderFailure()
      case apiContentStatus.loading:
        return this.renderLoading()
      default:
        null
    }
  }

  onRetryProfile = () => {
    this.profileView()
  }

  renderProfileFailure = () => {
    return (
      <div>
        <button type="button" onClick={this.onRetryProfile} className="job-btn">
          Retry
        </button>
      </div>
    )
  }

  isRendering = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case profileContentStatus.success:
        return this.renderProfile()
      case profileContentStatus.failure:
        return this.renderProfileFailure()
      case profileContentStatus.loading:
        return this.renderLoading()
      default:
        null
    }
  }

  render() {
    const {search} = this.state
    return (
      <div className="job-background">
        <Header />
        <div className="split">
          <div className="option-content">
            {this.isRendering()}
            <hr />
            <h1 className="employement-header">Types of Employment</h1>
            <ul className="list-employement">{this.typesOfEmployment()}</ul>
            <hr />
            <h1 className="employement-header">Salary Range</h1>
            <ul className="list-employement">{this.salaryRange()}</ul>
          </div>
          <div>
            <div className="job-bar">
              <input
                className="job-search"
                type="search"
                value={search}
                onChange={this.renderSearch}
                onKeyDown={this.renderEnter}
              />
              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
                onClick={this.renderClick}
              >
                <BsSearch value={search} />
              </button>
            </div>
            {this.renderJobDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
