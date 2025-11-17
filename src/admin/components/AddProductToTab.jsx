import React, { useState } from 'react'
// import "./AddProductToTab.css"
import axios from 'axios';
function AddProductToTab() {
      const [TabName, setTabName] = useState("");
      const [itemId, setItemId] = useState("");

    const handleItemIdChange = (e) => setItemId(e.target.value);
    const handleTabNameChange = (e) => setTabName(e.target.value);

    const handleGroupItemSubmit = async (e) => {
        e.preventDefault();
        if (!TabName || !itemId) return alert("Please enter both Tab Name and Product ID!");
        const formData = new FormData();
        formData.append("TabName", TabName);
        formData.append("itemId", itemId);
    
        try {
          const response = await axios.post("API", formData, {
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
          alert(error.response.data.message);
        }
      };
  return (
    <div className='add-product-to-tab-container'>
       <form className="add-group-form"  onSubmit={handleGroupItemSubmit}>
            <input type="text" className="mt-2 input-group-text w-100" value={itemId} onChange={handleItemIdChange} placeholder="Enter Product ID" />
            <input type="text" className="imt-2 input-group-text w-100" value={TabName} onChange={handleTabNameChange} placeholder="Enter Tab Name"/>
            <button type="submit" className="btn btn-primary">Add to Tab</button>
          </form>
    </div>
  )
}

export default AddProductToTab