import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { AddLink } from "./AddLink";
import Link from "next/link";
import useLocalStorage from "use-local-storage";
import { useRouter } from "next/router";

export const MovieCard = ({
  id,
  imgSource,
  name,
  link,
  locale,
  links,
  addMovieFunc,
  removeMovieFunc,
  updateTag,
  matches,
  defaultPage,
}) => {
  const router = useRouter();

  const { removeMovie, changeLink, watchlist } = useContext(GlobalContext);
  //const [showlist, setShowlist] = useLocalStorage("showlist", []);

  //const [selectedRegion, setSelectedRegion] = useLocalStorage("region");

  const [open, setOpen] = useState(false);
  const onOpenModal = () => {
    setOpen(true);
    setHasLoaded(true);

    router.push("/?title=" + name + "&region=" + locale);
  };
  const onCloseModal = () => {
    setOpen(false);
    router.push("");
  };
  // const removeMovieFromShowlist = (id) => {
  //   setShowlist(showlist.filter((movie) => movie[0] !== id));
  // };

  const [hasLoaded, setHasLoaded] = useState(false);

  // useEffect(() => {
  //   const getLocale = async () => {
  //     const templocale = await locale;
  //     router.push("/?title=" + name + "&region=" + templocale);
  //     setHasLoaded(true);
  //   };
  //   getLocale();
  // }, [locale]);

  const editLink = () => {
    let newLink = prompt("enter link: ");
    if (!newLink.includes("https://")) {
      newLink = "https://" + newLink;
    }
    changeLink(id, newLink);
    let storedMovie = showlist.find((o) => o[0] === id);
    showlist[showlist.indexOf(storedMovie)][3] = newLink;
  };

  console.log("matches? ", matches, " default? ", defaultPage);
  return (
    <>
      {1 == 1 ? (
        <div className="movie-card">
          <a href={link}>
            <div className="overlay"></div>
            <img src={imgSource} alt={`${name} Poster`} />
          </a>
          <div className="inner-card-controls">
            <>
              <button className="ctrl-btn" onClick={onOpenModal}>
                <i className="fa-fw fa fa-pen-square"></i>
              </button>
              <button className="ctrl-btn" onClick={() => removeMovieFunc(id)}>
                <i className="fa-fw fa fa-times"></i>
              </button>
              <Modal open={open} onClose={onCloseModal} center>
                {hasLoaded ? (
                  <AddLink
                    edit={true}
                    movie={[id, name, imgSource, link]}
                    closeModal={onCloseModal}
                    locale={locale}
                    links={links}
                    addMovieFunc={addMovieFunc}
                    removeMovieFunc={removeMovieFunc}
                    updateTag={updateTag}
                  />
                ) : (
                  <></>
                )}
              </Modal>
            </>
          </div>
          {/* <p>{name}</p> */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
