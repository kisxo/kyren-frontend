import React from "react";
// import "./AdminTab.css";
import AdminLayout from "./components/AdminLayout";
import AddTabForm from "./components/AddTabForm";
import AddProductToTab from "./components/AddProductToTab";

export default function AdminTab() {
  return (
    <AdminLayout>
      <h3 className="edit-tab-title">Add Tab</h3>

      <AddTabForm/>
      <AddProductToTab />
    </AdminLayout>
  );
}