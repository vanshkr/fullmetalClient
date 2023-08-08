import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaPlayCircle, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  useGetAnimeDetailsQuery,
  useGetActorsDetailsQuery,
} from "../redux/services/jikanApi";
import { add, remove } from "../redux/features/watchlistSlice";
import { AnimeDetailsCommon } from "../components";
import useRelatedArr from "../customhooks/useRelatedArr";

import { options } from "../assets/constants";
import { useCreateListMutation } from "../redux/services/backendApi";

const AnimeDetails = () => {
  const { animeId: id } = useParams();
  const result = useSelector((state) => state.userAuth.userData);
  const watchlist = useSelector((state) => state.watchlist);
  const profile = localStorage.getItem("profile");

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const {
    data: animeDetailsData,
    refetch: animeDetailsRefetch,
    status: animeDetailsStatus,
  } = useGetAnimeDetailsQuery(id, {
    skip: false,
  });
  const [createList] = useCreateListMutation();
  const arr = animeDetailsData?.data?.relations;
  const newArr = useRelatedArr(arr);
  const {
    data: value,
    actorsStatus,
    refetch: actorsFetch,
  } = useGetActorsDetailsQuery(id, {
    skip: false,
  });
  const imgUrl = animeDetailsData?.data?.images?.webp?.small_image_url;
  const genre = animeDetailsData?.data?.genres.map((genres) => genres.name);
  const studios = animeDetailsData?.data?.studios?.[0]?.name;
  const producers = animeDetailsData?.data?.producers.map(
    (producers) => producers.name
  );
  const synopsis = animeDetailsData?.data?.synopsis;
  const slicedSynopsis = synopsis?.slice(0, 300);
  const restSlicedSynopsis = synopsis?.slice(300);
  const [selectedOption, setSelectedOption] = useState(() => {
    let option = "";
    for (const key in watchlist) {
      if (watchlist[key].includes(id)) {
        return key;
      }
    }
    return option;
  });
  const refOption = useRef("");
  const [isEditing, setIsEditing] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let timeoutId;
    if (actorsStatus !== "fulfilled" && value === undefined) {
      timeoutId = setTimeout(() => {
        actorsFetch(id);
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [actorsStatus, value]);

  useEffect(() => {
    let timeoutId;
    if (animeDetailsStatus !== "fulfilled" && animeDetailsData === undefined) {
      timeoutId = setTimeout(() => {
        animeDetailsRefetch(id);
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [animeDetailsData, animeDetailsStatus]);
  const handleAdd = useCallback(
    (category, item) => dispatch(add({ category, item })),
    [dispatch]
  );

  const handleRemove = useCallback(
    (category, item) => dispatch(remove({ category, item })),
    [dispatch]
  );

  const handleOptionChange = (option) => {
    refOption.current = option;
    setSelectedOption(option);
    setIsEditing(false);
  };

  const handleRemoveOption = () => {
    refOption.current = "";
    setSelectedOption("");
    setIsEditing(false);
  };

  const handleButtonClick = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.id !== "watch-button" &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const prevOption = selectedOption?.replace(/\s/g, "")?.toLowerCase();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Your code to be executed before navigating away or reloading

      createList([{ option: refOption.current, id }, result?.id]);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Cleanup function to remove the listener when the component is unmounted
      window.removeEventListener("beforeunload", handleBeforeUnload);

      createList([{ option: refOption.current, id }, result?.id]);
    };
  }, [location]);
  return (
    <div className='md:flex-row flex-col bg-stretchLimo h-fit w-full'>
      <div className='h-full'>
        <div className='h-full w-full relative'>
          <div className='h-full absolute inset-0 overflow-hidden'>
            <div
              className='bg-cover bg-no-repeat bg-center h-full w-[480px]'
              style={{
                backgroundImage: `url(${animeDetailsData?.data?.images?.webp?.large_image_url})`,
                filter: "blur(20px)",
                opacity: "0.5",
                width: "100%",
              }}
            ></div>
          </div>
          <div className='grid md:grid-cols-10 text-white relative'>
            <div className='xl:col-span-2 md:col-span-3'>
              <div className='md:top-20 top-10 mx-auto relative xl:w-56 md:w-48 w-44'>
                <div className='w-full h-full'>
                  <img
                    className='absolute object-cover'
                    src={animeDetailsData?.data?.images?.webp?.image_url}
                  />
                </div>
              </div>
            </div>
            <div className='xl:col-span-6 md:col-span-7 mt-96 md:mt-20 min-h-[150px] md:min-h-[450px]'>
              <div>
                <div className='text-justify'>
                  <div className='text-center text-3xl md:text-4xl'>
                    {animeDetailsData?.data?.titles?.[0]?.title}
                  </div>
                  <div className='m-10 flex flex-col gap-y-6 md:flex-row justify-center font-bold'>
                    <button className='bg-drySeedlings text-black py-2 px-5 rounded-full mx-auto md:mr-4'>
                      <Link
                        className='flex justify-center items-center'
                        to={`/anime/${id}/episodes`}
                      >
                        <FaPlayCircle className='mr-2 text-xl md:text-2xl' />
                        <p className='text-md md:text-lg'>Watch Now</p>
                      </Link>
                    </button>

                    <div className='relative inline-block mx-auto text-left'>
                      <button
                        className={`bg-white text-black py-2 px-5 rounded-full mx-auto `}
                        onClick={handleButtonClick}
                        disabled={profile ? false : true}
                      >
                        <span className='flex justify-center items-center'>
                          <FaPlus className='mr-2 text-xl md:text-2xl' />
                          <p id='watch-button' className='text-md md:text-lg'>
                            {selectedOption ? "Edit Watchlist" : "Add to List"}
                          </p>
                        </span>
                      </button>
                      {isEditing && (
                        <div
                          ref={dropdownRef}
                          className='origin-top-right absolute right-0 mt-2 w-full rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                        >
                          <div
                            className='py-1'
                            role='menu'
                            aria-orientation='vertical'
                          >
                            {options.map((option) => (
                              <button
                                className={`${
                                  selectedOption === option
                                    ? "bg-gray-200 "
                                    : ""
                                }  block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-200`}
                                role='menuitem'
                                onClick={() => {
                                  const value = option
                                    ?.replace(/\s/g, "")
                                    ?.toLowerCase();
                                  if (
                                    !prevOption ||
                                    prevOption !== selectedOption
                                  ) {
                                    prevOption && handleRemove(prevOption, id);
                                    handleAdd(value, id);
                                    handleOptionChange(option);
                                  }
                                }}
                                key={option}
                              >
                                {option}
                              </button>
                            ))}

                            {selectedOption && (
                              <button
                                className='block px-4 py-2 text-sm text-red-700 w-full text-left'
                                role='menuitem'
                                onClick={() => {
                                  handleRemove(prevOption, id);
                                  handleRemoveOption();
                                }}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='my-14 mx-10 hidden md:block'>
                    {slicedSynopsis}
                    {visible ? restSlicedSynopsis : "... "}
                    <span
                      className='cursor-pointer'
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? " -Less" : " +More"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-[rgba(37,38,41,0.3)] xl:col-span-2 md:col-span-10 p-5 py-10 relative'>
              <div className='relative xl:top-14 mb-10'>
                <div className='text-white'>
                  <div className='md:hidden block h-36 mb-10'>
                    <h2 className='mb-2'>Overview:</h2>
                    <p className='overflow-y-scroll h-28 text-justify'>
                      {synopsis}
                    </p>
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Japanese:</span>{" "}
                    {animeDetailsData?.data?.title_japanese}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Aired:</span>{" "}
                    {animeDetailsData?.data?.aired?.["string"]}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Duration:</span>{" "}
                    {animeDetailsData?.data?.duration}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Status:</span>{" "}
                    {animeDetailsData?.data?.status}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Rank:</span>{" "}
                    {animeDetailsData?.data?.rank}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>MAL Score:</span>{" "}
                    {animeDetailsData?.data?.score}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Favorites:</span>{" "}
                    {animeDetailsData?.data?.favorites}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Genres:</span>{" "}
                    {genre?.join(", ")}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Studios:</span> {studios}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Producers:</span>{" "}
                    {producers?.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          <div className='w-full'>
            <AnimeDetailsCommon
              newArr={newArr}
              path={location?.pathname}
              value={value}
              imgUrl={imgUrl}
              data={animeDetailsData}
            />
          </div>
        }
      </div>
    </div>
  );
};

export default AnimeDetails;
