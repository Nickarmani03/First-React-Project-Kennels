import React, { useState, createContext } from "react" // useState  to hold and set the array of customers.

// The context is imported and used by individual components that need data
export const CustomerContext = createContext()
//Context stores a certain kind of data to be used in your application
//createContext maintains state


// This component establishes what data can be used.
export const CustomerProvider = (props) => { //transfers the data back and forth
    //the components that uses the data must be defined as children components, and React will send an object to each component.
    // probs is the arguemtn getting passed

    const [customers, setCustomers] = useState([])// defines a variable to hold state. useState gets invoked passed as an arguement. like saying useApplicationState
    // the hook to define a variable that holds the state of the component, and a function that updates it
    //use state deconstructs the array. the first item is the first item is the value of the array its nothing at this time it means let customers = []. the second item is a funtion
    //the first item holds the state and the second mutates the state

/*   -Define the variable which will hold the data.
   let customers = []

    -Define the function to be used to modify that state.
  const setcustomers = customersData => {
    if (customersData !== null && Array.isArray(customersData)) {
        customers = customersData
    }
}*/

    const getCustomers = () => {
        return fetch("http://localhost:8088/customers")
        .then(res => res.json())
        .then(setCustomers) //changes the variable. updates the state
    }

    const addCustomer = customerObj => {
        return fetch("http://localhost:8088/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
        .then(getCustomers)
    }

    /*
        You return a context provider which has the
        `customers` state, `getcustomers` function,
        and the `addcustomer` function as keys. This
        allows any child elements to access them.
    */
    return (
        <CustomerContext.Provider value={{ //what this provider exposes to the rest of the application
            customers, getCustomers, addCustomer //the value is an object with these as keys it will allow each one to be invoked. will allow other modules to access them
        }}>
            {props.children} 
        </CustomerContext.Provider>  // pros = properties of all child componets
    )
}  //With this, other components can access the array of objects being stored in the customers variable, and they can invoke the, getcustomer and addcustomer functions.