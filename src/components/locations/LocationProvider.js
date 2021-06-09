import React, { useState, createContext } from "react" // useState  to hold and set the array of locations.

// The context is imported and used by individual components that need data
export const LocationContext = createContext()
//Context stores a certain kind of data to be used in your application
//createContext maintains state


// This component establishes what data can be used.
export const LocationProvider = (props) => { //transfers the data back and forth
    //the components that uses the data must be defined as children components, and React will send an object to each component.
    // probs is the arguemtn getting passed

    const [locations, setLocations] = useState([])// defines a variable to hold state. useState gets invoked passed as an arguement. like saying useApplicationState
    // the hook to define a variable that holds the state of the component, and a function that updates it
    //use state deconstructs the array. the first item is the first item is the value of the array its nothing at this time it means let locations = []. the second item is a funtion
    //the first item holds the state and the second mutates the state

/*   -Define the variable which will hold the data.
   let locations = []

    -Define the function to be used to modify that state.
  const setlocations = locationsData => {
    if (locationsData !== null && Array.isArray(locationsData)) {
        locations = locationsData
    }
}*/

    const getLocations = () => {
        return fetch("http://localhost:8088/locations?_embed=employees&_embed=animals") // & is a way to limit the response returned
        .then(res => res.json())
        .then(setLocations) //changes the variable. updates the state
    }

    const addLocation = locationObj => {
        return fetch("http://localhost:8088/locations", { // allows you to add a new location
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationObj)
        })
        .then(getLocations)
    }

    const getLocationById = locationId => {
        return fetch(`http://localhost:8088/locations/${locationId}/?_embed=employees&_embed=animals`)
        .then(res => res.json())        
    }//expand- everytime there's a foreign key, expand on the related object.
    // embed. no foreign key. find the foreign key in another collection that matches the primary key and show all matches

    const updateLocation = locatObj => {
        return fetch(`http://localhost:8088/locations/${locatObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locatObj)
        })
        .then(res => res.json())
        .then(getLocations)
    }
    /*
        You return a context provider which has the
        `locations` state, `getlocations` function,
        and the `addlocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <LocationContext.Provider value={{ //what this provider exposes to the rest of the application
            locations, getLocations, addLocation, getLocationById, updateLocation
            //the value is an object with these as keys it will allow each one to be invoked. will allow other modules to access them
        }}>
            {props.children} 
        </LocationContext.Provider>  // pros = properties of all child componets
    )
}  //With this, other components can access the array of objects being stored in the locations variable, and they can invoke the, getlocation and addlocation functions.