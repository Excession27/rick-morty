const Card = (props: { image: string; name: string }) => {
  return (
    <div className="flex flex-col rounded-lg bg-white">
      <img className="rounded-t-lg" src={props.image} alt="" />
      <h2 className="name p-4 font-bold">{props.name}</h2>
    </div>
  );
};

export default Card;
