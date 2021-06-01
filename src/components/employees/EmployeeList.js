import React, { useContext, useEffect } from "react"  // useContext hook allows you to use data structures and functions that a parent provider component exposes.
//useEffect hook allows the component to reach out into the world for anything that cannot be handled during render. In this case, it is the API call for the employees

import { EmployeeContext } from "./EmployeeProvider"
//  returns again. It has three key/value pairs on the object is exposes to its children.  
//employees whose value will be an array of employee objects
// getemployee whose value is a function
// addemployee whose value is a function

import "./Employees.css"

export const EmployeeList = () => {
  // This state changes when `getemployees()` is invoked below
  const { employees, getEmployees } = useContext(EmployeeContext) //lets you pull in any context needed. deconstrust the objects
  //you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes to directly gain access to any of those keys above.


  //useEffect - reach out to the world for something
  // reacts when state changes. needs a function to use when state changes
  //always needs a function and an array
  useEffect(() => { // hook allows the component to reach out into the world for anything that cannot be handled during render. In this case, it is the API call for the employees.
    console.log("EmployeeList: useEffect - getEmployees")
    getEmployees()
  }, []) //Logic within functions only occur when a function is invoked. Within a React component, useEffect is a function. After the return, useEffect is automatically invoked and since the dependency array is empty, it only runs the first time the component renders. gets the permanent state


  return ( //returns the JSX
    <section className="employees">
      {console.log("EmployeeList: Render", employees)}
      {
        employees.map(employee => { //.map() array method to iterate the array of employees and generate HTML for each one.
        
          return (   //html version

            // interpolates below//
             <div className="employee" key={employee.id} id={`employee--${employee.id}`}> 
              <div className="employee__name">
                Name: { employee.name }
              </div>
              <div className="employee__location">
                location: { employee.location.name }
              </div>
            </div>
          )
        })
      }
    </section>
  )
}