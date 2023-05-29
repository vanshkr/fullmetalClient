import { useGetAnimeDetailsQuery } from "../redux/services/jikanApi";

const useRelatedArr = (arr) => {
  const newArr = [];
  arr?.map((items) => {
    items?.relation !== "Adaptation" &&
      items?.entry?.map((it) =>
        newArr.push({
          id: it.mal_id,
          animeName: it.name,
        })
      );
  });

  return newArr;
};
export default useRelatedArr;
