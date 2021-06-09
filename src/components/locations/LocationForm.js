import React, {  useContext, useState, useEffect } from "react"
import { LocationContext } from "../locations/LocationProvider"
import "./Locations.css"
import { useHistory, useParams  } from 'react-router-dom';

export const LocationForm = () => {
  const { addLocation, getLocations, updateLocation, getLocationById } = useContext(LocationContext) //defines 
  const [location, setLocation] = useState({}) // what we send to the api to save in permanent state every time the user interacts with input. it will update every time something is typed
  //you cannot directly access and update useState variables in React. you need to use a function to update the state with.

  const [isLoading, setIsLoading] = useState(true)
  const { locationId } = useParams()

  const history = useHistory()



  const handleControlledInputChange = (event) => { //user provided input
    const newLocation = { ...location }  //creates a new object that is a copy of the object above with the spread operator. allows the copy to be modified
    newLocation[event.target.id] = event.target.value // event.target.value allows you to modify the copy of the keys above
    // [event.target.id] notation allows you to dynamically modify all keys above on the input form. New location is the new copy of state
    setLocation(newLocation) //updates the new state/ the real state. gets invoked below on the onChange
  }

  const handleSaveLocation = () => {
    if (locationId) { // invokes updateLocation
      updateLocation({
        id: location.id,
        name: location.name,
        address: location.address
      })
        .then(() => history.push(`/locations/detail/${location.id}`))
    } else {
      addLocation({ //else addLocation
        name: location.name,
        address: location.address
      })//state to make the selection permanent. allows it to be saved to the API
        .then(() => history.push("/locations"))
    }
  }

  useEffect(() => {
    getLocations().then(() => {
      if (locationId) {
        getLocationById(locationId)
          .then(location => {
            setLocation(location)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })
  }, [])



  return (

    <form className="locationForm">
      <h2 className="locationForm__title">New Location</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Location name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Location name" value={location.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Location address:</label>
          <input type="text" id="address" required autoFocus className="form-control" placeholder="Location address" value={location.address} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault()
          handleSaveLocation()
        }}>
        Save location
        </button>
    </form>
  )
}