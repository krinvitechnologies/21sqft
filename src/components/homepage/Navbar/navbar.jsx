import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import squarefeet from "./navbar images/21SQFT B 1.png";
import profile from "./navbar images/Frame 6.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchResults, fetchSearchResultsByCityAndService } from "../../../redux/actions/searchAction";
import UserProfileSidebar from "../../../containers/UserProfileSidebar/UserProfileSidebar";
import { FaSearch } from "react-icons/fa";
import { getSupplier } from "../../../redux/actions/supplierAuthAction";
import { getUser } from "../../../redux/actions/userAuthAction";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    // const { data } = useSelector(state => state.searchReducer);
    // const searchResults = useSelector((state) => state.searchReducer.data);
    const searchResults = useSelector((state) => state.searchReducer.contractor);
    // console.log(searchResults)
    const [showMenu, setShowMenu] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const menuRef = useRef(null);
    const resultBoxRef = useRef(null);
    // const [name,setName]=useState('')
    const dispatch = useDispatch();

    // get the authenticated user profile
    useEffect(() => {
        dispatch(getSupplier());
        dispatch(getUser());
    }, [dispatch]);

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
    // const [barclose, setBarClose] = useState('')
    // const [filteredKeywords, setFilteredKeywords] = useState([]);
    // const closeSideBar = () => {
    // setBarClose('false')
    // }
    // console.log(searchResults);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setIsBurgerOpen(!isBurgerOpen); // Toggle menu visibility
    };

    const closeMenu = () => {
        setShowMenu(false);
        setIsBurgerOpen(false); // Close the burger menu
    };

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
    // console.log(filteredResults)
    // console.log(searchResults.data)

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

    const [showProfileSidebar, setShowProfileSidebar] = useState(false);

    const openProfileSidebar = () => {
        setShowProfileSidebar(true);
    };

    const closeProfileSidebar = () => {
        setShowProfileSidebar(false);
    };

    const { isUserAuthenticated } = useSelector((state) => state.userReducer);
    const { isSupplierAuthenticated, supplier } = useSelector(
        (state) => state.supplierAuthReducer
    );

    const handleSupplierProfile = () => {
        const id = supplier.contractor._id || supplier.contractor.id;
        navigate(`/ViewDetails/${id}`);
    };

    const decodeImage = (base64Data) => {
        return `${base64Data}`;
    };

    return (
        <div className="navbar-parent">
            <div className={`navbar ${showMenu ? "show-menu" : ""}`} ref={menuRef}>
                <div className="div-1">
                    <Link className="navbar-link-color" to="/">
                        <img className="squarefeet" src={squarefeet} alt=""></img>
                    </Link>
                </div>
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
                <div className="div-2">
                    <div className="sidebar-slide">
                        <ul
                            className={`navbar-ul v-class-resp ${showMenu ? "show-menu" : ""
                                }`}
                        >
                            <li>
                                <Link className="navbar-link-color" to="/" onClick={closeMenu}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="navbar-link-color"
                                    to="/category"
                                    onClick={closeMenu}
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="navbar-link-color"
                                    to="/blog"
                                    onClick={closeMenu}
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="navbar-link-color"
                                    to="/contact"
                                    onClick={closeMenu}
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {isUserAuthenticated ? (
                        <div className="profile-icon">
                            <img
                                className="navbar-profile"
                                src={profile}
                                alt=""
                                onClick={openProfileSidebar}
                            />
                            {showProfileSidebar && (
                                <UserProfileSidebar UserProfileSidebar={closeProfileSidebar} />
                            )}
                        </div>
                    ) : isSupplierAuthenticated ? (
                        <div className="profile-icon">
                            <img
                                className="navbar-profile"
                                src={profile}
                                alt=""
                                onClick={handleSupplierProfile}
                            />
                        </div>
                    ) : (
                        <button className="nav-btn">
                            <Link className="navbar-link-color-register" to="/user/login">
                                Register Free
                            </Link>
                        </button>
                    )}
                    {/* {isUserAuthenticated ? (
                        <div>
                            <img className="navbar-profile" src={profile} alt="" onClick={openProfileSidebar} />
                            {showProfileSidebar && (
                                <UserProfileSidebar UserProfileSidebar={closeProfileSidebar} />
                            )}
                        </div>

                    ) : isSupplierAuthenticated ? (
                        <img className="navbar-profile" src={profile} alt="" onClick={handleSupplierProfile} />
                    ) : (
                        <button className="nav-btn">
                            <Link className="navbar-link-color-register" to="/login">
                                Register
                            </Link>
                        </button>
                    )} */}

                    <div
                        className={`burger ${isBurgerOpen ? "open" : ""}`}
                        onClick={toggleMenu}
                    >
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        {/* <FaBars /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;








// import React from "react";
// import "./navbar.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import squarefeet from "./navbar images/21SQFT B 1.png";
// import profile from "./navbar images/Frame 6.png";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchSearchResults } from "../../../redux/actions/searchAction";
// import UserProfileSidebar from "../../../containers/UserProfileSidebar/UserProfileSidebar";
// import { FaSearch } from "react-icons/fa";

// const Navbar = () => {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [showResults, setShowResults] = useState(false);
//     // const { data } = useSelector(state => state.searchReducer);
//     const searchResults = useSelector((state) => state.searchReducer.data);
//     // console.log(searchResults)
//     const [showMenu, setShowMenu] = useState(false);
//     const [isBurgerOpen, setIsBurgerOpen] = useState(false);
//     const menuRef = useRef(null);
//     const resultBoxRef = useRef(null);
//     // const [name,setName]=useState('')
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (searchQuery.length) {
//             setShowResults(true);
//             dispatch(fetchSearchResults(searchQuery));
//         } else {
//             setShowResults(false);
//         }
//     }, [searchQuery, dispatch]);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (menuRef.current && !menuRef.current.contains(event.target)) {
//                 setShowMenu(false);
//                 setIsBurgerOpen(false); // Close the burger menu when clicked outside
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 resultBoxRef.current &&
//                 !resultBoxRef.current.contains(event.target)
//             ) {
//                 setShowResults(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);
//     // const [barclose, setBarClose] = useState('')
//     // const [filteredKeywords, setFilteredKeywords] = useState([]);
//     // const closeSideBar = () => {
//     // setBarClose('false')
//     // }
//     // console.log(searchResults);
//     const toggleMenu = () => {
//         setShowMenu(!showMenu);
//         setIsBurgerOpen(!isBurgerOpen); // Toggle menu visibility
//     };

//     const closeMenu = () => {
//         setShowMenu(false);
//         setIsBurgerOpen(false); // Close the burger menu
//     };

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             setShowResults(false);
//         }
//     };
//     // const filteredResults = searchResults.data.filter(item =>
//     // item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     // );

//     const filteredResults =
//         searchResults && searchResults.data
//             ? searchResults.data.filter(
//                 (item) =>
//                     `${item.name} ${item.service} ${item.address} ${item.city} ${item.state}`
//                         .toLowerCase()
//                         .includes(searchQuery.toLowerCase()) ||
//                     item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     `${item.city}, ${item.state}`
//                         .toLowerCase()
//                         .includes(searchQuery.toLowerCase())
//             )
//             : [];
//     // console.log(filteredResults)
//     // console.log(searchResults.data)
//     const navigate = useNavigate();
//     const handleRedirect = () => {
//         // Redirect logic here
//         navigate("/searcher", { state: { results: filteredResults } });
//         setShowResults(false);
//     };

//     const [showProfileSidebar, setShowProfileSidebar] = useState(false);

//     const openProfileSidebar = () => {
//         setShowProfileSidebar(true);
//     };

//     const closeProfileSidebar = () => {
//         setShowProfileSidebar(false);
//     };

//     const { isUserAuthenticated } = useSelector(state => state.userReducer);
//     const { isSupplierAuthenticated, supplier } = useSelector(state => state.supplierAuthReducer);

//     const handleSupplierProfile = () => {
//         const id = supplier.contractor.id;
//         navigate(`/ViewDetails/${id}`);
//     };


//     return (
//         <div>
//             <div
//                 className={`navbar ${showMenu ? "show-menu" : ""}`}
//                 ref={menuRef}
//             >
//                 <div className="div-1">
//                     <Link className="navbar-link-color" to="/">
//                         <img className="squarefeet" src={squarefeet} alt=""></img>
//                     </Link>
//                 </div>
//                 <div className="search-box">
//                     <div className="row">
//                         <input
//                             className="search-nav-search"
//                             type="text"
//                             id="input-box"
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                             onKeyPress={handleKeyPress}
//                             placeholder="Search Keywords"
//                             autoComplete="off"
//                         />
//                         <button>
//                             <FaSearch />
//                         </button>
//                     </div>
//                     {showResults && (
//                         <div className="result-box" ref={resultBoxRef}>
//                             <ul>
//                                 {filteredResults &&
//                                     filteredResults.map((result) => (
//                                         <li key={result._id} onClick={() => handleRedirect(result)}>
//                                             <div>
//                                                 {result.name} {result.service}
//                                             </div>
//                                             {/* <div>{result.service}</div> */}
//                                             <div>{result.address}</div>
//                                             <div>
//                                                 {result.city},{result.state}
//                                             </div>
//                                             {/* <div>{result.state}</div> */}
//                                         </li>
//                                     ))}
//                             </ul>
//                             {/* console.log(object) */}
//                         </div>
//                     )}
//                 </div>
//                 <div className="div-2">
//                     <div className="sidebar-slide">
//                         <ul
//                             className={`navbar-ul v-class-resp ${showMenu ? "show-menu" : ""
//                                 }`}
//                         >
//                             <li>
//                                 <Link className="navbar-link-color" to="/" onClick={closeMenu}>
//                                     Home
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link
//                                     className="navbar-link-color"
//                                     to="/category"
//                                     onClick={closeMenu}
//                                 >
//                                     Categories
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link
//                                     className="navbar-link-color"
//                                     to="/blog"
//                                     onClick={closeMenu}
//                                 >
//                                     Blog
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link
//                                     className="navbar-link-color"
//                                     to="/contact"
//                                     onClick={closeMenu}
//                                 >
//                                     Contact Us
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>
//                     {/* <input className='navbar-search' type='text' placeholder='search here'></input> */}

//                     {/* <img className="navbar-profile" src={profile} alt="" onClick={openProfileSidebar} />
//                     {showProfileSidebar && (
//                         <UserProfileSidebar UserProfileSidebar={closeProfileSidebar} />
//                     )}

//                     <img className="navbar-profile" src={profile} alt="" onClick={handleSupplierProfile} />

//                     <button className="nav-btn">
//                         <Link className="navbar-link-color-register" to="/login">
//                             Register
//                         </Link>
//                     </button> */}

//                     {isUserAuthenticated ? (
//                         <div>
//                             <img className="navbar-profile" src={profile} alt="" onClick={openProfileSidebar} />
//                             {showProfileSidebar && (
//                                 <UserProfileSidebar UserProfileSidebar={closeProfileSidebar} />
//                             )}
//                         </div>

//                     ) : isSupplierAuthenticated ? (
//                         <img className="navbar-profile" src={profile} alt="" onClick={handleSupplierProfile} />
//                     ) : (
//                         <button className="nav-btn">
//                             <Link className="navbar-link-color-register" to="/login">
//                                 Register
//                             </Link>
//                         </button>
//                     )}

//                 </div>
//                 <div
//                     className={`burger ${isBurgerOpen ? "open" : ""}`}
//                     onClick={toggleMenu}
//                 >
//                     <div className="line"></div>
//                     <div className="line"></div>
//                     <div className="line"></div>
//                     {/* <FaBars /> */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;