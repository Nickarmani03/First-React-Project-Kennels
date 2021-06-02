import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Kennel.css";

//<AnimalList> component is a child of the <AnimalProvider> component. It is crucial that you wrap components that need data with the provider component that exposes that data in JSX

export const Kennel = () => (
    <>  {/*empty brackets allow you to return more than one thing*/}
        <h2>Nashville Kennels</h2>
        <h3><small>Loving care when you're not there.</small></h3>

        <address>
            <h3><div>Visit Us at the Nashville North Location</div>
                <div>500 Puppy Way, Nashville, TN.</div></h3>
        </address>

        <Route
            render={() => {
                if (localStorage.getItem("kennel_customer")) {
                    return (
                        <>
                            <NavBar />
                            <ApplicationViews />
                        </>
                    );
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />

        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
)