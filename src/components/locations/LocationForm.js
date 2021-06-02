import React, { useContext, useState } from "react"
import { LocationContext } from "../locations/LocationProvider"
import "./Locations.css"
import { useHistory } from 'react-router-dom';

export const LocationForm = () => {
  const { addLocation } = useContext(LocationContext)
  
const [location, setLocation] = useState({
    name: "",
    address: "",
  });

  const history = useHistory();

  
  /*useEffect(() => {
    }, [])
    
    this may be used down the road in the code*/

  const handleControlledInputChange = (event) => {
    const newLocation = { ...location }
    newLocation[event.target.id] = event.target.value
    setLocation(newLocation)
  }

  const handleClickSaveLocation = (event) => {
    event.preventDefault() 
    /*const locationId = parseInt(animal.locationId)
    const customerId = parseInt(animal.customerId)
    if (locationId === 0 || customerId === 0) {
      window.alert("Please select a location and a customer")
    } */ 
      //Invoke addAnimal passing the new animal object as an argument
      //Once complete, change the url and display the animal list

      const newLocation = {
        name: location.name,
        address: location.address,
      }
      addLocation(newLocation)
        .then(() => history.push("/locations"))
    }
  

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
      
      <button className="btn btn-primary" onClick={handleClickSaveLocation}>
        Save Location
          </button>
    </form>
  )
}