import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams, useHistory } from "react-router-dom"




export const AnimalDetail = () => {
    const { getAnimalById, releaseAnimal } = useContext(AnimalContext)
    
    const [animal, setAnimal] = useState({ location: {}, customer: {} })

    /*
        Given the example URL above, this will store the value
        of 5 in the animalId variable
    */

    // hook function useParams() allows code to read route parameter from URL
    const { animalId } = useParams() // use when there's a dynamic route.

    useEffect(() => {
        getAnimalById(parseInt(animalId)).then((animalObj) => {
            setAnimal(animalObj);
        });
    }, [animalId]);

    // dependency stops once animal id is found
    const history = useHistory()

    const handleRelease = () => {
        releaseAnimal(animal.id)
            .then(() => {
                history.push("/animals")
            })
    }


    return (


        <section className="animal">
            <h3 className="animal__name">{animal.name}</h3>
            <div className="animal__breed">{animal.breed}</div>
            <div className="animal__location">Location: {animal.location.name}</div>
            <div className="animal__owner">Customer: {animal.customer.name}</div>
            <button onClick={handleRelease}>Release Animal</button>
            <button onClick={() => {history.push(`/animals/edit/${animal.id}`)}}>Edit</button>
        </section>
    )
}