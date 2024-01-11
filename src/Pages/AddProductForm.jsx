import React, { useState } from 'react';
import axios from 'axios';
import "../Assets/Styles/AddProductForm.css";
import "../Assets/Styles/Style.scss";

const AddProductForm = () => {
  // Use an empty object instead of an array for the initial product state
  const [products, setProducts] = useState([{}]);
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    // Set default values for properties to avoid controlled/uncontrolled component warnings
    productId: '',
    productCategory: '',
    productName: '',
    productType: '',
    productBrand: '',
    description: '',
    availableStockQty: 0,
    availablePackQty: 0,
    packetweight: '',
    mrp: 0,
    offerPrice: '',
    createdby: '',
    manufacturingDate: '',
    expiryDate: '',
  });


  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'packetweight' || ['mrp', 'offerPrice', 'availableStockQty', 'availablePackQty'].includes(name)) {
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = {
          ...updatedProducts[index],
          [name]: value,
        };
        return updatedProducts;
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    // Simplify the file handling logic
    const filesArr = Array.from(e.target.files);


    setFiles((prevImages) => [...prevImages, ...filesArr]);
  };

  const handleImgClose = (file) => {
    // Simplify the image removal logic
    const updatedImages = files.filter((img) => img.name !== file.name);
    setFiles(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form...');
      // Rest of your code
    } catch (error) {
      console.error('Error adding product:', error);
      // Rest of your code
    }

    try {
      const formDataWithImages = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithImages.append(key, value);
      });

      products.forEach((product, index) => {
        Object.entries(product).forEach(([key, value]) => {
          formDataWithImages.append(`products[${index}][${key}]`, value);
        });
      });

      files.forEach((files,index) => {
        formDataWithImages.append(`files[${index}]`, files);
      });

      const response = await axios.post('http://localhost:8080/admin/addproduct', formDataWithImages);

      console.log(response.data);
      // You can add logic to handle success or show a success message to the user
    } catch (error) {
      console.error('Error adding product:', error);
      // You can add logic to handle errors and show an error message to the user
    }
  };

  const handleAddProduct = () => {
    // Use Object.assign to create a new product object with default values
    setProducts((prevProducts) => [
      ...prevProducts,
      Object.assign({}, {
        availableStockQty: 0,
        packetweight: '',
        availablePackQty: 0,
        mrp: 0,
        offerPrice: '',
      }),
    ]);
  };

  const handleDeleteProduct = (index) => {
    // Simplify the product deletion logic
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Product Category: <span className="required">*</span>
          </label>
          <select
            name="productCategory"
            value={formData.productCategory}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="" disabled>
              Select Product Category
            </option>
            <option value="Dry-dates">DRY DATES</option>
            <option value="Dry-fruits">DRY FRUITS</option>
            <option value="seedless-dates">SEEDLESS DATES</option>
            <option value="Stuffed-dates">STUFFED DATES</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Product ID: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={(e) => handleChange(e)}
            required
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label>
            Product Name: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={(e) => handleChange(e)}
            required
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label>
            Product Type: <span className="required">*</span>
          </label>
          <select
            name="productType"
            value={formData.productType}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="" disabled>
              Select product type
            </option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Tablet">Tablet</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Product Brand: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="productBrand"
            value={formData.productBrand}
            onChange={(e) => handleChange(e)}
            required
            maxLength="30"
          />
        </div>

        <div className="form-group">
          <label>
            Description: <span className="required">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e)}
            required
            maxLength="200"
          />
        </div>

        {products.map((product, index) => (
          <div key={index} className="add-product-container">
            <div className="form-group">
              <label>
                Available Stock Quantity: <span className="required">*</span>
              </label>
              <input
                type="number"
                name="availableStockQty"
                value={product.availableStockQty}
                onChange={(e) => handleChange(e, index)}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>
                Packet Weight: <span className="required">*</span>
              </label>
             
              <select
                name="packetweight"
                value={product.packetweight}
                onChange={(e) => handleChange(e, index)}
                required
              >
                <option value="">Select Packet Weight</option>
                <option value="250g">250g</option>
                <option value="500g">500g</option>
                <option value="1kg">1kg</option>
                <option value="5kg">5kg</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Available Pack Quantity: <span className="required">*</span>
              </label>
              <select
                name="availablePackQty"
                value={product.availablePackQty}
                onChange={(e) => handleChange(e, index)}
                required
              >
                <option value={1}>1</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                MRP: <span className="required">*</span>
              </label>
              <input
                type="number"
                name="mrp"
                value={product.mrp}
                onChange={(e) => handleChange(e, index)}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>
                Offer Price: <span className="required">*</span>
              </label>
              <input
                type="number"
                name="offerPrice"
                value={product.offerPrice}
                onChange={(e) => handleChange(e, index)}
                required
                min="0"
              />
            </div>

            <button type="button" className="delete" onClick={() => handleDeleteProduct(index)}>
              Delete Product
            </button>
          </div>
        ))}

        <button type="button" className="add" onClick={handleAddProduct}>
          Add Product
        </button>

        <div className="form-group">
          <label>
            Created By: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="createdby"
            value={formData.createdby}
            onChange={(e) => handleChange(e)}
            required
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label>
            Manufacturing Date: <span className="required">*</span>
          </label>
          <input
            type="date"
            name="manufacturingDate"
            value={formData.manufacturingDate}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Expiry Date: <span className="required">*</span>
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="upload__box">
          <div className="upload__btn-box">
            <label className="upload__btn">
              <p>Upload images</p>
              <input
                type="file"
                name="imageURL"
                value={formData.imageURL}
                multiple
                data-max_length="20"
                className="upload__inputfile"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="upload__img-wrap">
            {files.map((image, index) => (
              <div key={index} className="upload__img-box">
                <div
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(image)})`,
                  }}
                  data-number={index}
                  data-file={image.name}
                  className="img-bg"
                >
                  <div
                    className="upload__img-close"
                    onClick={() => handleImgClose(image)}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
