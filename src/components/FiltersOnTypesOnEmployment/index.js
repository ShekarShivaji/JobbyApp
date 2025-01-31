import './index.css'

const FiltersOnTypesOnEmployment = props => {
  const {eachItem, getSelectedEmploymentTypesList} = props
  const {label, employmentTypeId} = eachItem
  const handlerFunction = event => {
    getSelectedEmploymentTypesList(event.target.value)
  }

  return (
    <li className="jobTypes" onChange={handlerFunction}>
      <input
        id={employmentTypeId}
        className="checkbox"
        type="checkbox"
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId} className="label">
        {label}
      </label>
    </li>
  )
}

export default FiltersOnTypesOnEmployment
