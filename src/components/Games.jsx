import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Games.css";
import { AppUrl } from "../utils/appData";

const GamesOld = (props) => {
  const navigate = useNavigate();
  const [products] = useState(props.productsList);

  const [category, setCategory] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const loadCategory = async (productsList) => {
    productsList?.map((item) => {
      //check if category is not null or undefined
      if (item?.category)
      {
        //do not add duplicate categories
        setCategory((prev) => 
          prev.includes(item?.category) ? prev : [...prev, item?.category]
        );
      }
    });
  };

  useEffect(() => {
    loadCategory(props.productsList);
    console.log(props);
  }, props);


  return (
    <div className="explore-products-container">
      <div className="categories-tabs">
        {category?.map((item, index) => {
          return (
            <div key={index} className={`category-tab-selector ${selectedCategory === item ? "active" : ''}`} onClick={ () => {setSelectedCategory(item);} }>
              {item}
            </div>
          );
        })}
      </div>
      
      <br />
      <div className="games-list">
        {products?.map((item, index) => {
          return (
            <>
              {selectedCategory === 'All' ? (
                <div key={index} className="game" onClick={() => navigate(`/product/${item?.name}`)} >
                <div className="top">
                  <img className="icon" src={`https://wurustore.in/${item?.image}`} alt={item?.name} />
                  <div className="right">
                    <div className="name">{item?.name}</div>
                  </div>
                  {item?.tag && (
                    <div className="category-container">
                      <span className="info">{item?.tag}</span>
                    </div>
                  )}
                </div>

                <div className="action">
                  <span>Buy Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                    <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                  </svg>
                </div>
              </div>
              ) : selectedCategory === item?.category &&
              (
                <div key={index} className="game" onClick={() => navigate(`/product/${item?.name}`)} >
                  <div className="top">
                    <img className="icon" src={`https://wurustore.in/${item?.image}`} alt={item?.name} />
                    <div className="right">
                      <div className="name">{item?.name}</div>
                    </div>
                    {item?.tag && (
                      <div className="category-container">
                        <span className="info">{item?.tag}</span>
                      </div>
                    )}
                  </div>

                  <div className="action">
                    <span>Buy Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                      <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                    </svg>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>

    </div>
  );
};

const Games = (props) => {
  const navigate = useNavigate();
  const [products] = useState(props.productsList);

  const [category, setCategory] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const loadCategory = async (productsList) => {
    productsList?.map((item) => {
      //check if category is not null or undefined
      if (item?.category)
      {
        //do not add duplicate categories
        setCategory((prev) => 
          prev.includes(item?.category) ? prev : [...prev, item?.category]
        );
      }
    });
  };

  useEffect(() => {
    loadCategory(props.productsList);
    console.log(props);
  }, props);

  return (
    <div className="explore-products-container">
      <div className="categories-tabs">
        {category?.map((item, index) => {
          return (
            <div key={index} className={`category-tab-selector ${selectedCategory === item ? "active" : ''}`} onClick={ () => {setSelectedCategory(item);} }>
              {item}
            </div>
          );
        })}
      </div>

      <br />
      <div className="games-list">
        {products?.map((item, index) => {
          return (
            <>
              {selectedCategory === 'All' ? (
                <ProductCard props={item}  key={index}/>
              ) : selectedCategory === item?.category &&
              (
                <ProductCard props={item} key={index}/>
              )}
            </>
          );
        })}
      </div>
    </div>
  )

  return (
    <div className="explore-products-container">
      <div className="categories-tabs">
        {category?.map((item, index) => {
          return (
            <div key={index} className={`category-tab-selector ${selectedCategory === item ? "active" : ''}`} onClick={ () => {setSelectedCategory(item);} }>
              {item}
            </div>
          );
        })}
      </div>
      
      <br />
      <div className="games-list">
        {products?.map((item, index) => {
          return (
            <>
              {selectedCategory === 'All' ? (
                <div key={index} className="game" onClick={() => navigate(`/product/${item?.name}`)} >
                <div className="top">
                  <img className="icon" src={`https://wurustore.in/${item?.image}`} alt={item?.name} />
                  <div className="right">
                    <div className="name">{item?.name}</div>
                  </div>
                  {item?.tag && (
                    <div className="category-container">
                      <span className="info">{item?.tag}</span>
                    </div>
                  )}
                </div>

                <div className="action">
                  <span>Buy Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                    <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                  </svg>
                </div>
              </div>
              ) : selectedCategory === item?.category &&
              (
                <div key={index} className="game" onClick={() => navigate(`/product/${item?.name}`)} >
                  <div className="top">
                    <img className="icon" src={`https://wurustore.in/${item?.image}`} alt={item?.name} />
                    <div className="right">
                      <div className="name">{item?.name}</div>
                    </div>
                    {item?.tag && (
                      <div className="category-container">
                        <span className="info">{item?.tag}</span>
                      </div>
                    )}
                  </div>

                  <div className="action">
                    <span>Buy Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                      <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                    </svg>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>

    </div>
  );
};

const ProductCard = ({props}) => {
  const navigate = useNavigate();
  return (
    <div className="product-card" onClick={() => navigate(`/product/${props?.name}`)}>
      <img className="icon" src={AppUrl + `/${props?.image}`} alt={props?.name} />
      <div className="product-name">{props?.name}</div>
      {props?.tag && (
        <span className="product-tag">{props?.tag}</span>
      )}
    </div>
  )
}
export default Games;