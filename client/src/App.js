import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  useEffect(() => {
    console.log("the use effect")
    axios
    .get(`http://localhost:5000/api/posts`)
    .then(res => {
      console.log("the response from get api", res)
    })

  }, [])


  return (
    <div className="App">
      <h2>RESTFUL API</h2>
    </div>
  );
}

export default App;
