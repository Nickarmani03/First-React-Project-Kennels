import React from "react"
import { Link } from "react-router-dom" //allows to generate hyperlink. decides what will be rendered to the user
import "./NavBar.css"

//NavBar: This is a Presentation Component for the constant navigation elements. Directly expresses HTML/ JSX.

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">NSS Kennels</Link>
            </li>
            {/* the <Link/> component. This comes from the React Router package you installed. It has an attribute named to. It will render a hyperlink in your DOM, and when clicked, it will change the URL in the browser to the value of the to attribut */}
            <li className="navbar__item">
                <Link className="navbar__link" to="/locations">Locations</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/animals">Animals</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/login"
                    onClick={ //allows the user to logout by removing the current user from the local storage
                        (event) => {
                            localStorage.removeItem("kennel_customer")
                        }
                    }
                >Logout</Link>
            </li>
        </ul>
    )
}