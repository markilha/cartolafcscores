import React from "react";
import "./header.css";
import { Link } from "react-router-dom";


export default function Head(){

    return(
       <header>
           <Link className="logo" to="/">Home</Link>
           <Link className="favoritos" to="/atletas">Atletas</Link>
           <Link className="favoritos" to="/escalacao">Escalaçao</Link>
           <img src="/img/cartola.jpg" alt="Cartola"/>
       </header>
    )
}


