// general imports
import React, { useEffect, useState } from 'react';
import './App.css';
import useFetch from "./hooks/useFetch"

// component imports
import Form from './components/Form';

export default function App() {
  // NOTE: the mock server had a typo in the regex validation, make sure that is corrected if a fresh copy is pulled from the github repo
  // query the mock server
  const url = 'http://localhost:3000/api/v1/123/actions/blueprints/bp_456/bpv_123/graph';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // store data from the mock server
  const { queryData, error, isLoading } = useFetch(url, options);

  // create state for the form data
  const [formData, setFormData] = useState(null);

  // update handler for the forms to maintain state
  const handleUpdateForm = (newForm) => {
    var newFormData = [...formData];
    for(var i=0;i<formData.length;i++){
      if(formData[i].id === newForm.id){
        newFormData[i] = newForm;
      }
    }
    setFormData(newFormData);
  }

  //update form data whenever the server query runs
  useEffect((formData)=>{
    console.clear();
    if(queryData){
      //setFormData(queryData.forms);
      // generate some junk data for demonstration purposes
      let junkForms = createJunkData(queryData.forms);
      // set the form data using the junk forms
      setFormData(junkForms);
    } else {
      console.log("query error: " + queryData);
    }
    // this function makes dummy json structs that the Form components use for this demonstration
    function createJunkData(formsArr){
      let arr = [];
      for(var i=0;i<formsArr.length;i++){
        var json = {
          "id": i,
          "name" : "Form " + String.fromCharCode(65+i),
          "allowPrefill" : Math.random() >= 0.5,
          "prefillTargets" : [queryData], // this array tells this form what other forms it can pull field data from
          "fields" : [
            {
              "name": "dynamic-checkbox-group",
              "value": "",
              "prefillRef": null, 
              "prefillValue": ""
            },
            {
              "name": "dynamic-object",
              "value": "",
              "prefillRef": null, 
              "prefillValue": ""
            },
            {
              "name": "email",
              "value": "",
              "prefillRef": null, 
              "prefillValue": ""
            },
          ],
        }
        // give the all proceeding forms a reference to the first one as a prefill target 
        if(i > 0){ json.prefillTargets.push(arr[0]) }
        // add this form to the forms array
        arr.push(json)
      }
      return arr;
    }
  },[queryData])
  
  return (
    <main>
      <h1>Journey Builder</h1>
      {error && <div>ERROR!</div>}
      {isLoading && <div>Loading...</div>}
      {/* Show the data fetched from the mock server */}
      {queryData &&
        <form>
          <label>Query Data: </label>
          {Object.keys(queryData).map((key) => (
            <div key={key}>
              <label>{key}: </label>
              <input type="text" value={queryData[key]} readOnly/>
            </div>
          ))}
        </form>}
      {/* Create the UI for viewing forms and editing prefill mapping */}
      {formData && 
        formData.map((form) => <Form form={form} handleUpdateForm={handleUpdateForm}/>) 
      }
    </main>
  );
}