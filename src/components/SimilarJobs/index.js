import {MdStar, MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {similarData} = props
  const {
    companyLogoUrl,
    jobDescription,
    rating,
    title,
    location,
    employmentType,
  } = similarData
  return (
    <li className="list">
      <div className="head-detail">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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

      <div className="two-details">
        <MdLocationOn />
        <p className="simple-para">{location}</p>
        <MdWork />
        <p>{employmentType}</p>
      </div>
      <div>
        <h1 className="list-head1">Description</h1>
        <p className="desp">{jobDescription}</p>
      </div>
    </li>
  )
}
export default SimilarJobs
