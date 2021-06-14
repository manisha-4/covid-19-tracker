import React from 'react'
import "./table.css";
//import numeral from "numeral";
function Table({countries}) {
    return (
        <div className="table">
        {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{(country.cases)}</strong>
          </td>
        </tr>
      ))}
      </div>
    )
}

export default Table
//numeral(country.cases).format("0,0")
