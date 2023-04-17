import React,{useContext} from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/contextAuth";

export default function Head() {
    const {logout}= useContext(AuthContext)
  return (
    <header>
      <Link className="logo" to="/">
        Home
      </Link>   
   
   <img src="/img/cartola.jpg" alt="Cartola" className="cartola" onClick={()=>logout()}   style={{ cursor: "pointer" }}/>
    </header>
  );
}
