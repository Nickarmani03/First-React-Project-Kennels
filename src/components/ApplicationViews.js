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
import { AnimalForm } from "./animal/AnimalForm"
import { EmployeeForm } from "./employees/EmployeeForm"
import { LocationForm } from "./locations/LocationForm"

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
                <Route exact path="/animals">
                    <AnimalList />
                </Route>
                <LocationProvider>
                    <CustomerProvider>
                        <EmployeeProvider>
                            <Route exact path="/animals/create">
                                <AnimalForm />
                            </Route>
                        </EmployeeProvider>
                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>

            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>
                <Route exact path="/locations/create">
                    <LocationForm />
                </Route>
            </LocationProvider>

            <CustomerProvider>
                <Route path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>

            <EmployeeProvider>
                <Route exact path="/employees">
                    <EmployeeList />
                </Route>
                <LocationProvider>

                    <Route exact path="/employees/create">
                        <EmployeeForm />
                    </Route>

                </LocationProvider>
            </EmployeeProvider>
        </>
    )
}