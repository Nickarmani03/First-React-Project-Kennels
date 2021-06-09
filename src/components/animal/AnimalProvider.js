//provider modules maintain the application state. The provider components handle all interactions with the database


import React, { useState, createContext } from "react" // useState  to hold and set the array of animals.
// The context is imported and used by individual components that need data


export const AnimalContext = createContext()
//Context stores a certain kind of data to be used in your application
//createContext maintains state.


// This component establishes what data can be used. it will assist in creating, editing, and removing the data. will transmit the data
// the hook (function) to define a variable that holds the state of the component, and a function that updates it
export const AnimalProvider = (props) => { //transfers the data back and forth
    //the components that uses the data must be defined as children components, and React will send an object to each component.
    // props is the arguement getting passed

    const [animals, setAnimals] = useState([])// imported from react. it defines a state variable to show initial state. useState gets invoked passed as an arguement, like saying useApplicationState. useState will always return an array with 2 items. and it needs to be deconstructed.

    //useState is a function returns an array that we need to deconstruct into 2 variables. the first item is the value of the array its an empty array of animals in this case at this time it means let animals = []. it is a variable that holds the state. 
    //the second item is a funtion. it a variable that mutates the state,  SetAnimals in this case. its jobs is to mutate animals to get a new value.  
    const [ searchTerms, setSearchTerms ] = useState("")

    /*   -Define the variable which will hold the data.
       let animals = []
    
        -Define the function to be used to modify that state.
      const setAnimals = animalsData => {
        if (animalsData !== null && Array.isArray(animalsData)) {
            animals = animalsData
        }
        (?) is another filter
    }*/

    const getAnimals = () => {// will reach out to get the animals from the API /Json
        return fetch("http://localhost:8088/animals?_expand=customer&_expand=location&_sort=location.id")
            .then(res => res.json()) //converts the json stringified array into a javascript array
            .then(setAnimals) //takes the data that comes back from the API and passes it through the SetAnimals function. setAnimals will then change the value of animals above and updates the state with the returned array.
    }

    const addAnimal = animal => {//Animal is an object
        return fetch("http://localhost:8088/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })
            .then(response => response.json())
    }

    const releaseAnimal = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}`, { //backtics allow interpolation. a variable will be injected into a string
            method: "DELETE"
        })
            .then(getAnimalById)
    }
    const getAnimalById = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}?_expand=customer&_expand=location&_sort=location.id`)
            .then(res => res.json())
    }

    const updateAnimal = animal => {
        return fetch(`http://localhost:8088/animals/${animal.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })
            .then(getAnimals) // rerenders with the newest API
    }
    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */
    return (
        <AnimalContext.Provider value={//the value of the state is what this provider exposes to the rest of the application. the object below
            { 
            animals, getAnimals, addAnimal, getAnimalById, releaseAnimal, updateAnimal,  searchTerms, setSearchTerms //the value is an object with these as keys it will allow each one to be invoked. will allow other modules to access them.
        }
        }>
            {props.children}
        </AnimalContext.Provider>  // props = properties of all child componets. ensures the child have access to the properties, and it is an object. the arguement to the provider function. takes all the arguments and wraps them in an object.
    )
}  //With this, other components can access the array of objects being stored in the animals variable, and they can invoke the, getAnimal and addAnimal functions.