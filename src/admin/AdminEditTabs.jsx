import { useState, useEffect } from "react";
import React from "react";
import AdminLayout from "./components/AdminLayout.jsx";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { AppUrl } from "../utils/appData.js";
import TabList from "./components/TabList.jsx";
// import "./AdminEditTabs.css";
import ProductItemListTab from "./components/ProductItemListTab.jsx";

function AdminEditTabs() {
    const params = useParams();
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [product, setProduct] = useState();
    const [tabName, setTabName] = useState("");
    const [itemId, setItemId] = useState("");

    const getProduct = async () => {
        try {
            const res = await axios.post(AppUrl + "/api/product/get-product", {
                id: params.id,
            });
            if (res.data.success) {
                setProduct(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const handleInputChange = (e) => setName(e.target.value);
    const handleTabNameChange = (e) => setTabName(e.target.value);
    const handleItemIdChange = (e) => setItemId(e.target.value);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const newFileName =
                product["_id"] + "--" + name.replace(" ", "-") + ".jpeg";
            const renamedFile = new File([file], newFileName, {
                type: file.type,
            });
            setImageFile(renamedFile);
        } else {
            alert("Please select a valid image file.");
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) return alert("Please select an image.");
        if (!name) return alert("Please enter Group Name!");

        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("tabName", name);
        formData.append("productId", params.id);

        try {
            const response = await axios.post(
                AppUrl + "/api/tab/add/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (response.status === 201) {
                window.location.reload();
            }
        } catch (error) {
            alert("An error occurred while adding the group.");
        }
    };

    const handleTabItemSubmit = async (e) => {
        e.preventDefault();
        if (!tabName || !itemId)
            return alert("Please enter both Tab Name and Item ID!");

        console.log(tabName);
        console.log(itemId);
        console.log(params.id);

        const formData = new FormData();
        formData.append("tabName", tabName);
        formData.append("itemId", itemId);
        formData.append("productId", params.id);

        try {
            const response = await axios.post(
                AppUrl + "/api/tab/item-add/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.status === 201) {
                window.location.reload();
            }
            // alert("Group added to product successfully!");
        } catch (error) {
            console.log();
            alert(error.response.data.message);
        }
    };

    return (
        <AdminLayout title="Tab Edit">
            <div className="">
                <form className="add-group-form space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                        <div>
                            <label>Add Tab</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                className="input w-full"
                                value={name}
                                onChange={handleInputChange}
                                placeholder="Enter Tab name"
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Choose a Tab Icon</label>
                        </div>
                        <div>
                            <input
                                type="file"
                                className="input w-full"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add New Tab
                    </button>
                </form>
                {product && <TabList product={product} />}

                <div className="item-group-add-container">
                    {/* <hr />
          <h3>Add Group to Product</h3>
          <hr /> */}
                    <form
                        className="add-group-form"
                        onSubmit={handleTabItemSubmit}
                    >
                        <input
                            type="text"
                            className="input w-full"
                            value={itemId}
                            onChange={handleItemIdChange}
                            placeholder="Enter Product ID"
                        />
                        <input
                            type="text"
                            className="input w-full"
                            value={tabName}
                            onChange={handleTabNameChange}
                            placeholder="Enter Tab Name"
                        />
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </form>
                </div>
                {product && <ProductItemListTab product={product} />}
            </div>
        </AdminLayout>
    );
}

export default AdminEditTabs;
