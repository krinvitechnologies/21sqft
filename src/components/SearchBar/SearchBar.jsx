import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchResults, fetchSearchResultsByCityAndService } from "../../../redux/actions/searchAction";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    // const { data } = useSelector(state => state.searchReducer);
    // const searchResults = useSelector((state) => state.searchReducer.data);
    const searchResults = useSelector((state) => state.searchReducer.contractor);
    const menuRef = useRef(null);
    const resultBoxRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchQuery.length) {
            setShowResults(true);
            dispatch(fetchSearchResults(searchQuery));
        } else {
            setShowResults(false);
        }
    }, [searchQuery, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
                setIsBurgerOpen(false); // Close the burger menu when clicked outside
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                resultBoxRef.current &&
                !resultBoxRef.current.contains(event.target)
            ) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setShowResults(false);
        }
    };
    // const filteredResults = searchResults.data.filter(item =>
    // item.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const filteredResults =
        searchResults
            ? searchResults.filter(
                (item) =>
                    `${item.name} ${item.service} ${item.address} ${item.city} ${item.state}`
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    `${item.city}, ${item.state}`
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            )
            : [];

    const [page, setPage] = useState(1);
    const limit = 4;

    const navigate = useNavigate();
    const handleRedirect = (selectedBusiness) => {
        // Redirect logic here
        // navigate("/searcher", { state: { results: filteredResults } });
        navigate(
            `/searcher?address=${encodeURIComponent(
                selectedBusiness.address.toLowerCase()
            )}&service=${encodeURIComponent(selectedBusiness.service.toLowerCase())}`
        );
        dispatch(fetchSearchResultsByCityAndService(selectedBusiness.service.toLowerCase(), selectedBusiness.address.toLowerCase(), page, limit));
        setShowResults(false);
    };

    const decodeImage = (base64Data) => {
        return `${base64Data}`;
    };

    return (
        <div className="search-box">
            <div className="row">
                <input
                    className="search-nav-search"
                    type="text"
                    id="input-box"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Search Keywords"
                    autoComplete="off"
                />
                <button>
                    <FaSearch />
                </button>
            </div>
            {showResults && (
                <div className="result-box" ref={resultBoxRef}>
                    <ul>
                        {filteredResults &&
                            filteredResults.map((result) => (
                                <li key={result._id} onClick={() => handleRedirect(result)}>
                                    <div className="nav-search-result">
                                        <div className="left-nav-img-cont-sr">
                                            {result.image && result.image.length > 0 && (
                                                <img src={decodeImage(result.image[0])} alt='' />
                                            )}
                                        </div>
                                        <div className="right-nav-sr-text">
                                            <div className="nav-search-name-cont">
                                                <span className="nav-sr-name">{result.name}</span>
                                                <span className="nav-sr-service"> {result.service}</span>
                                            </div>
                                            {/* <div>{result.service}</div> */}
                                            {/* <div>{result.address}</div> */}
                                            <div className="nav-search-address">
                                                {result.city}, {result.state}
                                            </div>
                                        </div>

                                    </div>

                                    {/* <div>{result.state}</div> */}
                                </li>
                            ))}
                    </ul>
                    {/* console.log(object) */}
                </div>
            )}
        </div>
    );
};

export default SearchBar;