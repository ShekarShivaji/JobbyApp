import './index.css'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJob = props => {
  const {each} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = each
  return (
    <li className="similarCardContiner">
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
      </div>
      <hr />
      <h1 className="DescriptionHead">Description</h1>
      <p className="text">{jobDescription}</p>
    </li>
  )
}

export default SimilarJob
