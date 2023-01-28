import { useState, useContext, useEffect, useCallback } from "react";
import { MovieCard } from "./MovieCard";
import { GlobalContext } from "../context/GlobalState";
import Search from "./results";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Select from "react-select";
import { useRouter } from "next/router";
// import { useAppContext } from "@/context/AppContext";
// const { state, dispatch } = useAppContext();
import useLocalStorage from "use-local-storage";
import { ReactTags } from "react-tag-autocomplete";

export default function MovieGrid(props) {
  const [tags, setTags] = useLocalStorage("tags", []);
  const suggestions = tags.map((name, index) => ({
    value: index,
    label: name,
  }));
  const updateTag = (newTag) => {
    setTags([...tags, newTag.value]);
  };
  const [selected, setSelected] = useState([]);
  const onAdd = useCallback(
    (newTag) => {
      setSelected([...selected, newTag]);
    },
    [selected]
  );
  const onDelete = useCallback(
    (tagIndex) => {
      setSelected(selected.filter((_, i) => i !== tagIndex));
    },
    [selected]
  );

  const getTags = () => {
    const arr = [];
    for (const i in selected) {
      arr.push(selected[i].label);
    }
    //console.log("arr: ", arr, "selected: ", selected);
    return arr;
  };

  const [showlist, setShowlist] = useLocalStorage("showlist", []);

  const router = useRouter();

  const { watchlist } = useContext(GlobalContext);
  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    router.push("");
  };

  const options = [
    { value: "en_US", label: "🇺🇸US" },
    { value: "en_GB", label: "🇬🇧UK" },
    { value: "en_NG", label: "🇳🇬Nigeria" },
    { value: "en_IN", label: "🇮🇳India" },
  ];

  // const { selectedCountry, changeCountry, removeMovie } =
  //   useContext(GlobalContext);

  const [clientLoaded, setClientLoaded] = useState(false);

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  useEffect(() => {
    //console.log("SHOW ADDED");
    //console.log(localStorage.getItem("showlist"));
  }, []);

  const [selectedRegion, setSelectedRegion] = useLocalStorage(
    "region",
    options[0]
  );
  const [selectedOption, setSelectedOption] = useState(selectedRegion);
  // console.log("CURRENT COUNTRY: ", selectedCountry.value);

  const onCountryChange = (selectedOption) => {
    setSelectedRegion(selectedOption);
    //console.log(selectedRegion);
    //changeCountry(selectedOption);
    //console.log("chanhed country");
  };

  const isAdded = (id) => {
    let storedMovie = showlist.find((o) => o[0] === id);
    const alreadyAdded = storedMovie ? true : false;

    return alreadyAdded;
  };

  const addMovieToShowlist = (movie) => {
    console.log("adding: ", movie);
    if (isAdded(movie[0])) {
      console.log("ALREADY ADDED");
      // removeMovieFromShowlist(movie[0]);
      //setShowlist(showlist.filter((m) => m[0] !== movie[0]));
      console.log("showlist after removing: ", showlist);
      setShowlist([movie, ...showlist]);
      setShowlist([movie, ...showlist]);
      console.log("showlist after adding if added: ", showlist);
    } else {
      setShowlist([movie, ...showlist]);
      console.log("showlist after adding if not added: ", showlist);
    }
  };

  const removeMovieFromShowlist = (id) => {
    setShowlist(showlist.filter((movie) => movie[0] !== id));
  };

  return (
    <div className="movie-page">
      {clientLoaded && (
        <Select
          defaultValue={selectedOption}
          onChange={onCountryChange}
          options={options}
          className="dropdown"
        />
      )}

      {/* <p>request a country</p> */}
      <div className="container">
        <div className="search-bar">
          <div className="inner">
            <input
              type="text"
              placeholder={"type to search"}
              className={"search-input"}
              onChange={(event) => setQuery(event.target.value)}
              value={query}
              autoFocus
            />
          </div>
        </div>
        <div className="tag-container">
          <ReactTags
            allowBackspace
            closeOnSelect
            startWithFirstOption
            labelText="search your tags"
            selected={selected}
            suggestions={suggestions}
            onAdd={onAdd}
            onDelete={onDelete}
            noOptionsText="No matching countries"
          />
        </div>
        {showlist.length >= 0 && clientLoaded ? (
          <div className="movie-grid">
            <button
              onClick={onOpenModal}
              className="movie-card add-movie-button"
            >
              <p>+</p>
            </button>
            <Modal open={open} onClose={onCloseModal} center>
              <Search
                closeModal={onCloseModal}
                locale={selectedRegion.value}
                links={props.links}
                addMovie={addMovieToShowlist}
                removeMovie={removeMovieFromShowlist}
                updateTag={updateTag}
              />
            </Modal>
            {/* <Popup
              trigger={
                <button className="movie-card add-movie-button">
                  <p>+</p>
                </button>
              }
              position="left left"
              // offsetX={450}
              // offsetY={200}
            >
              <Search />
            </Popup> */}
            {showlist.map((movie) => {
              const tagSearch = movie[4].some((item) =>
                getTags().includes(item)
              );
              const querySearch = movie[1]
                .toLowerCase()
                .includes(query.toLowerCase());
              const isTag = getTags().length != 0;
              const isQuery = query != "";
              const matches = isQuery
                ? isTag
                  ? tagSearch && querySearch
                  : querySearch
                : tagSearch;
              // query != ""
              //   ? movie[4].some((item) => getTags().includes(item)) ||
              //     (movie[1].toLowerCase().includes(query.toLowerCase()) &&
              //       movie[4].some((item) => getTags().includes(item)))
              //   : movie[4].some((item) => getTags().includes(item));
              const defaultPage = !isQuery && !isTag;
              // if (query!=""||getTags().length!=0)
              // switch () {
              //   case "nfx":
              //     console.log("netflix");
              //     setNetflix(resultLink);
              //     someLinks = true;
              //     break;
              //   default:
              //     break;
              if (matches || defaultPage) {
                return (
                  <MovieCard
                    id={movie[0]}
                    imgSource={movie[2]}
                    name={movie[1]}
                    link={movie[3]}
                    key={movie[0]}
                    locale={selectedOption.value}
                    links={props.links}
                    addMovieFunc={addMovieToShowlist}
                    removeMovieFunc={removeMovieFromShowlist}
                    updateTag={updateTag}
                    matches={
                      query != ""
                        ? movie[4].some((item) => getTags().includes(item)) &&
                          movie[1].toLowerCase().includes(query.toLowerCase())
                        : movie[4].some((item) => getTags().includes(item))
                    }
                    defaultPage={query == "" && getTags().length == 0}
                  />
                );
              }
              // if (movie[4].some((item) => getTags().includes(item))) {
              //   if (movie[1].toLowerCase().includes(query.toLowerCase())) {
              //     console.log(
              //       "first if: query is ",
              //       query,
              //       " and selected is ",
              //       getTags()
              //     );
              //     const imgSource = movie[2];
              //     return (
              //       <div>
              //         <MovieCard
              //           id={movie[0]}
              //           imgSource={imgSource}
              //           name={movie[1]}
              //           link={movie[3]}
              //           key={movie[0]}
              //           locale={selectedOption.value}
              //           links={props.links}
              //           addMovieFunc={addMovieToShowlist}
              //           removeMovieFunc={removeMovieFromShowlist}
              //           updateTag={updateTag}
              //         />
              //       </div>
              //     );
              //   }
              // } else if (getTags().length == 0) {
              //   if (query == "") {
              //     console.log(
              //       "second if: query is ",
              //       query,
              //       " and selected is ",
              //       getTags()
              //     );
              //     const imgSource = movie[2];
              //     return (
              //       <div>
              //         <MovieCard
              //           id={movie[0]}
              //           imgSource={imgSource}
              //           name={movie[1]}
              //           link={movie[3]}
              //           key={movie[0]}
              //           locale={selectedOption.value}
              //           links={props.links}
              //           addMovieFunc={addMovieToShowlist}
              //           removeMovieFunc={removeMovieFromShowlist}
              //           updateTag={updateTag}
              //         />
              //       </div>
              //     );
              //   }
              // }
            })}
          </div>
        ) : (
          <h2 className="no-movies">...</h2>
        )}
      </div>
    </div>
  );
}
