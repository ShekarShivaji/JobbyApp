import './index.css'

const FiltersOnSalaryRange = props => {
  const {eachItem, onChangeSalaryOption} = props
  const {label, salaryRangeId} = eachItem
  const pnChangeOption = () => {
    onChangeSalaryOption(salaryRangeId)
  }
  return (
    <li className="jobTypes">
      <input
        id={salaryRangeId}
        className="radio"
        name="SalaryRange"
        type="radio"
        value={label}
        onChange={pnChangeOption}
      />
      <label htmlFor={salaryRangeId} className="label">
        {label}
      </label>
    </li>
  )
}

export default FiltersOnSalaryRange
