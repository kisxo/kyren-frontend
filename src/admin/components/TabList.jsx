import React from 'react'
import "./TabList.css"
import axios from "axios";
import { AppUrl } from '../../utils/appData';

async function deleteTab(e){
  const shouldDelete = window.confirm("Are you sure to delete?");
  
  if(!shouldDelete)
  {
    return
  }

  const tabName = e.target.attributes["data-tab-name"].nodeValue
  const productId = String(e.target.attributes["data-product-id"].nodeValue)

  console.log(tabName, productId)

  const formData = new FormData();
  formData.append("tabName", tabName);
  // console.log(productId)
  formData.append("productId", productId);
  try {
      const response = await axios.delete(AppUrl + "/api/tab/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formData,
    });
    if(response.status === 204)
    {
      window.location.reload()
    }
  } catch (error) {
    console.log()
    alert(error.response.data.message);
  }
}

const TabList = ({product}) => {
  
  return (
    <div className='group-list-container'>
    <span className='group-list-title'>Available Tabs for {product.name}</span>
    <div className='group-list'>
        {product.tabs.map((tab) => (
            <div className='group'>
                <img src={AppUrl + `/${tab.image}`} style={{height:"50px",width:"50px"}} alt="" />
                <span >{tab["name"]}</span>
                <button className='group-delete btn btn-danger' type='button' data-tab-name={tab['name']} data-product-id={product['_id']} onClickCapture={deleteTab}>
                  Delete
                </button>
            </div>
        ))}
    </div>
    </div>
  )
}


export default TabList;