import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdStar, MdLocationOn, MdWork} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiContentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class JobDescription extends Component {
  state = {
    apiStatus: apiContentStatus.initial,
    jobData: [],
    skills: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.renderDetails()
  }

  renderDetails = async () => {
    this.setState({apiStatus: apiContentStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobsDetailsApiurl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsDetailsApiurl, options)
    const data = await response.json()
    if (response.ok === true) {
      const newJobData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const newSkills = data.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))
      const newSimilarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobData: newJobData,
        skills: newSkills,
        similarJobs: newSimilarJobs,
        apiStatus: apiContentStatus.success,
      })
    } else {
      this.setState({apiStatus: apiContentStatus.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobDescription = () => {
    const {jobData, skills, similarJobs} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
      description,
      imageUrl,
    } = jobData
    return (
      <div className="initial-background">
        <div className="list-background">
          <div className="head-detail">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-image"
            />
            <div>
              <h1 className="list-head">{title}</h1>
              <div className="rate">
                <MdStar className="star" />
                <p className="rate-para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="three-details">
            <div className="two-details">
              <div className="two-details">
                <MdLocationOn />
                <p className="simple-para">{location}</p>
              </div>
              <div className="two-details">
                <MdWork />
                <p>{employmentType}</p>
              </div>
            </div>
            <p className="lpa">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="three-details">
            <h1 className="list-head">Description</h1>
            <a href={companyWebsiteUrl} className="visit">
              Visit <BiLinkExternal />
            </a>
          </div>
          <p className="desp">{jobDescription}</p>
          <h1 className="list-head">Skills</h1>
          <ul className="skills">
            {skills.map(skill => {
              return (
                <li className="skill-list" key={skill.id}>
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="skill-image"
                  />
                  <p>{skill.name}</p>
                </li>
              )
            })}
          </ul>
          <h1 className="list-head">Life at Company</h1>
          <div className="life">
            <p>{description}</p>
            <img src={imageUrl} alt="company" className="life-image" />
          </div>
        </div>
        <h1 className="similar-head">Similar Jobs</h1>
        <ul className="similar-unlist">
          {similarJobs.map(eachSimilar => (
            <SimilarJobs key={eachSimilar.id} similarData={eachSimilar} />
          ))}
        </ul>
      </div>
    )
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
        <button onClick={this.renderDetails} className="job-btn">
          Retry
        </button>
      </div>
    )
  }
  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiContentStatus.success:
        return this.jobDescription()
      case apiContentStatus.failure:
        return this.renderFailure()
      case apiContentStatus.loading:
        return this.renderLoading()
      default:
        null
    }
  }

  render() {
    return (
      <div className="job-background">
        <Header />
        <div className="desp-background">{this.renderView()}</div>
      </div>
    )
  }
}

export default JobDescription
