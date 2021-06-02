import React, { useContext, useEffect } from "react"  // useContext hook allows you to use data structures and functions that a parent provider component exposes.
//useEffect hook allows the component to reach out into the world for anything that cannot be handled during render. In this case, it is the API call for the animals
import { useHistory } from 'react-router-dom' //useHistory() is a hook function provided by react-router-dom. It allows you to immediately use a push() method which you can use to change the URL.

import { AnimalContext } from "./AnimalProvider"
//  returns again. It has three key/value pairs on the object is exposes to its children.  
//animals whose value will be an array of animal objects
// getAnimal whose value is a function
// addAnimal whose value is a function

import "./Animal.css"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals } = useContext(AnimalContext) //lets you pull in any context needed. deconstrust the objects
  //you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes to directly gain access to any of those keys above.


  //useEffect - reach out to the world for something
  // reacts when state changes. needs a function to use when state changes
  //always needs a function and an array
  useEffect(() => { // hook allows the component to reach out into the world for anything that cannot be handled during render. In this case, it is the API call for the animals.
    console.log("AnimalList: useEffect - getAnimals")
    getAnimals()
  }, []) //Logic within functions only occur when a function is invoked. Within a React component, useEffect is a function. After the return, useEffect is automatically invoked and since the dependency array is empty, it only runs the first time the component renders. gets the permanent state

  const history = useHistory()
  return ( //returns the JSX
    <>
      <h2>Animals</h2>
      <div className="vertical-center">
        <button onClick={
          () => history.push("/animals/create")
        }>
          Add Animal
    </button>
      </div>
      <section className="animals">
        {console.log("AnimalList: Render", animals)}
        {
          animals.map(animal => { //.map() array method to iterate the array of animals and generate HTML for each one.
            return (   //html version

              // interpolates below//
              <div className="animal" key={animal.id} id={`animal--${animal.id}`}>
                <div className="animal__name">
                  Name: {animal.name}
                </div>
                <div className="animal__breed">
                  Breed: {animal.breed}
                </div>
              </div>
            )
          })
        }
      </section>
    </>
  )
}
