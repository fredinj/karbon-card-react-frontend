// Home.js
import { useState } from 'react';
import axios from 'axios';

function Home() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');

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
      const res = await axios.post('https://karbon-card-flask-api.onrender.com/api/upload-data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
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
        <div>
          <h2>API Response:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}

export default Home;
