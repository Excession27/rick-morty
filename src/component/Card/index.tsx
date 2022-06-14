import React from "react";

const Card = (props: { image: string; name: string }) => {
  return (
    <div className="w-100 h-100 flex flex-col rounded-lg bg-white">
      <img className="rounded-t-lg" src={props.image} alt="" />
      <h2 className="name p-4 font-bold">{props.name}</h2>
    </div>
  );
};

export default Card;
