import "./ItemCard.css";
import { AppUrl } from "../utils/appData";


const ItemCard =  ({ amount, image, price}) => {
  // if(image) 
  // {
  //   return (
  //     <div className="item-card">
  //       <img src={`https://wurustore.in/${image}`} alt="" />
  //       {/* <img src="https://wurustore.in/media/groupIcon/default.png" alt="" /> */}
  //       <div>{amount}</div>
  //     </div>
  //   );
  // }
  // else{
  //   return (
  //     <div className="item-card">
  //       {/* <img src={`https://wurustore.in/${image}`} alt="" /> */}
  //       <img src="https://wurustore.in/media/groupIcon/default.png" alt="" />
  //       <div>{amount}</div>
  //     </div>
  //   );
  // }

    if(image) 
  {
    return (
      <div className="item-card" >
        <img className="card-img-top" src={AppUrl + `/${image}`}  alt="Card image cap"/>
        <p className="card-text">{amount}</p>
        <div className="card-price flex flex-col pb-4">
          <p className="price">&#8377;{price}</p>
          <p className="cost">&#8377;{Math.ceil(price*1.05)}</p>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="item-card" >
        <img className="card-img-top" src={AppUrl + "/media/groupIcon/default.png"} alt="Card image cap"/>
        <p className="card-text">{amount}</p>
        <div className="card-price flex flex-col pb-4">
          <p className="price">&#8377;{price}</p>
          <p className="cost">&#8377;{Math.ceil(price*1.05)}</p>
        </div>
      </div>
    );
  }
  
}

export default ItemCard;