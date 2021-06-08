
import React, { useContext, useEffect } from "react"  // useContext hook allows you to use data structures and functions that a parent provider component exposes.
//useEffect hook allows the component to reach out into the world for anything that cannot be handled during render. In this case, it is the API call for the locations

import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import "./Locations.css"

import { LocationContext } from "./LocationProvider"
//  returns again. It has three key/value pairs on the object is exposes to its children.  
//locations whose value will be an array of location objects
// getlocation whose value is a function
// addlocation whose value is a function





export const LocationList = () => {
  // This state changes when `getlocations()` is invoked below
  const { locations, getLocations } = useContext(LocationContext) //lets you pull in any context needed. deconstrust the objects
  //you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes to directly gain access to any of those keys above.

  const history = useHistory()

  //useEffect - reach out to the world for something
  // reacts when state changes. needs a function to use when state changes
  //always needs a function and an array
  useEffect(() => { // hook allows the component to reach out into the world for anything that cannot be handled during render. In this case, it is the API call for the locations.
    console.log("LocationList: useEffect - getLocations")
    getLocations()
  }, []) //Logic within functions only occur when a function is invoked. Within a React component, useEffect is a function. After the return, useEffect is automatically invoked and since the dependency array is empty, it only runs the first time the component renders. gets the permanent state




  return ( //returns the JSX
    <>
      <h2>Locations</h2>
      <div className="vertical-center">
        <button onClick={
          () => history.push("/locations/create")
        }>
          Add Location
    </button>
      </div>
      <section className="locations">
        {console.log("LocationList: Render", locations)}
        {locations.map(location =>  //.map() array method to iterate the array of locations and generate HTML for each one.
          // return (   //html version

          //  interpolates below//
          //   <div  id={`location--${location.id}` >
          <div className="location" key={location.id} id={`location--${location.id}`}>
            <div className="locations__name">
              <Link to={`/locations/detail/${location.id}`} key={location.id} className="locations">
                {location.name}
              </Link>
            </div>
            {/* <div>
                    {location.employees.length} Employees
                          </div>
                  <div>
                    {location.animals.length} Animals
                          </div> */}
          </div>

        )
        }
      </section>
    </>
  )
}