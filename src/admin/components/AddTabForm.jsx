import React, { useState } from 'react';
// import './AddTabForm.css'
import axios from 'axios';
function AddTabForm() {
  const [TabName, setTabName] = useState("")
  const [imageFiles, setImageFile] = useState(null);


  const handleInputChange = (e) => setTabName(e.target.value);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    let newFileName = "Tab-Image.jpeg";

    if (imageFiles) {
      const nameParts = imageFiles.name.split("-");
      if (nameParts.length > 2) {
        const lastNumber = parseInt(nameParts[2].replace(".jpeg", ""));
        const nextNumber = isNaN(lastNumber) ? 2 : lastNumber + 1;
        newFileName = `Tab-Image-${nextNumber}.jpeg`;
      } else {
        newFileName = "Tab-Image-2.jpeg";
      }
    }

    const renamedFile = new File([file], newFileName, { type: file.type });
    setImageFile(renamedFile);
  } else {
    alert("Please select a valid image file.");
  }
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!TabName) return alert("Please enter Tab Name!");
    if (!imageFiles) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("image", imageFiles);
    formData.append("TabName", TabName);

    try {
      const response = await axios.post("", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if(response.status === 201)
      {
          window.location.reload()
      }
    } catch (error) {
      alert("An error occurred while adding the group.");
    }
  };
  
  return (
    <>
        <form className="add-group-form" onSubmit={handleFormSubmit}>
          <div>
            <label>Add New Tab</label>
            <input type="text" className="mt-2 input-group-text w-100" value={TabName} onChange={handleInputChange} placeholder="Enter Tab Name" />
            
          </div>
          <div>
            <label>Choose a Tab Icon</label>
            <input type="file" className="mt-2 form-control" onChange={handleFileChange} accept="image/*" />
          </div>
          <button type="submit" className="btn btn-primary">Add New Tab</button>
        </form>
    </>
  );
}

export default AddTabForm