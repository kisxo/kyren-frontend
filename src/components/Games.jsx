import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import "./Games.css";
import { AppUrl } from "../utils/appData";

const GamesOld = (props) => {
    const navigate = useNavigate();
    const [products] = useState(props.productsList);

    const [category, setCategory] = useState(["All"]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const loadCategory = async (productsList) => {
        productsList?.map((item) => {
            //check if category is not null or undefined
            if (item?.category) {
                //do not add duplicate categories
                setCategory((prev) =>
                    prev.includes(item?.category)
                        ? prev
                        : [...prev, item?.category]
                );
            }
        });
    };

    useEffect(() => {
        loadCategory(props.productsList);
        console.log(props);
    }, props);

    return (
        <div className=" bg-amber-400 p-5">
            <div className=" bg-red-600">
                {category?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`category-tab-selector text-neutral-700 ${
                                selectedCategory === item ? "active" : ""
                            }`}
                            onClick={() => {
                                setSelectedCategory(item);
                            }}
                        >
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
                            {selectedCategory === "All" ? (
                                <div
                                    key={index}
                                    className="game"
                                    onClick={() =>
                                        navigate(`/product/${item?.name}`)
                                    }
                                >
                                    <div className="top">
                                        <img
                                            className="icon"
                                            src={`https://wurustore.in/${item?.image}`}
                                            alt={item?.name}
                                        />
                                        <div className="right">
                                            <div className="name">
                                                {item?.name}
                                            </div>
                                        </div>
                                        {item?.tag && (
                                            <div className="category-container">
                                                <span className="info">
                                                    {item?.tag}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="action">
                                        <span>Buy Now</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-bag-heart-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                                        </svg>
                                    </div>
                                </div>
                            ) : (
                                selectedCategory === item?.category && (
                                    <div
                                        key={index}
                                        className="game"
                                        onClick={() =>
                                            navigate(`/product/${item?.name}`)
                                        }
                                    >
                                        <div className="top">
                                            <img
                                                className="icon"
                                                src={`https://wurustore.in/${item?.image}`}
                                                alt={item?.name}
                                            />
                                            <div className="right">
                                                <div className="name">
                                                    {item?.name}
                                                </div>
                                            </div>
                                            {item?.tag && (
                                                <div className="category-container">
                                                    <span className="info">
                                                        {item?.tag}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="action">
                                            <span>Buy Now</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-bag-heart-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                                            </svg>
                                        </div>
                                    </div>
                                )
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

    const [category, setCategory] = useState(["All"]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const loadCategory = async (productsList) => {
        productsList?.map((item) => {
            //check if category is not null or undefined
            if (item?.category) {
                //do not add duplicate categories
                setCategory((prev) =>
                    prev.includes(item?.category)
                        ? prev
                        : [...prev, item?.category]
                );
            }
        });
    };

    useEffect(() => {
        loadCategory(props.productsList);
        console.log(props);
    }, props);

    return (
        <div className="m-4 p-4 bg-neutral-900 space-y-4 rounded-md shadow" id="game-top-up">
            {/* <div className="flex gap-4 overflow-x-scroll text-nowrap">
        {category?.map((item, index) => {
          return (
            <div key={index} className={`px-6 py-2 rounded-full text-sm font-semibold ${selectedCategory === item ? "bg-purple-500 text-white" : 'bg-neutral-100 text-neutral-700'}`} onClick={ () => {setSelectedCategory(item);} }>
              {item}
            </div>
          );
        })}
      </div> */}
            <h2 className="text-2xl font-bold">Game Top Up</h2>
            <div className="grid grid-cols-2 md:grid-cols-4: lg:grid-cols-6 gap-4">
                {products?.map((item, index) => {
                    return (
                        <>
                            {selectedCategory === "All" ? (
                                <ProductCard props={item} key={index} />
                            ) : (
                                selectedCategory === item?.category && (
                                    <ProductCard props={item} key={index} />
                                )
                            )}
                        </>
                    );
                })}
            </div>
        </div>
    );
};

const ProductCard = ({ props }) => {
    const navigate = useNavigate();
    return (
        <div className="aspect-square relative rounded-lg overflow-hidden 
  bg-linear-to-br from-neutral-900 via-neutral-950 to-black
  border border-white/5
  shadow-[0_0_25px_rgba(147,51,234,0.05),0_0_50px_rgba(251,146,60,0.05),inset_0_0_20px_rgba(255,255,255,0.03)]
  hover:shadow-[0_0_35px_rgba(147,51,234,0.1),0_0_70px_rgba(251,146,60,0.1),inset_0_0_25px_rgba(255,255,255,0.05)]
  transition-all duration-700 ease-out"
            onClick={() => navigate(`/product/${props?.name}`)}
        >
            <img
                className="icon object-center object-cover h-full w-full"
                src={AppUrl + `/${props?.image}`}
                alt={props?.name}
            />

            <div className="absolute text-xs backdrop-blur-xs inset-x-1 bottom-1 text-center rounded py-1 border border-neutral-50/40">
              {props?.name}
            </div>

            {/* {props?.tag && (
        <span className="product-tag">{props?.tag}</span>
      )} */}
        </div>
    );
};
export default Games;
