import React from "react";
import "./FormList.css";

export default function FormList(props) {
    return (
        <div className="form-list-container">
            <p>here are the available forms:</p>
            <ol>
                {props.forms.map((item, index)=>{
                    item.name = "Form " + String.fromCharCode(65+index);
                    return <li key={index} className="form-list-item" onClick={props.handleOpenUI}>[{item.name}] Description: {item.description} | {item.$schema}</li>
                })}
            </ol>
        </div>
    )
}