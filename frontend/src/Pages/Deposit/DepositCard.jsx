const DepositCard = ({ name, image, handleCardEvent }) => {
  return (
    <div
      onClick={handleCardEvent ? handleCardEvent : () => {}}
      className="relative flex  flex-col justify-center bg-white cursor-pointer w-full md:w-60 min-h-36 rounded-lg p-6"
    >
      <div className="">
        <img
          className="rounded-inherit h-20 max-w-[140px]"
          src={image}
          alt={name}
        />
      </div>
      <div>
        <h4 className="text-gray-900 mt-1 text-lg font-semibold tracking-wide">
          {name}
        </h4>
      </div>
    </div>
  );
};

export default DepositCard;
