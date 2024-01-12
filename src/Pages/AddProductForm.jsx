import React, { useState } from "react";
import axios from "axios";
import "../Assets/Styles/AddProductForm.css";
import "../Assets/Styles/Style.scss";

const AddProductForm = () => {
  // const [formDatas, setProducts] = useState([{}]);
  // const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    productId: "",
    productCategory: "",
    productName: "",
    productType: "",
    productBrand: "",
    description: "",
    availableStockQty: 0,
    availablePackQty: 0,
    packetweight: "",
    mrp: 0,
    offerPrice: "",
    createdby: "",
    manufactureDate: "",
    expiryDate: "",
  });

  const handleInputChange = (e) => {
    const { name, type, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? prevData[name] : value,
    }));
  };

  const handleFilesChange = (e) => {
    const { name, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files, // store all selected files in the state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();

      // Append all fields to the formData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "files") {
          // Append each file individually
          for (let i = 0; i < value.length; i++) {
            formDataToSubmit.append("files", value[i]);
          }
        } else {
          formDataToSubmit.append(key, value);
        }
      });

      // Make a POST request to your API endpoint with formData
      const response = await axios.post(
        "https://tekisky-mart.onrender.com/admin/addproduct",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response
      console.log("Server Response:", response.data);

      // Reset the form after successful submission
      setFormData({
        productId: "",
        productCategory: "",
        productName: "",
        productType: "",
        productBrand: "",
        description: "",
        availableStockQty: 0,
        availablePackQty: 0,
        packetweight: "",
        mrp: 0,
        offerPrice: "",
        createdby: "",
        manufactureDate: "",
        expiryDate: "",
        files: [], // reset the files array
      });
    } catch (error) {
      // Handle errors
      console.error("Error submitting form:", error.message);
      // ... rest of the error handling
    }
  };

  console.log("formdata", formData);

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
            onChange={handleInputChange}
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

        {/* <div className="form-group">
          <label>
            Product ID: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleInputChange}
            required
            maxLength="50"
          />
        </div> */}

        <div className="form-group">
          <label>
            Product Name: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select Product type
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
            maxLength="200"
          />
        </div>

        {/* {formDatas.map((formData, index) => ( */}
        <div className="add-formData-container">
          <div className="form-group">
            <label>
              Available Stock Quantity: <span className="required">*</span>
            </label>
            <input
              type="number"
              name="availableStockQty"
              value={formData.availableStockQty}
              onChange={handleInputChange}
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
              value={formData.packetweight}
              onChange={handleInputChange}
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
              value={formData.availablePackQty}
              onChange={handleInputChange}
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
              value={formData.mrp}
              onChange={handleInputChange}
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
              value={formData.offerPrice}
              onChange={handleInputChange}
              required
              min="0"
            />
          </div>

          {/* <button type="button" className="delete" onClick={() => handleDeleteProduct(index)}>
              Delete Product
            </button> */}
        </div>
        {/* ))} */}

        {/* <button type="button" className="add" onClick={handleAddProduct}>
          Add Product
        </button> */}

        <div className="form-group">
          <label>
            Created By: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="createdby"
            value={formData.createdby}
            onChange={handleInputChange}
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
            name="manufactureDate"
            value={formData.manufactureDate}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="upload__box">
  <div className="upload__btn-box">
    <label className="upload__btn">
      <p>Upload images</p>
      <input
        type="file"
        name="files"
        multiple
        data-max_length="20"
        className="upload__inputfile"
        onChange={handleFilesChange}
      />
    </label>
  </div>

  <div className="upload__img-wrap">
    {formData.files && formData.files.length > 0 && formData.files.map((image, index) => (
      <div key={index} className="upload__img-box">
        <div
          style={{
            backgroundImage: `url(${URL.createObjectURL(image)})`,
          }}
          data-number={index}
          data-file={image.name}
          className="img-bg"
        ></div>
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
