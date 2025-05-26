import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setStatusMessage('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      setStatusMessage('Uploading...');
      await axios.post('https://culture-webapp.onrender.com/api/images/uploads/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token'), // JWT token from storage
        },
      });
      setStatusMessage('Image uploaded successfully!');
      setImageFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error(error);
      setStatusMessage('Upload failed. Please try again.'+error.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Dashboard</h1>
      
      {/* Image Upload Section */}
      <section>
        <h2>Upload Heritage Image</h2>
        <form onSubmit={handleUpload}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          
          {previewUrl && (
            <div style={{ margin: '15px 0' }}>
              <img
                src={previewUrl}
                alt="Preview"
                style={{ width: '100%', maxHeight: 300, objectFit: 'contain' }}
              />
            </div>
          )}

          <button type="submit" style={{ marginTop: 10 }}>
            Upload Image
          </button>
        </form>

        {statusMessage && <p style={{ marginTop: 15 }}>{statusMessage}</p>}
      </section>
    </div>
  );
};

export default Dashboard;
