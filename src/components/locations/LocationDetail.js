import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Locations.css"
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
    const { getLocationById } = useContext(LocationContext)
    const [location, setLocation] = useState({ employees: [], animals: [] })


    // hook function useParams() allows code to read route parameter from URL
    const { locationId } = useParams() // use when there's a dynamic route.

    // dependency stops once animal id is found
    useEffect(() => {
        getLocationById(parseInt(locationId)
        ).then(location => { setLocation(location) })
    }, [locationId])


    const history = useHistory()

    return (
        <section className="location" key={location.id}>
            <h3 className="location__name"> {location.name} </h3>
            <div className="location__address"> {location.address} </div>
            <div className="location__employees">
                <h3>Employees: </h3>
                {location.employees.map(employee =>
                    <div className="location__employee__name"> {employee.name} </div>
                )}
            </div>
            <div className="location__animals" key={location.id}>
                <h3>Current Animals:</h3>
                {location.animals.map(animal =>
                    <div className="location__animal__name"> {animal.name} </div>
                )}
            </div>
            <button onClick={() => {
                history.push(`/locations/edit/${location.id}`)
            }}>Edit</button>
        </section>
    )
}