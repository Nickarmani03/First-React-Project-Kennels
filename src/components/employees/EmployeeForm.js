import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../locations/LocationProvider"
import { EmployeeContext } from "../employees/EmployeeProvider"
import "./Employees.css"
import { useHistory, useParams } from 'react-router-dom';

export const EmployeeForm = () => {
  const { addEmployee, updateEmployee, getEmployeeById } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

  const [employee, setEmployee] = useState({})
  const [isLoading, setIsLoading] = useState(true)


  const { employeeId } = useParams()// can capture the variable name. 
  // used when there's a dynamic route.

  const history = useHistory()


  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component

  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newEmployee = { ...employee }
    /* Employee is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newEmployee[event.target.id] = event.target.value
    // update state
    setEmployee(newEmployee)
  }

  const handleSaveEmployee = () => {
    if (parseInt(employee.locationId) === 0) {
      window.alert("Please select a location")
    } else {
      setIsLoading(true)
      if (employeeId) {
        updateEmployee({
          id: employee.id,
          name: employee.name,
          locationId: parseInt(employee.locationId)
        })
          .then(() => history.push(`/employees/detail/${employee.id}`))
      } else {
        addEmployee({
          name: employee.name,
          locationId: parseInt(employee.locationId)
        })
          .then(() => history.push("/employees"))  //takes you to the page in quotes. refreshes the page and pushes the user page to the brower. appends it to the address bar

      }
    }
  }

  /*
   Reach out to the world and get employees state
   and locations state on initialization.
   */
  useEffect(() => {
    getLocations().then(() => {
      if (employeeId) {
        getEmployeeById(employeeId)
          .then(employee => {
            setEmployee(employee)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Employee name:  </label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Employee name" value={employee.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      {/* <fieldset>
        <div className="form-group">
          <label htmlFor="name">Employee location: </label>
          <input type="text" id="location" required autoFocus className="form-control" placeholder="Employee location" value={employee.location.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset> */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Employee assigned location:  </label>
          <select name="locationId" id="locationId" className="form-control" value={employee.locationId} onChange={handleControlledInputChange}>
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      {/* <fieldset>
        <div className="form-group">
          <label htmlFor="employeeId">employee they are currently assisting: </label>
          <select name="employee" id="employeeId" className="form-control" value={employee.employeeId} onChange={handleControlledInputChange}>
            <option value="0">Select a employee</option>
            {employees.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset> */}
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault()
          handleSaveEmployee()
        }}>
        Save Employee
          </button>
    </form>
  )
}