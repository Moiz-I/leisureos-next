import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { AddLink } from "./AddLink";
import Link from "next/link";
import useLocalStorage from "use-local-storage";

export const MovieCard = ({
  id,
  imgSource,
  name,
  link,
  locale,
  links,
  addMovieFunc,
  removeMovieFunc,
}) => {
  const { removeMovie, changeLink, watchlist } = useContext(GlobalContext);
  //const [showlist, setShowlist] = useLocalStorage("showlist", []);

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // const removeMovieFromShowlist = (id) => {
  //   setShowlist(showlist.filter((movie) => movie[0] !== id));
  // };

  const editLink = () => {
    let newLink = prompt("enter link: ");
    if (!newLink.includes("https://")) {
      newLink = "https://" + newLink;
    }
    changeLink(id, newLink);
    let storedMovie = showlist.find((o) => o[0] === id);
    showlist[showlist.indexOf(storedMovie)][3] = newLink;
  };
  return (
    <div className="movie-card">
      <a href={link}>
        <div className="overlay"></div>
        <img src={imgSource} alt={`${name} Poster`} />
      </a>
      <div className="inner-card-controls">
        <>
          <Link href={"/?title=" + name}>
            <button className="ctrl-btn" onClick={onOpenModal}>
              <i className="fa-fw fa fa-pen-square"></i>
            </button>
          </Link>
          <button className="ctrl-btn" onClick={() => removeMovieFunc(id)}>
            <i className="fa-fw fa fa-times"></i>
          </button>
          <Modal open={open} onClose={onCloseModal} center>
            <AddLink
              edit={true}
              movie={[id, name, imgSource, link]}
              closeModal={onCloseModal}
              locale={locale}
              links={links}
              addMovieFunc={addMovieFunc}
              removeMovieFunc={removeMovieFunc}
            />
          </Modal>
        </>
      </div>
      {/* <p>{name}</p> */}
    </div>
  );
};
