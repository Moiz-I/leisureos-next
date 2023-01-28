import React, { useEffect, useContext, useState, useCallback } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useRouter } from "next/router";
import { ReactTags } from "react-tag-autocomplete";

export const AddLink = ({
  movie,
  closeModal,
  edit,
  locale,
  links,
  addMovieFunc,
  removeMovieFunc,
  updateTag,
}) => {
  const [link, setLink] = useState("Loading..");
  const [customLink, setCustomLink] = useState("");
  //const [offers, setOffers] = useState([]);
  const [netflix, setNetflix] = useState("");
  const [prime, setPrime] = useState("");
  const [disney, setDisney] = useState("");
  const [bbc, setBBC] = useState("");
  const [hbo, setHBO] = useState("");
  const [crunchyroll, setCruchyroll] = useState("");
  const [nowtv, setNowtv] = useState("");

  const [tags, setTags] = useLocalStorage("tags", []);
  const countries = ["Afghanistan", "Albania", "Algeria"];
  const suggestions = tags.map((name, index) => ({
    value: index,
    label: name,
  }));
  const [selectedTags, setSelectedTags] = useState([]);
  const updateShowTags = (newTag) => {
    setSelectedTags([...selectedTags, newTag.value]);
    console.log(selectedTags);
  };
  const getTags = () => {
    const arr = [];
    for (const i in selected) {
      arr.push(selected[i].value);
    }
    console.log("arr: ", arr);
    return arr;
  };
  const [selected, setSelected] = useState([]);
  const onAdd = useCallback(
    (newTag) => {
      const fixedNewTag = { value: newTag.label, label: newTag.label };
      console.log("fixednewtag: ", fixedNewTag);
      console.log("newtag: ", newTag);

      setSelected([...selected, fixedNewTag]);
      updateTag(fixedNewTag);
      updateShowTags(fixedNewTag);
      console.log("newtag.value: ", newTag.label);
      console.log("newtag.label: ", newTag.label);
      console.log("selected: ", selected);
      console.log("selectedtags: ", selectedTags);
    },
    [selected]
  );
  const onDelete = useCallback(
    (tagIndex) => {
      setSelected(selected.filter((_, i) => i !== tagIndex));
    },
    [selected]
  );

  const { removeMovie, addMovieToWatchlist, watchlist } =
    useContext(GlobalContext);
  const addMovie = (event) => {
    const selectedLink = event.target.attributes.value.value;
    //.log("add mobie link: ", selectedLink);
    const movieWithLink = [
      movie[0],
      movie[1],
      movie[2],
      selectedLink,
      getTags() ? getTags() : [],
    ];
    if (edit) {
      console.log("EDITED");
      removeMovieFunc(movie[0]);
      addMovieFunc(movieWithLink);
    } else {
      addMovieFunc(movieWithLink);
    }
    console.log(movieWithLink);
    closeModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var clink = customLink;
    if (!clink.includes("https://")) {
      clink = "https://" + clink;
    }
    const movieWithLink = [
      movie[0],
      movie[1],
      movie[2],
      clink,
      getTags() ? getTags() : [],
    ];
    if (edit) {
      console.log("EDITED");
      removeMovieFunc(movie[0]);
      addMovieFunc(movieWithLink);
    } else {
      addMovieFunc(movieWithLink);
    }
    console.log(movieWithLink);
    closeModal();
  };

  useEffect(() => {
    const search = async () => {
      const linksarr = await links;
      //console.log("LINKS FROM ADDLINK pATH1", linksarr);
      var offers = linksarr.items[0].offers;
      //console.log("offers: ", offers);
      var someLinks = false;
      for (const i in offers) {
        var service = offers[i].package_short_name;
        const resultLink = offers[i].urls.deeplink_web
          ? offers[i].urls.deeplink_web
          : offers[i].urls.standard_web;

        //console.log("REsults link ", resultLink);

        switch (service) {
          case "nfx":
            console.log("netflix");
            setNetflix(resultLink);
            someLinks = true;
            break;
          case "amp":
            console.log("prime");
            setPrime(resultLink);
            someLinks = true;
            break;
          case "dnp":
            console.log(resultLink);
            setDisney(resultLink);
            someLinks = true;
            break;
          case "bbc":
            console.log(resultLink);
            setBBC(resultLink);
            someLinks = true;
            break;
          case "hbo":
            console.log("hbo");
            setHBO(resultLink);
            someLinks = true;
            break;
          case "cru":
            console.log("crunchyroll");
            setCruchyroll(resultLink);
            someLinks = true;
            break;
          case "now":
            console.log("nowtv");
            setNowtv(resultLink);
            someLinks = true;
            break;
          default:
            break;
        }
      }
      if (!someLinks) {
        setLink("No links found");
      } else {
        setLink("");
      }
    };
    //console.log("before search, links are: ", links);
    if (links) {
      search();
    }
  }, [links]);

  return (
    <div className="links-container">
      <p>{movie[1]}</p>
      {link != "" && <p>{link}</p>}
      {netflix != "" && (
        <button onClick={addMovie} value={netflix} className="netflix">
          netflix
        </button>
      )}
      {prime != "" && (
        <button onClick={addMovie} value={prime} className="prime">
          prime
        </button>
      )}
      {disney != "" && (
        <button onClick={addMovie} value={disney} className="disney">
          disney
        </button>
      )}
      {bbc != "" && (
        <button onClick={addMovie} value={bbc} className="bbc">
          bbc
        </button>
      )}
      {hbo != "" && (
        <button onClick={addMovie} value={hbo} className="hbo">
          hbo
        </button>
      )}
      {crunchyroll != "" && (
        <button onClick={addMovie} value={crunchyroll} className="crunchyroll">
          crunchyroll
        </button>
      )}
      {nowtv != "" && (
        <button onClick={addMovie} value={nowtv} className="bbc">
          nowtv
        </button>
      )}
      {/* <p>{netflix}</p>
      <p>{prime}</p>
      <p>{disney}</p>
      <p>{bbc}</p>
      <p>{hbo}</p>
      <p>{crunchyroll}</p> */}
      <div className="add-link">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder={"enter your own link"}
              value={customLink}
              onChange={(e) => setCustomLink(e.target.value)}
              className="enter-link"
            />
          </label>
          <input type="submit" className="submit-link" value={"✓"} />
        </form>
        <ReactTags
          allowNew
          allowBackspace
          startWithFirstOption
          closeOnSelect
          labelText="add tags"
          selected={selected}
          suggestions={suggestions}
          onAdd={onAdd}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};
