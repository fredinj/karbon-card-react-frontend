// Home.js
import { useState } from 'react';
import axios from 'axios';
import './Home.css';

const FLAGS = {
  GREEN: 1,
  AMBER: 2,
  RED: 0,
  MEDIUM_RISK: 3, // Display purpose only
  WHITE: 4, // Data is missing for this field
};

const flagColors = {
  1: '#a8d5ba', // Pastel green
  2: '#ffe4a1', // Pastel amber
  0: '#f8b8b8', // Pastel red
  3: '#d8c3e9', // Pastel purple (medium risk)
  4: '#f1f1f1', // Light grey (data missing)
};

function Home() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        'https://karbon.autone.live/api/upload-data',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setResponse(res.data.flags);
    } catch (error) {
      setResponse({ error: `Error: ${error.message}` });
    }
  };

  return (
    <div className="container">
      <h1>File Upload</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {response && (
        <div className="cards">
          {Object.entries(response).map(([key, value]) => (
            <div
              key={key}
              className="card"
              style={{ backgroundColor: flagColors[value] }}
            >
              <h3>{key.replace(/_/g, ' ')}</h3>
              <p>Status: {value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
