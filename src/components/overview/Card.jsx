import React from "react";

const Card = ({ title, amount }) => {
  return (
    <div className={`card ${title}_card`}>
      <div className="top">
        <h5 className="card_title">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h5>
        <button>details</button>
      </div>
      <p className="amount">${amount}</p>
    </div>
  );
};

export default Card;
