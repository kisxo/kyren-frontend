import React, { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import axios from "axios";
import { AppUrl } from "../utils/appData";

function AddBanner() {
  const [selectedBanner, setSelectedBanner] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleBannerChange = (e) => {
    setSelectedBanner(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBanner || !imageFile) {
      alert("Please select both a banner and an image.");
      return;
    }

    const newFileName = `${selectedBanner}.jpeg`;
    const renamedFile = new File([imageFile], newFileName, {
      type: imageFile.type,
    });

    const formData = new FormData();
    formData.append("image", renamedFile);
    formData.append("banner", selectedBanner);

    try {
      const response = await axios.post(
        AppUrl + "/api/media/add-banner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Banner uploaded successfully!");
    } catch (error) {
      console.error("Error uploading banner:", error);
      alert("An error occurred while uploading the banner.");
    }
  };

  return (
    <AdminLayout>
      <div>
        <h2>Upload Banner [ Max 3 Mb ] [ Ratio 4:2 ]</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Select Banner Slot:</label>
            <select
              value={selectedBanner}
              onChange={handleBannerChange}
              style={{
                color: "black",
                padding: "8px",
                fontSize: "16px",
                width: "100%",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select a Banner</option>
              <option value="1">Banner 1</option>
              <option value="2">Banner 2</option>
              <option value="3">Banner 3</option>
              <option value="4">Banner 4</option>
              <option value="5">Banner 5</option>
            </select>
          </div>
          <div>
            <label>Choose Image File:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                padding: "8px",
                fontSize: "16px",
                width: "100%",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          
          {imagePreview && (
            <div style={{ marginBottom: "10px" }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100px", 
                  height: "auto",
                  marginRight: "10px",
                }}
              />
              <span style={{ fontSize: "14px", color: "#555" }}>
                {selectedBanner} (Selected Banner Name)
              </span>
            </div>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Add Banner
          </button>
        </form>
       
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Banners</h3>
          <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <h5>Banner 1</h5>
            <img
              src={AppUrl+'/media/banner/banner-1.jpeg'}
              alt="Banner-1"
              style={{
                width: "150px", 
                height: "auto",
                borderRadius: "4px",
              }}
            />
            <h5>Banner 2</h5>
              <img
              src={AppUrl+'/media/banner/banner-2.jpeg'}
              alt="Banner-2"
              style={{
                width: "150px", 
                height: "auto",
                borderRadius: "4px",
              }}
            />  
            <h5>Banner 3</h5><img
            src={AppUrl+'/media/banner/banner-3.jpeg'}
            alt="Banner-3"
            style={{
              width: "150px", 
              height: "auto",
              borderRadius: "4px",
            }}
          />  <h5>Banner 4</h5><img
          src={AppUrl+'/media/banner/banner-4.jpeg'}
          alt="Banner-4"
          style={{
            width: "150px", 
            height: "auto",
            borderRadius: "4px",
          }}
        />  <h5>Banner 5</h5><img
        src={AppUrl+'/media/banner/banner-5.jpeg'}
        alt="Banner-5"
        style={{
          width: "150px", 
          height: "auto",
          borderRadius: "4px",
        }}
      />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddBanner;