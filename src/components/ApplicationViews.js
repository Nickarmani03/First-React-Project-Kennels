import React from "react"
import { Route } from "react-router-dom"
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"
import { LocationList } from "./locations/LocationList"
import { LocationProvider } from "./locations/LocationProvider"
import { EmployeeList } from "./employees/EmployeeList"
import { EmployeeProvider } from "./employees/EmployeeProvider"
import { CustomerList } from "./customers/CustomerList"
import { CustomerProvider } from "./customers/CustomerProvider"

//ApplicationViews: This is a Controller Component. Its only responsibility to to control the behavior of the system and maps URLs to components.

export const ApplicationViews = () => { // the ApplicationViews component, you will define how your application will respond when the URL matches each of those patterns. When a user clicks on one of the hyperlinks in the navigation bar, this code dictates which component should be rendered.
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <LocationProvider>
                <Route exact path="/"> {/* exact is needed on the first route, otherwise it will also match the other routes, and the Home will render for every route. */}
                    <LocationList />
                 </Route> {/*The <Link/> and the <Route/> JSX elements are complementary to each other. */}
            </LocationProvider>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <Route path="/animals">
                    <AnimalList />
                </Route>
            </AnimalProvider>

            <LocationProvider>
                <Route path="/locations">
                    <LocationList />
                </Route>
            </LocationProvider>

            <CustomerProvider>
                <Route path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>

            <EmployeeProvider>
                <Route path="/employees">
                    <EmployeeList />
                </Route>
            </EmployeeProvider>

        </>
    )
}