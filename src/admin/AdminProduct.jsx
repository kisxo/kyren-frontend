import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";
import "./AdminUsers.css";
import { AppUrl } from "../utils/appData";

const AdminProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(null);

    // delete product
    const handleDeleteProduct = async (id, image) => {
        const shouldDelete = window.confirm("Are you sure to delete?");
        if (shouldDelete) {
            try {
                const res = await axios.post(
                    AppUrl + "/api/product/delete-product",
                    {
                        id,
                        image,
                    },
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                if (res.data.success) {
                    message.success(res.data.message);
                    getAllProducts();
                } else {
                    message.error(res.data.message);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            // User clicked "Cancel" or closed the dialog
        }
    };

    // Search
    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setFilteredUsers(null);
        } else {
            const filtered = products.filter((product) => {
                return product?.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            });
            setFilteredUsers(filtered);
        }
    };
    // get all products
    const getAllProducts = async () => {
        try {
            const res = await axios.get(
                AppUrl + "/api/product/get-all-products"
            );
            if (res.data.success) {
                setProducts(res.data.data.reverse());
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleSearch(); // Call handleSearch in useEffect
    }, [searchQuery, products]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const filterProduct =
        filteredUsers && filteredUsers ? filteredUsers : products;
    return (
        <AdminLayout title="Products">
            <div className="admin-users-container">
                <button
                    className="btn btn-soft"
                    onClick={() => navigate("/admin-add-product")}
                >
                    Add New
                </button>
                <hr />
                <div className="table-container">
                    <div className="tools">
                        <div className="form-fields">
                            {/* <SearchIcon className="text-dark me-2" /> */}
                            <input
                                className="mb-4"
                                type="search"
                                name="search"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <table className="table user-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterProduct?.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img
                                                src={
                                                    AppUrl +
                                                    `/${product?.image}`
                                                }
                                                alt=""
                                            />
                                        </td>
                                        <td>
                                            <small>{product?.name}</small>
                                        </td>
                                        <td>
                                            <small>{product?.stock}</small>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                {/* <EditIcon
                          onClick={() =>
                            navigate(`/admin-edit-product/${product?._id}`)
                          }
                        /> */}
                                                {/* <DeleteIcon
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleDeleteProduct(product?._id, product?.image)
                          }
                          className="text-danger"
                        /> */}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="pagination"></div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProduct;
