import {Link} from 'react-router-dom'
import {MdStar, MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="list-background">
        <div className="head-detail">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="list-head">Description</h1>
        <p className="desp">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItem
