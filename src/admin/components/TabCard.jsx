import React from "react";

function TabCard() {
    return (
        <div
            className=""
        >
            <div className="" style={{ width: "18rem" }}>
                <img
                    className="card-img-top"
                    src="https://staticg.sportskeeda.com/editor/2023/07/fde0c-16888913542123-1920.jpg?w=640"
                    alt="Card image cap"
                />
                <div className="card-body">
                    <h5 className="card-title">Tab Name</h5>
                    <p className="card-text">Group Names.</p>
                    <a href="#" className="btn btn-danger">
                        Delete Tab
                    </a>
                </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
                <img
                    className="card-img-top"
                    src="https://staticg.sportskeeda.com/editor/2023/07/fde0c-16888913542123-1920.jpg?w=640"
                    alt="Card image cap"
                />
                <div className="card-body">
                    <h5 className="card-title">Tab Name</h5>
                    <p className="card-text">Group Names.</p>
                    <a href="#" className="btn btn-danger">
                        Delete Tab
                    </a>
                </div>
            </div>
        </div>
    );
}

export default TabCard;
