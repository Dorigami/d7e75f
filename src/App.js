// general imports
import React, { useEffect, useState } from 'react';
import './style.css';
import useFetch from "./hooks/useFetch"
// component imports
import FormList from './components/FormList';
import PrefillUI from './components/PrefillUI';

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
    <main>
      <h1>Journey Builder</h1>
      <p>here are the available forms</p>
      {error && <div>ERROR!</div>}
      {isLoading && <div>Loading...</div>}
      {data && <FormList forms={data.forms}/>}
      <PrefillUI data={data}></PrefillUI>
    </main>
  );
}