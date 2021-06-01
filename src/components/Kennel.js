import React from "react"
import { Animal } from "./animal/Animal"
import { Customer } from "./customers/Customers"
import { Employee } from "./employees/Employees"
import { Location } from "./locations/Locations"
import "./Kennel.css"
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"
import { LocationList } from "./locations/LocationList"
import { LocationProvider } from "./locations/LocationProvider"
import { EmployeeList } from "./employees/EmployeeList"
import { EmployeeProvider } from "./employees/EmployeeProvider"
import { CustomerList } from "./customers/CustomerList"
import { CustomerProvider } from "./customers/CustomerProvider"

//<AnimalList> component is a child of the <AnimalProvider> component. It is crucial that you wrap components that need data with the provider component that exposes that data in JSX

export const Kennel = () => (
    <>  {/*empty brackets allow you to return more than one thing*/}
        <h2>Nashville Kennels</h2>
        <small>Loving care when you're not there.</small>

        <address>
            <div>Visit Us at the Nashville North Location</div>
            <div>500 Puppy Way</div>
        </address>

        <h2>Animals</h2>
        <AnimalProvider>
            <AnimalList />
        </AnimalProvider>
        {/* Note that the <AnimalList> component is a child of the <AnimalProvider> component. It is crucial that you wrap components that need data with the provider component that exposes that data in JSX. You can wrap a component in as many providers as needed. */}
        {/* <Provider>  <-- Parent: Creates the data context
    <Layout>  <-- Child: Can use the data in the context
      <SideNav />  <-- Grandchild: Can use the data in the context
      <Content />  <-- Grandchild: Can use the data in the context
      <Footer />   <-- Grandchild: Can use the data in the context
    </Layout>
</Provider> */}


        <h2>Employees</h2>
        <EmployeeProvider>
            <EmployeeList />
        </EmployeeProvider>

        <h2>Locations</h2>
        <LocationProvider>
            <LocationList />
        </LocationProvider>

        <h2>Customers</h2>
        <CustomerProvider>
            <CustomerList />
        </CustomerProvider>



    </>
)