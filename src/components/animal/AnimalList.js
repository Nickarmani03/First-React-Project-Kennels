//must be a child of the provider to access the data on ther provider

import React, { useContext, useEffect, useState } from "react"  // useContext hook allows you to use data structures and functions that a parent provider component exposes.
//useEffect hook allows the component to reach out into the world for anything that cannot be handled during render. In this case, it is the API call for the animals
//import { useHistory } from 'react-router-dom' //useHistory() is a hook function provided by react-router-dom. It allows you to immediately use a push() method which you can use to change the URL.



// import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
//useHistory() is a hook function provided by react-router-dom. It allows you to immediately use a push() method which you can use to change the URL.
import "./Animal.css"
import { AnimalContext } from "./AnimalProvider"
import { AnimalDetail } from "./AnimalDetail"
//  returns again. It has three key/value pairs on the object is exposes to its children.  
//animals whose value will be an array of animal objects
// getAnimal whose value is a function
// addAnimal whose value is a function



export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals, searchTerms } = useContext(AnimalContext) //lets you pull in any context needed. deconstrust the objects from the provider component.
  //you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes to directly gain access to any of those keys above.
  //returned as JSX at the bottom

  // Since you are no longer ALWAYS displaying all of the animals
  const [filteredAnimals, setFiltered] = useState([])

  const history = useHistory()

  //useEffect - reach out to the world for something
  // reacts when state changes. needs a function to use when state changes. if state changes, run the thing
  // always takes 2 arguements. first is a function (hook) and the second is an array  
  useEffect(() => { // hook allows the component to reach out into the world for anything that cannot be handled during render. In this case, it is the API call for the animals.it gets the animal data

    console.log("AnimalList: useEffect - getAnimals")
    getAnimals()
  }, []) //Logic within functions only occur when a function is invoked. Within a React component, useEffect is a function. After the return, useEffect is automatically invoked and since the dependency array is empty, it only runs the first time the component is first rendered since we are using an empty array. gets the permanent state

  //after, animals will then be an array of objects


  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching animals
      const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms.toLowerCase())
      );
      setFiltered(subset);
    } else {
      // If the search field is blank, display all animals
      setFiltered(animals)
    }
  }, [searchTerms, animals])

  //returns the JSX. use an explicit return return()
  return ( // for <>  JSX expressions can only return one JSX componet for every function. cannot do 2 siblings. you need to use a empty component called a fragment. an unnamed element.
    //.map inside of JSX when you need to iterate an array of objects and convert them into an array of JSX. passed to an animal object
    // no dollar signs needed to interpolate in JSX {animal.breed}
    <>
      <h2>Animals</h2>
      <div className="vertical-center">
        <button onClick={() => history.push("/animals/create")
        }> Make Reservation </button>
      </div>

      <div className="animals">
        {filteredAnimals.map((animal) => {
          return <AnimalDetail key={animal.id} animal={animal} />;
        })}
      </div>
    </>
  );
};


      {/* <div className="animals">
        {animals.map(animal =>
          <div className="animal" key={animal.id} id={`animal--${animal.id}`}>
            <div className="animal__name">
              <Link to={`/animals/detail/${animal.id}`}>
                {animal.name}
              </Link></div>
            <div className="animal__breed">
              Breed: {animal.breed}
            </div>
          </div>
        )
        }
      </div>
    </>
  )
} */}