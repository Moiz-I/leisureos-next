import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ResultCard } from "./ResultCard";
import { GlobalContext } from "../context/GlobalState";

import { AddLink } from "./AddLink";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Search(props) {
  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const [isSelected, setIsSelected] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState("");

  const { selectedCountry } = useContext(GlobalContext);

  const handleSelect = (returnedMovie) => {
    //console.log("selected");

    setIsSelected(true);
    setSelectedMovie(returnedMovie);
    router.push("/?title=" + returnedMovie[1] + "&region=" + props.locale);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${query}`
        );
        setMovies(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="search-container">
      {isSelected ? (
        <AddLink
          edit={false}
          movie={selectedMovie}
          closeModal={props.closeModal}
          locale={props.locale}
          links={props.links}
          addMovieFunc={props.addMovie}
          removeMovieFunc={props.removeMovie}
          updateTag={props.updateTag}
        />
      ) : (
        <>
          <div className="search">
            <input
              type="text"
              placeholder={"Search for a show"}
              className={"input"}
              onChange={(event) => setQuery(event.target.value)}
              value={query}
            />
          </div>
          <div className="results">
            {movies.map((movie) => (
              <ResultCard movie={movie} onSelectShow={handleSelect} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
