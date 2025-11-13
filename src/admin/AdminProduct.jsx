import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";
// import "./AdminUsers.css";
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
            <div className="">
                <div className="space-x-3 flex">
                    <label class="input">
                        <svg
                            class="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke-width="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            type="search"
                            name="search"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </label>
                    <button
                        className="btn btn-soft"
                        onClick={() => navigate("/admin-add-product")}
                    >
                        Add New
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterProduct?.map((product, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="hover:bg-base-200"
                                    >
                                        <td>
                                            <img
                                                className="size-25 object-contain aspect-square"
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
                                        <td className="space-x-4">
                                            <button
                                                class="btn btn-success"
                                                onClick={() => {
                                                    navigate(
                                                        `/admin-edit-product/${product?._id}`
                                                    );
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                class="btn btn-error"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    handleDeleteProduct(
                                                        product?._id,
                                                        product?.image
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProduct;
