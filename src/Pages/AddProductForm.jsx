import React, { useState } from "react";
import axios from "axios";
import "../Assets/Styles/AddProductForm.css";
import "../Assets/Styles/Style.scss";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productCategory: "",
    productName: "",
    productType: "",
    productBrand: "",
    description: "",
    createdby: "",
    manufactureDate: "",
    expiryDate: "",
    productDetails: [
      {
        availableStockQty: 0,
        availablePackQty: 0,
        packetweight: "",
        mrp: 0,
        offerPrice: "",
      },
    ],
    files: [],
  });

  const handleInputChange = (e) => {
    const { name, type, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? Array.from(files) : value,
    }));
  };

  const handleFilesChange = (e) => {
    const { name, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: Array.from(files),
    }));
  };

  const handleProductDetailsChange = (index, field, fieldValue) => {
    setFormData((prevData) => {
      const updatedDetails = [...prevData.productDetails];
      updatedDetails[index] = {
        ...updatedDetails[index],
        [field]: fieldValue,
      };
      return {
        ...prevData,
        productDetails: updatedDetails,
      };
    });
  };
  


  const handleAddProduct = () => {
    setFormData((prevData) => ({
      ...prevData,
      productDetails: [
        ...prevData.productDetails,
        {
          availableStockQty: 0,
          availablePackQty: 0,
          packetweight: "",
          mrp: 0,
          offerPrice: "",
        },
      ],
    }));
  };

  const handleDeleteProduct = (index) => {
    const updatedProductDetails = [...formData.productDetails];

    updatedProductDetails.splice(index, 1);

    setFormData((prevData) => ({
      ...prevData,
      productDetails: updatedProductDetails,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formDataToSubmit = new FormData();

      formDataToSubmit.append("productCategory", formData.productCategory);
      formDataToSubmit.append("productName", formData.productName);
      formDataToSubmit.append("productType", formData.productType);
      formDataToSubmit.append("productBrand", formData.productBrand);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("createdby", formData.createdby);
      formDataToSubmit.append("manufactureDate", formData.manufactureDate);
      formDataToSubmit.append("expiryDate", formData.expiryDate);

      formData.productDetails.forEach((detail, index) => {
        formDataToSubmit.append(
          `productDetails[${index}][availablePackQty]`,
          detail.availablePackQty
        );
        formDataToSubmit.append(
          `productDetails[${index}][availableStockQty]`,
          detail.availableStockQty
        );
        formDataToSubmit.append(`productDetails[${index}][mrp]`, detail.mrp);
        formDataToSubmit.append(
          `productDetails[${index}][offerPrice]`,
          detail.offerPrice
        );
        formDataToSubmit.append(
          `productDetails[${index}][packetweight]`,
          detail.packetweight
        );
      });

      formData.files.forEach((file) => {
        formDataToSubmit.append("files", file);
      });

      const response = await axios.post(
        "https://tekisky-mart.onrender.com/admin/addProduct",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server Response:", response.data);

      setFormData({
        productCategory: "",
        productName: "",
        productType: "",
        productBrand: "",
        description: "",
        createdby: "",
        manufactureDate: "",
        expiryDate: "",
        productDetails: [
          {
            availableStockQty: 0,
            availablePackQty: 0,
            packetweight: "",
            mrp: 0,
            offerPrice: "",
          },
        ],
        files: [],
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {loading && (
        <div className="loader-container">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
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
            <option value="Safawi">Safawi</option>
            <option value="Sukkari">Sukkari</option>
            <option value="Ajwa">Ajwa</option>
            <option value="Amber">Amber</option>
            <option value="Mabroom">Mabroom</option>
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
        {formData.productDetails.map((detail, index) => (
          <div key={index} className="add-formData-container">
            <div className="form-group">
              <label>
                Available Stock Quantity: <span className="required">*</span>
              </label>
              <input
                type="number"
                name={`productDetails[${index}][availableStockQty]`}
                value={detail.availableStockQty}
                onChange={(e) =>
                  handleProductDetailsChange(
                    index,
                    "availableStockQty",
                    e.target.value
                  )
                }
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>
                Packet Weight: <span className="required">*</span>
              </label>
              <select
                name={`productDetails[${index}][packetweight]`}
                value={detail.packetweight}
                onChange={(e) =>
                  handleProductDetailsChange(
                    index,
                    "packetweight",
                    e.target.value
                  )
                }
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
                name={`productDetails[${index}][availablePackQty]`}
                value={detail.availablePackQty}
                onChange={(e) =>
                  handleProductDetailsChange(
                    index,
                    "availablePackQty",
                    e.target.value
                  )
                }
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
                name={`productDetails[${index}][mrp]`}
                value={detail.mrp}
                onChange={(e) =>
                  handleProductDetailsChange(
                    index,
                    "mrp",
                    e.target.value
                  )
                }
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
                name={`productDetails[${index}][offerPrice]`}
                value={detail.offerPrice}
                onChange={(e) =>
                  handleProductDetailsChange(
                    index,
                    "offerPrice",
                    e.target.value
                  )
                }
                required
                min="0"
              />
            </div>

            <button
              type="button"
              className="delete"
              onClick={() => handleDeleteProduct(index)}
            >
              Delete Product
            </button>
          </div>
        ))}
        <button type="button" className="add" onClick={handleAddProduct}>
          Add New
        </button>

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

          {/* <div className="upload__img-wrap">
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
          </div> */}
        </div>

        <div className="form-group">
          <button type="submit" disabled={loading}>
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
