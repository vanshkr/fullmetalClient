const DetailsCard = ({ details }) => {
  return (
    <>
      {details?.role === "Main" ? (
        <div className='flex text-white md:m-2 m-1 lg:w-[44%] w-full bg-metalise md:p-2 p-1 rounded-md'>
          <div className='flex w-1/2 justify-start p-1'>
            <div className='md:w-14 md:h-14  w-10 h-10 mr-2'>
              <img
                className=' w-full h-full rounded-full'
                src={details?.character?.images?.jpg?.image_url}
              />
            </div>
            <div>
              <h2>{details?.character?.name}</h2>
              <p>Main</p>
            </div>
          </div>
          <div className='flex w-1/2 justify-end p-1'>
            <div>
              <h2>{details?.voice_actors?.[0]?.person?.name}</h2>
              <p>{details?.voice_actors?.[0]?.language}</p>
            </div>
            <div className=' md:w-14 md:h-14 w-10 h-10 ml-2'>
              <img
                className=' w-full h-full rounded-full'
                src={details?.voice_actors?.[0]?.person?.images?.jpg?.image_url}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DetailsCard;
