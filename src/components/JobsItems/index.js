import './index.css'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobsItems = props => {
  const {each} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = each

  return (
    <Link className="linkStyle" to={`/jobs/${id}`}>
      <li className="items">
        <div className="nameAndImgContainer">
          <img
            className="job-details-company-logo"
            src={companyLogoUrl}
            alt="company logo"
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
        <hr className="saprator" />
        <h1 className="DescriptionHead">Description</h1>
        <p className="text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsItems
