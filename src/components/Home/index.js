import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const findJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div>
      <Header />
      <div className="background-image">
        <h1 className="job-image">Find The Job That Fits Your Life</h1>
        <p className="job-detail">
          Millions of people are searching for jobs, salary,information,ompany
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="job-btn" onClick={findJobs}>
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
