import { useState } from "react";
import "./Form.css";

// components
import PrefillMapper from "./PrefillMapper";

export default function Form(props) {
    const [isFormOpen, setFormOpen] = useState(false);
    const openForm = () => { if(!isFormOpen) setFormOpen(true) };
    const closeForm = () => {
        setFormOpen(false);
    }
    const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);

    const handleFieldClick = (index) => {
        setSelectedFieldIndex(index);
    };

    const handleOptionSelect = (option) => {
        if (selectedFieldIndex !== null) {
            props.form.fields[selectedFieldIndex].value = option;
        }
        setSelectedFieldIndex(null);
    };

    const toggleAllowPrefill = (event) => {
        var flag = !props.form.allowPrefill;
        props.form.allowPrefill = flag;
        event.target.checked = flag;
        props.handleUpdateForm(props.form);
    }

    const clearFieldPrefill = (index) => {
        props.form.fields[index].value = "";
        props.handleUpdateForm(props.form);
    };

    // create a dummy hierarchy to troubleshoot the prefill mapper
    const optionsTree = [
        {
            name: 'Category A',
            children: [
            { name: 'Subcategory A1', children: ['Option A1.1', 'Option A1.2'] },
            { name: 'Subcategory A2', children: ['Option A2.1', 'Option A2.2'] },
            ],
        },
        {
            name: 'Category B',
            children: [
            { name: 'Subcategory B1', children: ['Option B1.1', 'Option B1.2'] },
            { name: 'Subcategory B2', children: ['Option B2.1', 'Option B2.2'] },
            ],
        }];

    return (
        <div className="form-container" onClick ={openForm}>
            {isFormOpen && 
                <button className="form-close-button" onClick={closeForm}>
                    CLOSE
                </button>}
            <div className="form-header">
                <h2>{props.form.name}</h2>
                <div style={{width: "100%"}}></div>
            </div>
            
            { isFormOpen && 
                <div>
                    <p>Prefill Fields:</p>
                {/* slider to reveal prefill fields */}
                    <label className="switch">
                        <input type="checkbox" defaultChecked={props.form.allowPrefill} onChange={toggleAllowPrefill} name="toggle"/>
                        <span className="slider"></span>
                    </label>
                {/* reveal the prefill fields when the slider is flipped on */}
                    {props.form.allowPrefill && 
                        <form>
                            {props.form.fields.map((field, index) => (
                                <div key={index}>
                                <input
                                    type="text"
                                    value={field.value}
                                    readOnly
                                    placeholder={field.name}
                                    onClick={() => handleFieldClick(index)}
                                />
                                {field.value && <button className="clear-prefill-button" onClick={() => clearFieldPrefill(index)}> &times; </button>}
                                </div>
                            ))}
                        </form>
                    }
                {/* reveal the modal when one of the fields is clicked on */}
                    {selectedFieldIndex !== null && (
                        <PrefillMapper options={optionsTree} handleOptionSelect={handleOptionSelect} />
                    )}
                </div>
            }
        </div>
    );
}