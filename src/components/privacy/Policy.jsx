import React from "react";
import "./policy.css";

const Policy = ({ setPolicyOpen }) => {
    return (
        <div className="policy_container">
            <div className="title">
                <h4>Our policy?</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium facilis fugiat aut odit, ut praesentium natus labore possimus id. Porro, corrupti, </p>
            </div>
            <div className="footer">
                <button onClick={() => {
                    setPolicyOpen(false);
                }}>Accept</button>
                <button
                    onClick={() => {
                        setPolicyOpen(false);
                    }}
                    id="cancelBtn"
                >
                    Reject
                </button>
            </div>
        </div>
    );
}

export default Policy

