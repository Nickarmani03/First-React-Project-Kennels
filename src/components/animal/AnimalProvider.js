import React, { useState, createContext } from "react" // useState  to hold and set the array of animals.

//provider manages state

// The context is imported and used by individual components that need data
export const AnimalContext = createContext()
//Context stores a certain kind of data to be used in your application
//createContext maintains state


// This component establishes what data can be used.
export const AnimalProvider = (props) => { //transfers the data back and forth
    //the components that uses the data must be defined as children components, and React will send an object to each component.
    // probs is the arguemtn getting passed

    const [animals, setAnimals] = useState([])// defines a variable to hold state. useState gets invoked passed as an arguement. like saying useApplicationState
    // the hook to define a variable that holds the state of the component, and a function that updates it
    //use state deconstructs the array. the first item is the first item is the value of the array its nothing at this time it means let animals = []. the second item is a funtion
    //the first item holds the state and the second mutates the state

/*   -Define the variable which will hold the data.
   let animals = []

    -Define the function to be used to modify that state.
  const setAnimals = animalsData => {
    if (animalsData !== null && Array.isArray(animalsData)) {
        animals = animalsData
    }
    //? is another filter
}*/

const getAnimals = () => {
     return fetch("http://localhost:8088/animals?_expand=customer&_expand=location&_sort=location.id")
        .then(res => res.json())
        .then(setAnimals) //changes the variable. updates the state
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

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */
    return (
        <AnimalContext.Provider value={{ //what this provider exposes to the rest of the application
            animals, getAnimals, addAnimal //the value is an object with these as keys it will allow each one to be invoked. will allow other modules to access them
        }}>
            {props.children} 
        </AnimalContext.Provider>  // pros = properties of all child componets
    )
}  //With this, other components can access the array of objects being stored in the animals variable, and they can invoke the, getAnimal and addAnimal functions.