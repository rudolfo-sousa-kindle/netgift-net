import React, { Component } from "react";
import Loading from "../assets/imgs/loader.gif";

class Loader extends Component {
    render(){
        return(
            <div className="loader">
                <img src={Loading} alt="Loading" />
            </div>
        )
    }
}

export default Loader;