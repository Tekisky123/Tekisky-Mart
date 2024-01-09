// src/components/ProductForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    // Initialize with default values or leave empty
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await axios.post('https://tekisky-mart.onrender.com/admin/upload', formData);
      const imageUrl = response.data.imageUrl;
      setFormData((prevData) => ({
        ...prevData,
        imageURL: [...prevData.imageURL, imageUrl],
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send formData to your API endpoint for creating a product
      await axios.post('https://tekisky-mart.onrender.com/admin/addproduct', formData);
      // Optionally, redirect to a success page or show a success message
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
    {/* Add form fields for other product data */}
    <Form.Group controlId="image">
      <Form.Label>Upload Image</Form.Label>
      <Form.Control type="file" onChange={handleImageUpload} />
    </Form.Group>
    <Button variant="primary" type="submit">
      Add Product
    </Button>
  </Form>
  
  );
};

export default ProductForm;
