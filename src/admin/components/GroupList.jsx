import React from 'react'
import "./GroupList.css"
import axios from "axios";
import { AppUrl } from '../../utils/appData';

async function deleteGroup(e){
  const shouldDelete = window.confirm("Are you sure to delete?");
  
  if(!shouldDelete)
  {
    return
  }

  const groupName = e.target.attributes["data-group-name"].nodeValue
  const productId = String(e.target.attributes["data-product-id"].nodeValue)

  console.log(groupName, productId)

  const formData = new FormData();
  formData.append("groupName", groupName);
  // console.log(productId)
  formData.append("productId", productId);
  try {
      const response = await axios.delete(AppUrl + "/api/group/", {
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

const GroupList = ({product}) => {
  
  return (
    <div className='group-list-container'>
    <span className='group-list-title'>Available Groups for {product.name}</span>
    <div className='group-list'>
        {product.groups.map((group) => (
            <div className='group'>
                <img src={AppUrl + `/${group.image}`} style={{height:"50px",width:"50px"}} alt="" />
                <span >{group["name"]}</span>
                <button className='group-delete btn btn-danger' type='button' data-group-name={group['name']} data-product-id={product['_id']} onClickCapture={deleteGroup}>
                  Delete
                </button>
            </div>
        ))}
    </div>
    </div>
  )
}


export default GroupList;