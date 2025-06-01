// general imports
import React, { useEffect, useState } from 'react';
import './App.css';
import useFetch from "./hooks/useFetch"

// component imports
import FormList from './components/FormList';
import PrefillUI from './components/PrefillUI';

export default function App() {
  // query the mock server
  const url =
    'http://localhost:3000/api/v1/123/actions/blueprints/bp_456/bpv_123/graph';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { queryData, error, isLoading } = useFetch(url, options);
  // create state for the prefill UI
  const [formData, setFormData] = useState(null);
  const [targetForm, setTargetForm] = useState(null);

  const openUI = (event) => {
    var key = event.target.getAttribute('class');
    console.log(key);
    setTargetForm(formData[0]);
  };
  const closeUI = () => setTargetForm(null);

  //update prefill UI whenever the UI opens
  useEffect(()=>{
    if(queryData){
      setFormData(queryData.forms);
    }
  },[queryData])


  
  return (
    <main>
      <h1>Journey Builder</h1>
      
      {error && <div>ERROR!</div>}
      {isLoading && <div>Loading...</div>}
      {queryData &&
        <form>
          <label>Query Data: </label>
          {Object.keys(queryData).map((key) => (
            <div key={key}>
              <label>{key}: </label>
              <input type="text" value={queryData[key]} readonly/>
            </div>
          ))}
        </form>}
      {queryData && <FormList 
                  handleOpenUI={openUI}
                  forms={queryData.forms}/>}

      {targetForm && <PrefillUI 
                      handleCloseUI={closeUI} 
                      targetForm={targetForm}/>}
    </main>
  );
}