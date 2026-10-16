import { useEffect, useState } from "react";
import SlideShow from "../SlideShow/SlideShow";
import styles from "./DisplayRow.module.css";
import movieInstance from "../../Utility/MovieInstance";
import requests from "../../Utility/requesturls";

function DisplayRow() {
  const [movies, setMovies] = useState({
    trending: [],
    netflixOriginals: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: [],
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [
          trendingRes,
          netflixRes,
          topRatedRes,
          actionRes,
          comedyRes,
          horrorRes,
          romanceRes,
          docRes,
        ] = await Promise.all([
          movieInstance.get(requests.fetchTrending),
          movieInstance.get(requests.fetchNetflixOriginals),
          movieInstance.get(requests.fetchTopRatedMovies),
          movieInstance.get(requests.fetchActionMovies),
          movieInstance.get(requests.fetchComedyMovies),
          movieInstance.get(requests.fetchHorrorMovies),
          movieInstance.get(requests.fetchRomanceMovies),
          movieInstance.get(requests.fetchDocumentaries),
        ]);

        setMovies({
          trending: trendingRes.data.results,
          netflixOriginals: netflixRes.data.results,
          topRated: topRatedRes.data.results,
          action: actionRes.data.results,
          comedy: comedyRes.data.results,
          horror: horrorRes.data.results,
          romance: romanceRes.data.results,
          documentaries: docRes.data.results,
        });
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <SlideShow title="Trending" movies={movies.trending} />
      <SlideShow title="Popular on Netflix" movies={movies.netflixOriginals} />
      <SlideShow title="Action" movies={movies.action} />
    </div>
  );
}

export default DisplayRow;
