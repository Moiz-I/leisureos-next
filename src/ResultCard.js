import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import blank from "../public/blank.jpg";
import Image from "next/image";
import useLocalStorage from "use-local-storage";

export const ResultCard = (props) => {
  const [showlist, setShowlist] = useLocalStorage("showlist", []);

  const movie = props.movie;
  const { addMovieToWatchlist, watchlist } = useContext(GlobalContext);

  const isAdded = (id) => {
    let storedMovie = showlist.find((o) => o[0] === id);
    const alreadyAdded = storedMovie ? true : false;

    return alreadyAdded;
  };
  const imgSource = movie.show.image?.medium ? movie.show.image.medium : blank;

  const handleClick = (event) => {
    const nameValue = event.target.attributes.valuename.value;
    const imgValue = event.target.attributes.valueimage.value;
    const idValue = event.target.attributes.valueid.value;
    if (isAdded(idValue) == false) {
      // let link = prompt("enter link: ");
      // if (!link.includes("https://")) {
      //   link = "https://" + link;
      // }
      const movie = [idValue, nameValue, imgValue];
      //console.log("the show selected: ", nameValue);
      props.onSelectShow(movie);
      //props.closeModal();
      // addMovieToWatchlist(movie);
    } else {
      alert("Already in your list!");
    }
  };

  return (
    <button
      type="button"
      className="movie-button"
      disabled={isAdded(movie.show.id)}
      valueid={movie.show.id}
      valuename={movie.show.name}
      valueimage={imgSource}
      key={movie.show.id}
    >
      <div
        className="movie-details"
        onClick={handleClick}
        valueid={movie.show.id}
        valuename={movie.show.name}
        valueimage={imgSource}
        disabled={isAdded(movie.show.id)}
      >
        <img
          src={imgSource}
          valueid={movie.show.id}
          valuename={movie.show.name}
          valueimage={imgSource}
        />
        <p
          valueid={movie.show.id}
          valuename={movie.show.name}
          valueimage={imgSource}
        >
          {movie.show.name}
        </p>
      </div>
    </button>
  );
};
