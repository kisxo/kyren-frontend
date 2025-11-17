import { AppUrl } from '../../utils/appData';
import "./ProductItemListTab.css"

const ProductItemListTab = ({product}) => {
  console.log(product)
  var img = {}
  product.groups.forEach((group) => {
      img[group.name] = group.image
  });

  return (
    <div>
      <div className='item-row'>
        <span>Item Card</span>
        <span>Id</span>
        <><span>Group Name</span><span>Res Price</span></>
      </div>
      {product?.cost?.map((item, index) => {
              return (
                <div className='item-row overflow-x-scroll'>
                  <ProductCard {...item}/>
                  {/* <ItemCard className="item-img" {...item}/> */}
                  <span className='id' >{item.id}</span>
                  {item.groupName ? (
                    <span>{item.groupName}</span>
                  ) : (
                    <span>all</span>
                  )}
                   
                   <span>{item.resPrice}</span>
                </div>
              );
        })}
    </div>
  )
}

export default ProductItemListTab;

const ProductCard = ({amount, tabImage}) => {

  if(tabImage)
  {
    return (
      <div className="group-item-card" >
        <img className="top" src={AppUrl + `/${tabImage}`}  alt="Card image cap"/>
        <div className="body">
          <p className="text">{amount}</p>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="group-item-card">
        <img className="top" src={AppUrl + "/media/tabIcon/default.png"} alt="Card image cap"/>
        <div className="body">
          <p className="text">{amount}</p>
        </div>
      </div>
    );
  }
}