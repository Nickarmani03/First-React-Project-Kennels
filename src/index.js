import React from "react" //renders state as JSX
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Kennel } from "./components/Kennel.js"
import "./index.css"

// the first JavaScript file that runs in our app

ReactDOM.render( // invoke the kennel function is ,equal to ${Kennel} but for JSX
    <React.StrictMode>
        <Router>
            <Kennel />
        </Router>
    </React.StrictMode>,
    document.getElementById("root") //rendered inside the element root
)