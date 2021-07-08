import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    console.log("the use effect")
    axios
    .get('http://localhost:5000/api/posts')
    .then(res => {
      console.log("the response from get api", res)
      setData(res.data)
    })
    .catch(err => {
      console.log("this is error: ", err)
    })

  }, [])


  return (
    <div className="App">
      {data.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.contents}</p>
        </div>
        
      ))}
    </div>
  );
}

export default App;
