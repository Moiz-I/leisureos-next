import { useState, useContext, useEffect } from "react";
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

export default function MovieGrid(props) {
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

  const addMovieToShowlist = (movie) => {
    setShowlist([movie, ...showlist]);
  };

  const removeMovieFromShowlist = (id) => {
    setShowlist(showlist.filter((movie) => movie[0] !== id));
  };

  // useEffect(() => {
  //   const updateRegion = () => {
  //     setSelectedOption(selectedRegion);
  //     console.log("corrected to ", selectedRegion);
  //   };
  //   updateRegion();
  // }, [selectedOption]);

  //const { state, dispatch } = useAppContext();
  // const { number } = state;
  // dispatch({ type: "add_number", value: 3 });
  // console.log(number);

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
              if (movie[1].toLowerCase().includes(query.toLowerCase())) {
                const imgSource = movie[2];
                return (
                  <div>
                    <MovieCard
                      id={movie[0]}
                      imgSource={imgSource}
                      name={movie[1]}
                      link={movie[3]}
                      key={movie[0]}
                      locale={selectedOption.value}
                      links={props.links}
                      addMovieFunc={addMovieToShowlist}
                      removeMovieFunc={removeMovieFromShowlist}
                    />
                  </div>
                );
              } else if (query == "") {
                const imgSource = movie[2];
                return (
                  <div>
                    <MovieCard
                      id={movie[0]}
                      imgSource={imgSource}
                      name={movie[1]}
                      link={movie[3]}
                      key={movie[0]}
                      locale={selectedOption.value}
                      links={props.links}
                      addMovieFunc={addMovieToShowlist}
                      removeMovieFunc={removeMovieFromShowlist}
                    />
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <h2 className="no-movies">...</h2>
        )}
      </div>
    </div>
  );
}
