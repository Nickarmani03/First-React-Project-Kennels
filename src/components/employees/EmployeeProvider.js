import React, { useState, createContext } from "react"
 // useState  to hold and set the array of employees.

// The context is imported and used by individual components that need data
export const EmployeeContext = createContext()
//Context stores a certain kind of data to be used in your application
//createContext maintains state


// This component establishes what data can be used.
export const EmployeeProvider = (props) => { //transfers the data back and forth
    //the components that uses the data must be defined as children components, and React will send an object to each component.
    // probs is the arguemtn getting passed

    const [employees, setEmployees] = useState([])// defines a variable to hold state. useState gets invoked passed as an arguement. like saying useApplicationState
    // the hook to define a variable that holds the state of the component, and a function that updates it
    //use state deconstructs the array. the first item is the first item is the value of the array its nothing at this time it means let employees = []. the second item is a funtion
    //the first item holds the state and the second mutates the state. not permanent until we use a fetch request

/*   -Define the variable which will hold the data.
   let employees = []

    -Define the function to be used to modify that state.
  const setemployees = employeesData => {
    if (employeesData !== null && Array.isArray(employeesData)) {
        employees = employeesData
    }
}*/

const getEmployees = () => {
    return fetch("http://localhost:8088/employees?_expand=location")
      .then((res) => res.json())
      .then(setEmployees);
  }

    const addEmployee = (employeeObj) => {
        return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeObj),
        })
        .then(getEmployees)
    }

    const updateEmployee = employee => {
        return fetch(`http://localhost:8088/employees/${employee.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then(getEmployees) // rerenders with the newest API
    }

    const getEmployeeById = employId => {
        return fetch(`http://localhost:8088/employees/${employId}?_expand=location`)
        .then (res => res.json())
    }
    
    /*
        You return a context provider which has the
        `employees` state, `getemployees` function,
        and the `addemployee` function as keys. This
        allows any child elements to access them.
    */
    return (
        <EmployeeContext.Provider value={{ //what this provider exposes to the rest of the application
            employees, getEmployees, addEmployee, updateEmployee, getEmployeeById //the value is an object with these as keys it will allow each one to be invoked. will allow other modules to access them
        }}>
            {props.children} 
        </EmployeeContext.Provider>  // pros = properties of all child componets
    )
}  //With this, other components can access the array of objects being stored in the employees variable, and they can invoke the, getemployee and addemployee functions.