import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../locations/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import "./Animal.css"
import { useHistory, useParams } from 'react-router-dom';

export const AnimalForm = () => {
    const { addAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)// allows it to use the data
    const { locations, getLocations } = useContext(LocationContext)

    const { customers, getCustomers } = useContext(CustomerContext)

    //for edit, hold on to state of animal in this view
    const [animal, setAnimal] = useState({}) //returns a pair: the current state value and a function that lets you update it.

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {animalId} = useParams()// can capture the variable name. 
    // used when there's a dynamic route.

	  const history = useHistory() // force a url change when the button is clicked. returns a value

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newAnimal = { ...animal }
      //animal is an object with properties.
      //set the property to the new value
      newAnimal[event.target.name] = event.target.value
      //update state
      setAnimal(newAnimal)
    }

    const handleSaveAnimal = () => {
      if (parseInt(animal.locationId) === 0) {
          window.alert("Please select a location")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (animalId){
          //PUT - update
          updateAnimal({
              id: animal.id,
              name: animal.name,
              breed: animal.breed,
              locationId: parseInt(animal.locationId),
              customerId: parseInt(animal.customerId)
          })
          .then(() => history.push(`/animals/detail/${animal.id}`))
        }else {
          //POST - add
          addAnimal({
              name: animal.name,
              breed: animal.breed,
              locationId: parseInt(animal.locationId),
              customerId: parseInt(animal.customerId)
          })
          .then(() => history.push("/animals"))
        }
      }
    }

    // Get customers and locations. If animalId is in the URL, getAnimalById
    useEffect(() => {  //runs initially once. then it will run every time the location state changes
    //when a field changes, update state. The return will re-render and display based on the values in state
      getCustomers().then(getLocations).then(() => {
        if (animalId){
          getAnimalById(animalId)
          .then(animal => {
              setAnimal(animal)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
    }, [])

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (//renders JSX when the state chenges and then runs the useEffect then JSX runs again afterwards.
      <form className="animalForm">
        <h2 className="animalForm__title">New Animal</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="animalName">Animal name: </label>
            <input type="text" id="animalName" name="name" required autoFocus className="form-control"
            placeholder="Animal name"
            onChange={handleControlledInputChange}
            defaultValue={animal.name}/>
          </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
          <label htmlFor="name">Animal breed:   </label>
          <input type="text" id="breed" name="breed" required autoFocus className="form-control" placeholder="Animal breed" value={animal.breed} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="location">Assign to location: </label>
            <select value={animal.locationId} name="locationId" id="animalLocation" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a location</option>
              {locations.map(l => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="customer">Customer: </label>
            <select value={animal.customerId} name="customerId" id="customerAnimal" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                    {c.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveAnimal()
          }}>
        {animalId ? <>Save Animal</> : <>Add Animal</>}</button>
      </form>
    )
}