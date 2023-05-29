import { RiAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const DisplayCard = ({ id, animeName, url, path }) => {
  const clamped = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
  };

  return (
    <>
      {path !== undefined ? (
        <div className=' gap-6 flex p-3 w-full odd:bg-blackRibbon even:bg-napolean'>
          <div className=' w-16 h-16'>
            <img className='w-full h-full' src={url} />
          </div>
          <div className='w-80 h-8'>
            <p className='mb-2 my-2 '>
              <Link
                className='hover:text-drySeedlings text-white  text-md sm:text-lg'
                to={`/anime/${id}/full`}
                style={clamped}
              >
                {animeName}
              </Link>
            </p>
          </div>
          {path === "/" ? null : (
            <div className='text-white hover:text-drySeedlings text-2xl sm:text-4xl my-3  '>
              <RiAddFill />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default DisplayCard;
