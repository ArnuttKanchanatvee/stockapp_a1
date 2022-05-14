import React from "react";
import { NavLink, Switch } from "react-router-dom";

// navigation links
export default function Nav() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Stock">Stock</NavLink>
          </li>

          <li>
            <NavLink to="/Quote">Quote</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
