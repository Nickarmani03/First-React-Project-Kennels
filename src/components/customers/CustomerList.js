import React, { useContext, useEffect } from "react"  // useContext hook allows you to use data structures and functions that a parent provider component exposes.
//useEffect hook allows the component to reach out into the world for anything that cannot be handled during render. In this case, it is the API call for the customers

import { CustomerContext } from "./CustomerProvider"
//  returns again. It has three key/value pairs on the object is exposes to its children.  
//customers whose value will be an array of customer objects
// getcustomer whose value is a function
// addcustomer whose value is a function

import "./Customers.css"

export const CustomerList = () => {
  // This state changes when `getcustomers()` is invoked below
  const { customers, getCustomers } = useContext(CustomerContext) //lets you pull in any context needed. deconstrust the objects
  //you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes to directly gain access to any of those keys above.


  //useEffect - reach out to the world for something
  // reacts when state changes. needs a function to use when state changes
  //always needs a function and an array
  useEffect(() => { // hook allows the component to reach out into the world for anything that cannot be handled during render. In this case, it is the API call for the customers.
    console.log("CustomerList: useEffect - getCustomers")
    getCustomers()
  }, []) //Logic within functions only occur when a function is invoked. Within a React component, useEffect is a function. After the return, useEffect is automatically invoked and since the dependency array is empty, it only runs the first time the component renders. gets the permanent state


  return ( //returns the JSX
    <section className="customers">
      {console.log("CustomerList: Render", customers)}
      {
        customers.map(customer => { //.map() array method to iterate the array of customers and generate HTML for each one.
          return (   //html version

            // interpolates below//
             <div className="customer" key={customer.id} id={`customer--${customer.id}`}> 
              <div className="customer__name">
                Name: { customer.name }
              </div>
              <div className="customer__address">
                address: { customer.address }
              </div>
            </div>
          )
        })
      }
    </section>
  )
}