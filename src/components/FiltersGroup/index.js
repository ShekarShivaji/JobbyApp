import './index.css'

const FiltersGroup = props => {
  const {employmentTypesList, locationList, salaryRangesList} = props

  const handlerFunction = event => {
    const {getSelectedEmploymentTypesList} = props
    getSelectedEmploymentTypesList(event.target.value)
  }

  const handlerLocationFunction = event => {
    const {onChangeLocation} = props
    onChangeLocation(event.target.value)
  }

  return (
    <>
      <hr className="sparator" />
      <h1 className="typesOfEmplyment">Types of Employment</h1>
      <ul className="employmentTypesList">
        {employmentTypesList.map(eachItem => (
          <li className="jobTypes" key={eachItem.id}>
            <input
              id={eachItem.id}
              className="checkbox"
              type="checkbox"
              value={eachItem.id}
              onChange={handlerFunction}
            />
            <label htmlFor={eachItem.id} className="label">
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="sparator" />
      <h1 className="typesOfEmplyment">Salary Range</h1>
      <ul className="employmentTypesList">
        {salaryRangesList.map(eachItem => {
          const pnChangeOption = () => {
            const {onChangeSalaryOption} = props
            onChangeSalaryOption(eachItem.salaryRangeId)
          }
          return (
            <li className="jobTypes" onClick={pnChangeOption} key={eachItem.id}>
              <input
                id={eachItem.salaryRangeId}
                className="radio"
                name="SalaryRange"
                type="radio"
                value={eachItem.label}
              />
              <label htmlFor={eachItem.salaryRangeId} className="label">
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
      <hr className="sparator" />
      <hr className="sparator" />
      <h1 className="typesOfEmplyment">Locations</h1>
      <ul className="employmentTypesList">
        {locationList.map(eachItem => (
          <li className="jobTypes" key={eachItem.id}>
            <input
              id={eachItem.id}
              className="checkbox"
              type="checkbox"
              value={eachItem.id}
              onChange={handlerLocationFunction}
            />
            <label htmlFor={eachItem.id} className="label">
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}

export default FiltersGroup
