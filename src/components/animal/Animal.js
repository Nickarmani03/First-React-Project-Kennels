import React from "react"
import "./Animal.css"

export const Animal = () => (
    <section className="animal">
        <h3 className="animal__name">Doodles</h3>
        <div className="animal__breed">Breed: Poodle</div>
    </section>
)


//jsx expressions can only return one jsx componet for every function. cannot do 2 siblings. you need to use a empty component called a fragment. an unnamed element.