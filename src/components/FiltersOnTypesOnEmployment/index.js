import './index.css'

const FiltersOnTypesOnEmployment = props => {
  const {eachItem, getSelectedEmploymentTypesList} = props
  const {label, id} = eachItem
  const handlerFunction = event => {
    getSelectedEmploymentTypesList(event.target.value)
  }

  return (
    <li className="jobTypes" onChange={handlerFunction}>
      <input id={id} className="checkbox" type="checkbox" value={id} />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </li>
  )
}

export default FiltersOnTypesOnEmployment
