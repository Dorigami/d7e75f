import React, { useEffect, useState } from 'react';
import './style.css';
import useFetch from "./hooks/useFetch"

export default function App() {
  const url =
    'http://localhost:3000/api/v1/123/actions/blueprints/bp_456/bpv_123/graph';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data, error, isLoading } = useFetch(url, options);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      {error && <div>ERROR!</div>}
      {isLoading && <div>Loading...</div>}
      {data && <div>
        {data.forms.map((item, index)=>(
          <div key={index}>[{item.name}] description: {item.description}</div>
        ))}
      </div>}
    </div>
  );
}
