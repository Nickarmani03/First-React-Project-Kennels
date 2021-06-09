import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employees.css"
import { useParams, useHistory } from "react-router-dom"

// HTML that renders once an employee is selected

export const EmployeeDetail = () => {
    const { employees } = useContext(EmployeeContext)
    const [employee, setEmployee] = useState({ location: {} })

    /*
        Given the example URL above, this will store the value
        of 5 in the employeeId variable
    */
    const { employeeId } = useParams(); // use when there's a dynamic route.


    useEffect(() => {
        const thisEmployee = employees.find(
          (e) => e.id === parseInt(employeeId)
        ) || { location: {} };
        setEmployee(thisEmployee);
      }, [employeeId]);

    const history = useHistory()

    return (
        <section className="employee" key={employee.id}>
            <h3 className="employee__name"> {employee.name} </h3>
            <div className="employee__location"> Location: {employee.location.name} </div>
            <button onClick={() => {
                history.push(`/employees/edit/${employee.id}`)
            }}>Edit</button>
        </section>
    )
}