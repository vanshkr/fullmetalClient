import "swiper/css";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import useFilterArr from "../customhooks/useFilterArr";
import { trends } from "../assets/constants";
import "./styles.css";

const Trending = () => {
  const value = {
    type: "trending",
    limit: 10,
  };
  const newArr = useFilterArr(value);
  // const newArr = trends;
  return (
    <>
      <div className='max-w-full flex flex-col mt-6 '>
        <div className='w-full flex flex-col justify-start items-center overflow-hidden'>
          <div className=' justify-start flex flex-col'>
            <Swiper className='swiperTrending' slidesPerView='auto'>
              {newArr?.map((anime, i) => (
                <SwiperSlide
                  style={{ width: "25%", height: "auto", paddingLeft: "15px" }}
                  className='animate-slideright md:mx-2 swiperSliderTrending'
                  key={anime?.id}
                >
                  <div className='w-full h-full flex '>
                    <div className='bg-gradient-to-t from-black to-greyHeather w-10 h-full flex flex-col justify-end'>
                      <div
                        className='text-nonChalantWhite mb-4 md:text-xl text-sm'
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: "1",
                          overflow: "hidden",
                          writingMode: "vertical-rl",

                          transform: "rotate(180deg)",
                        }}
                      >
                        {anime?.title}
                      </div>
                      <div className='text-drySeedlings md:text-3xl text-xl  font-bold'>
                        {i == 9 ? i + 1 : "0" + (i + 1)}
                      </div>
                    </div>
                    <div className='md:w-[80%] w-[100%] h-full cursor-pointer '>
                      <Link to={`/anime/${anime?.id}/full`}>
                        <img
                          src={anime?.img?.[0]}
                          title={anime?.title}
                          className='w-full h-full object-cover '
                        />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
