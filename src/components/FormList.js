import React from "react";

export default function FormList(props) {
    return (
        <div className="form-list-container">
            {props.forms.map((item, index)=>(
            <div key={index} className="form-div">[{item.name}] Description: {item.description} | {item.$schema}</div>
            ))}
        </div>
    )
}