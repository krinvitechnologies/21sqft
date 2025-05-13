import React, { useCallback, useRef, useState, useEffect } from 'react';
import './category.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/homepage/Navbar/navbar';
import Footer from '../../components/homepage/footer/footer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllContractor } from '../../redux/actions/contractorAction';
import SendEnquiry from '../../containers/SendEnquiry/SendEnquiry';
import { ClipLoader, PulseLoader } from 'react-spinners';
import { CiLocationOn } from 'react-icons/ci';
import { setLike } from '../../redux/actions/likeAction'
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../redux/constants/constant";
import { toast } from "react-toastify";
import ServicesSidebar from '../../containers/ServicesSidebar/ServicesSidebar';
// import ServicesSidebar from "../../../containers/ServicesSidebar/ServicesSidebar";

let autoComplete;

const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};

function Category() {
    const [sendEnquiryOpen, setSendEnquiryOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [service, setService] = useState('');
    const [filteredContractors, setFilteredContractors] = useState([]);
    const autoCompleteRef = useRef(null);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [serviced, setServiced] = useState(false);

    const openServiceSidebar = () => {
        setServiced(true);
    };

    const closeServiceSidebar = () => {
        setServiced(false);
        setService(sessionStorage.getItem("opts"));
    };


    const [page, setPage] = useState(1);
    const limit = 8;

    // const { loading, success, contractor } = useSelector(state => state.contractorReducer);
    const { contractor, totalContractors, totalPages, currentPage, loading } = useSelector((state) => state.contractorReducer) || {};

    const { user } = useSelector(state => state.userReducer);
    // console.log('contractor',contractor);

    // useEffect(() => {
    //     dispatch(getAllContractor());
    // }, [dispatch]);

    const handleScriptLoad = useCallback((updateQuery, autoCompleteRef) => {
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            {
                componentRestrictions: { country: "IN" },
            }
        );

        autoComplete.addListener("place_changed", () => {
            handlePlaceSelect(updateQuery);
        });
    }, []);

    const handlePlaceSelect = async (updateQuery) => {
        const addressObject = await autoComplete.getPlace();
        const query = addressObject.formatted_address;
        updateQuery(query);

        const latLng = {
            lat: addressObject?.geometry?.location?.lat(),
            lng: addressObject?.geometry?.location?.lng(),
        };
        const latlang = new window.google.maps.LatLng(latLng.lat, latLng.lng);
        let geocoder = new window.google.maps.Geocoder(); // Declare geocoder here
        geocoder.geocode({ latLng: latlang }, function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    setCity(
                        results[0].address_components[
                            results[0].address_components.length - 5
                        ].long_name
                    );
                }
                if (results[results.length - 2]) {
                    setState(results[results.length - 2].address_components[0].long_name);
                }
            }
        });
    };

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
            () => handleScriptLoad(setAddress, autoCompleteRef)
        );
    }, [handleScriptLoad]);


    useEffect(() => {
        const addressObject = autoComplete?.getPlace();
        const completeAddress = addressObject?.formatted_address;
        dispatch(getAllContractor(page, limit, service, completeAddress));
    }, [dispatch, page]);


    // const handleScroll = useCallback(() => {
    //     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    //     if (currentPage < totalPages) {
    //         setPage(prevPage => prevPage + 1);
    //     }
    // }, [loading, currentPage, totalPages]);
    const handleScroll = useCallback(() => {
        if (
            loading ||
            window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 200
        ) {
            return;
        }
        if (currentPage < totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    }, [loading, currentPage, totalPages]);


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // useEffect(() => {
    //     if (success && contractor) {
    //         // setFilteredContractors(contractor.contractors);
    //         setFilteredContractors(contractor);
    //     }
    // }, [success, contractor]);
    useEffect(() => {
        if (contractor) {
            setFilteredContractors(prev =>
                page === 1 ? contractor : [...prev, ...contractor]
            );
        }
    }, [contractor, page]);
    // console.log('filteredContractors',filteredContractors);

    // console.log('city',city);
    // console.log('state',state);

    // const handleSearch = () => {
    //     const filtered = contractor.contractors.filter(item =>
    //         item.service.toLowerCase().includes(service.toLowerCase()) &&
    //         item.city.toLowerCase().includes(city.toLowerCase()) &&
    //         item.state.toLowerCase().includes(state.toLowerCase())
    //     );
    //     setFilteredContractors(filtered);
    // };
    // const handleSearch = () => {
    //     // Filter contractors based on both service name and address
    //     // const filtered = contractor.contractors.filter(item => 
    //     const filtered = contractor.filter(item =>
    //         item.service.toLowerCase().includes(service.toLowerCase()) &&
    //         (item.city.toLowerCase().includes(city.toLowerCase()) || item.state.toLowerCase().includes(state.toLowerCase()))
    //     );
    //     setFilteredContractors(filtered);
    // };

    const handleSearch = async () => {
        try {
            const addressObject = await autoComplete.getPlace();
            const completeAddress = addressObject?.formatted_address;
            if ((city.length === 0 || state.length === 0) && service.length === 0) {
                toast.error("Enter location and service");
            }
            else if (city.length === 0 || state.length === 0) {
                toast.error('Enter location');
            }
            else if (service.length === 0) {
                toast.error('Select service');
            }
            else if (!completeAddress) {
                toast.error('Select a valid address');
            }
            else {
                setFilteredContractors([]);
                setPage(1);
                dispatch(getAllContractor(page, limit, service, completeAddress));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLike = (businessId) => {
        dispatch(setLike(businessId));
    };

    const handleViewDetails = (id) => {
        navigate(`/ViewDetails/${id}`);
    };

    const handleSendEnquiryOpen = () => {
        setSendEnquiryOpen(true);
    };

    const decodeImage = (base64Data) => {
        return `${base64Data}`;
    };

    const [expandedItems, setExpandedItems] = useState({}); // State to track expanded items

        // Function to toggle the description expansion
        const toggleExpansion = (id) => {
            setExpandedItems(prevState => ({
                ...prevState,
                [id]: !prevState[id] // Toggle the expansion for the given item
            }));
        };

    return (
        <div>
            <Navbar />
            <div className="category-cont">
                <div className="top-cat-img-back">
                    <img src='/image/category.png' alt="Description" />
                </div>
                <div className="top-cat-overlay-cont">
                    <h2>Categories</h2>
                    <p>Home-Categories</p>
                </div>
                <div className="top-cat-search-field-cont">
                    <input type="text" placeholder='Location' ref={autoCompleteRef} value={address} onChange={(e) => setAddress(e.target.value)} />
                    {/* <input type="text" placeholder='Services' value={service} onChange={(e) => setService(e.target.value.toLowerCase())} /> */}
                    <input
                        type="text"
                        onClick={openServiceSidebar}
                        onChange={(e) => setService(e.target.value.toLowerCase())}
                        placeholder="Services"
                        value={service}
                        // readOnly
                    />
                    {serviced && <ServicesSidebar service0={closeServiceSidebar} />}
                    <button type='submit' onClick={handleSearch}>
                        search
                    </button>
                </div>

                <div className="category-cards-cont">
                    {/* {loading ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh'
                        }}>
                            <PulseLoader color="#FECC00" />
                        </div>
                    // ) : success && contractor ? (
                    ) : */}
                    {contractor ? (
                          filteredContractors.length > 0 ? (
                        filteredContractors.map((item, index) => (
                            <div className="category-card" key={index}>
                                {/* // contractor.contractors.map((item, index) => ( */}
                                <div className="category-service-name">
                                    <span>{item.service}</span>
                                </div>
                                <div className="cat-card-flex">
                                    <div className="category-card-img">
                                        {item.image && item.image.length > 0 && (
                                            <img src={decodeImage(item.image[0])} alt='' />
                                        )}
                                    </div>
                                    <div className="category-card-info">
                                        <h4 className='cc-name'>{item.name}</h4>
                                        <p className='cc-short-desc'>
                                            {/* {item.shortDescription} */}
                                            {(item.shortDescription && expandedItems[item._id])
                                                ? item.shortDescription
                                                : item.shortDescription?.length > 80
                                                    ? `${item.shortDescription.substring(0, 80)}...`
                                                    : item.shortDescription}
                                            {/* {item.shortDescription?.length > 80 && (
                                                <button
                                                    className='bs-item-view-btn'
                                                    onClick={() => toggleExpansion(item._id)}
                                                >
                                                    {expandedItems[item._id] ? 'View less' : 'View more'}
                                                </button>
                                            )} */}
                                            </p>
                                        <div className='cc-price'>{item.price}</div>
                                        <div className="cc-location">
                                            <span><CiLocationOn /> {item.city},{item.state}</span>
                                        </div>
                                        <div className="cc-buttons">
                                            <button type='submit' onClick={handleSendEnquiryOpen} className='cc-send-btn'>Send Enquiry</button>
                                            <button type='submit' onClick={() => handleViewDetails(item._id)} className='cc-view-btn'>View Details</button>
                                            <button className='cc-like-btn'>
                                                {/* <FaRegHeart onClick={() => handleLike(item._id)} /> */}
                                                {/* <div className={isActive ? "heart is-active" : "heart"} onClick={() => { handleLike(item._id); handleHeartClick(); }}></div> */}
                                                <div className={user?.user?.likedBusinesses.includes(item._id) ? "heart is-active" : "heart"} onClick={() => handleLike(item._id)}></div>
                                                {item.totalLikes}
                                                {/* {data && data.totalLikes} */}
                                            </button>
                                            <SendEnquiry open={sendEnquiryOpen} setOpen={setSendEnquiryOpen} businessId={item._id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                          No results found.
                        </div>
                      )
                    ) : null}
                </div>


                {loading && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '40vh'
                    }}>
                        <ClipLoader color={"#FECC00"} loading={loading} size={50} />
                    </div>
                )}


            </div>
            <Footer />
        </div>
    )
}

export default Category;









// import React, { useCallback, useRef, useState } from 'react'
// import "./category.css"
// // import ViewDetails from './ViewDetails'
// import { useNavigate } from 'react-router-dom'
// import Navbar from '../../components/homepage/Navbar/navbar'
// import Footer from '../../components/homepage/footer/footer'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux';
// import { setLike } from '../../redux/actions/likeAction'
// // import { setFetch } from '../../redux/actions/fetchcardsAction'
// import { useSelector } from 'react-redux';
// import { getAllContractor } from '../../redux/actions/contractorAction'
// import SendEnquiry from '../../containers/SendEnquiry/SendEnquiry';
// import { PulseLoader } from 'react-spinners'
// // import { FaRegHeart } from 'react-icons/fa'
// import { CiLocationOn } from 'react-icons/ci'
// // import fetchReducer from '../../../redux/reducers/fetchcardReducer'
// import { REACT_APP_GOOGLE_MAPS_KEY } from "../../redux/constants/constant";

// let autoComplete;

// const loadScript = (url, callback) => {
//     let script = document.createElement("script");
//     script.type = "text/javascript";
//     script.async = true; // Load script asynchronously

//     if (script.readyState) {
//         script.onreadystatechange = function () {
//             if (script.readyState === "loaded" || script.readyState === "complete") {
//                 script.onreadystatechange = null;
//                 callback();
//             }
//         };
//     } else {
//         script.onload = () => callback();
//     }

//     script.src = url;
//     document.getElementsByTagName("head")[0].appendChild(script);
// };

// function Category() {

//     const [sendEnquiryOpen, setSendEnquiryOpen] = useState(false);
//     const [address, setAddress] = useState('')
//     // eslint-disable-next-line
//     const [selectedLocation, setSelectedLocation] = useState({
//         lat: 28.7041,
//         lng: 77.1025,
//     });

//     const autoCompleteRef = useRef(null);
//     const handleScriptLoad = useCallback((updateQuery, autoCompleteRef) => {
//         autoComplete = new window.google.maps.places.Autocomplete(
//             autoCompleteRef.current,
//             {
//                 // types: ["(cities)"],
//                 componentRestrictions: { country: "IN" },
//             }
//         );

//         autoComplete.addListener("place_changed", () => {
//             handlePlaceSelect(updateQuery);
//         });
//     }, []);

//     const handlePlaceSelect = async (updateQuery) => {
//         const addressObject = await autoComplete.getPlace();
//         const query = addressObject.formatted_address;
//         updateQuery(query);
//         console.log({ query });
//         const latLng = {
//             lat: addressObject?.geometry?.location?.lat(),
//             lng: addressObject?.geometry?.location?.lng(),
//         };
//         console.log({ latLng });
//         setSelectedLocation(latLng);
//     };

//     useEffect(() => {
//         loadScript(
//             `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
//             () => handleScriptLoad(setAddress, autoCompleteRef)
//         );
//     }, [handleScriptLoad]);

//     const dispatch = useDispatch();
//     const { loading, success, contractor } = useSelector(state => state.contractorReducer);
//     const { user } = useSelector(state => state.userReducer);
//     // const { user } = useSelector(state => state.userReducer);
//     // const {  data } = useSelector(state => state.likeReducer);

//     useEffect(() => {
//         dispatch(getAllContractor()); // Dispatch action to fetch data when component mounts
//     }, [dispatch]);

//     // const [fetch, setFetch] = useState('')
//     // const { data } = useSelector(state => state.fetchReducer);
//     // const handleFetch = (id) => {
//     //     // e.preventDefault()
//     //     dispatch(setFetch(id))
//     // }

//     const handleLike = (businessId) => {
//         console.log(' businessId', businessId);
//         dispatch(setLike(businessId));
//     };

//     const navigate = useNavigate();
//     // const handleRedirect = (id) => {
//     //     // Redirect logic here
//     //     navigate('/ViewDetails', { state: { id } }); // Use the navigate function from useNavigate
//     // };

//     const handleViewDetails = (id) => {
//         navigate(`/ViewDetails/${id}`);
//     };

//     // Function to handle opening the dialog
//     const handleSendEnquiryOpen = () => {
//         setSendEnquiryOpen(true);
//     };

//     // if (loading) {
//     //     return <div style={{
//     //         display: 'flex',
//     //         justifyContent: 'center',
//     //         alignItems: 'center',
//     //         height: '100vh'
//     //     }}>
//     //         <PulseLoader color="#A6A9AC" />
//     //     </div>
//     // }

//     const decodeImage = (base64Data) => {
//         return `${base64Data}`;
//     };

//     // const [isActive, setIsActive] = useState(false);

//     // const handleHeartClick = () => {
//     //   setIsActive(!isActive);
//     // };

//     const [service, setService] = useState('');
//     const [filteredContractors, setFilteredContractors] = useState([]);

//     // Other code...

//     // const handleSearch = () => {
//     //     // Filter contractors based on the service name
//     //     const filtered = contractor.contractors.filter(item => item.service.toLowerCase().includes(service.toLowerCase()));
//     //     setFilteredContractors(filtered);
//     // };

//     const handleSearch = () => {
//         // Filter contractors based on both service name and address
//         const filtered = contractor.contractors.filter(item => 
//             item.service.toLowerCase().includes(service.toLowerCase()) &&
//             (item.city.toLowerCase().includes(address.toLowerCase()) || item.state.toLowerCase().includes(address.toLowerCase()))
//         );
//         setFilteredContractors(filtered);
//     };
    

//     useEffect(() => {
//         if (success && contractor) {
//             // Initially set filtered contractors to all contractors
//             setFilteredContractors(contractor.contractors);
//         }
//     }, [success, contractor]);

//     return (
//         <div>
//             <Navbar />
//             <div className="category-cont">
//                 <div className="top-cat-img-back">
//                     <img src='/image/category.png' alt="Description" />
//                 </div>
//                 <div className="top-cat-overlay-cont">
//                     <h2>Categories</h2>
//                     <p>Home-Categories</p>
//                 </div>
//                 <div className="top-cat-search-field-cont">
//                     <input type="text" placeholder='Location'  ref={autoCompleteRef} value={address} onChange={(e) => setAddress(e.target.value)} />
//                     <input type="text" placeholder='Services' value={service} onChange={(e) => setService(e.target.value)} />
//                     <button type='submit' onClick={handleSearch}>
//                         search
//                     </button>
//                 </div>

//                 <div className="category-cards-cont">
//                     {loading ? (
//                         <div style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             height: '100vh'
//                         }}>
//                             <PulseLoader color="#FECC00" />
//                         </div>
//                     ) : success && contractor ? (
//                         filteredContractors.map((item, index) => (
//                             <div className="category-card" key={index}>
//                                 {/* // contractor.contractors.map((item, index) => ( */ }
//                                 <div className="category-service-name">
//                                     <span>{item.service}</span>
//                                 </div>
//                                 <div className="cat-card-flex">
//                                     <div className="category-card-img">
//                                         {item.image && item.image.length > 0 && (
//                                             <img src={decodeImage(item.image[0])} alt='' />
//                                         )}
//                                     </div>
//                                     <div className="category-card-info">
//                                         <h4 className='cc-name'>{item.name}</h4>
//                                         <p className='cc-short-desc'>{item.shortDescription}</p>
//                                         <div className='cc-price'>{item.price}</div>
//                                         <div className="cc-location">
//                                             <span><CiLocationOn /> {item.city},{item.state}</span>
//                                         </div>
//                                         <div className="cc-buttons">
//                                             <button type='submit' onClick={handleSendEnquiryOpen} className='cc-send-btn'> Send Enquiry</button>
//                                             <button type='submit' onClick={() => handleViewDetails(item._id)} className='cc-view-btn'>View Details</button>
//                                             <button className='cc-like-btn'>
//                                                 {/* <FaRegHeart onClick={() => handleLike(item._id)} /> */}
//                                                 {/* <div className={isActive ? "heart is-active" : "heart"} onClick={() => { handleLike(item._id); handleHeartClick(); }}></div> */}
//                                                 <div className={user?.user?.likedBusinesses.includes(item._id) ? "heart is-active" : "heart"} onClick={() => handleLike(item._id)}></div>
//                                                 {item.totalLikes}
//                                                 {/* {data && data.totalLikes} */}
//                                             </button>
//                                             <SendEnquiry open={sendEnquiryOpen} setOpen={setSendEnquiryOpen} businessId={item._id} />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : null}

//                 </div>
//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default Category;

