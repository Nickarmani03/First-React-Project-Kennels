import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams, useHistory } from "react-router-dom"




export const AnimalDetail = ({ animal }) => {
    const { getAnimalById, releaseAnimal } = useContext(AnimalContext)

    const [useAnimal, setAnimals] = useState({ location: {}, customer: {} })

    /*
        Given the example URL above, this will store the value
        of 5 in the animalId variable
    */

    // hook function useParams() allows code to read route parameter from URL
    const { animalId } = useParams() // use when there's a dynamic route.

    useEffect(() => {
        if (animalId) {
            getAnimalById(parseInt(animalId)).then((animalObj) => {
                setAnimals(animalObj)
            });
        } else { setAnimals(animal) }
    }, [animalId]);

    // dependency stops once animal id is found
    const history = useHistory()

    const handleRelease = () => {
        releaseAnimal(useAnimal.id)
            .then(() => {
                history.push("/animals")
            })
    }


    return (


        <section className="animal">
            <h3 className="animal__name">{useAnimal.name}</h3>
            <div className="animal__breed">Breed: {useAnimal.breed}</div>
            <div className="animal__location">Location: {useAnimal.location.name}</div>
            <div className="animal__owner">Customer: {useAnimal.customer.name}</div>
            <button onClick={handleRelease}>Release Animal</button>
            <button onClick={() => { history.push(`/animals/edit/${useAnimal.id}`) }}>Edit</button>
        </section>
    )
}