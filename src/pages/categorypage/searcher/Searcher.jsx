import React, { useCallback, useEffect, useState } from "react";
import "./searcher.css";
import Navbar from "../../../components/homepage/Navbar/navbar";
import Footer from "../../../components/homepage/footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { CiLocationOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import SendEnquiry from '../../../containers/SendEnquiry/SendEnquiry';
import { setLike } from "../../../redux/actions/likeAction";
import { ClipLoader, PulseLoader } from "react-spinners";
import { fetchSearchResults, fetchSearchResultsByCityAndService } from "../../../redux/actions/searchAction";

function Searcher() {

    const [sendEnquiryOpen, setSendEnquiryOpen] = useState(false);
    // const { loading, data } = useSelector((state) => state.searchReducer.data);
    // const { loading, data } = useSelector((state) => state.searchReducer);
    const { data, contractor, totalContractors, totalPages, currentPage, loading } = useSelector((state) => state.searchReducer) || {};

    const dispatch = useDispatch();

    const handleLike = (businessId) => {
        // console.log(' businessId', businessId);
        dispatch(setLike(businessId));
    };

    const navigate = useNavigate();

    const handleViewDetails = (id) => {
        navigate(`/ViewDetails/${id}`);
    };

    // Function to handle opening the dialog
    const handleSendEnquiryOpen = () => {
        setSendEnquiryOpen(true);
    };

    const decodeImage = (base64Data) => {
        return `${base64Data}`;
    };

    const [page, setPage] = useState(1);
    const limit = 8;

    const location = useLocation();

    // Extract query parameters from the URL using URLSearchParams
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get("city") || "";
    const state = queryParams.get("state") || "";
    const service = queryParams.get("service") || "";
    const address = queryParams.get("address") || "";

    // useEffect(() => {
    //     // dispatch(getAllContractor(page, limit));
    //     // dispatch(fetchSearchResults(searchQuery, page, limit));
    //     // dispatch(fetchSearchResults(page, limit));
    //     dispatch(fetchSearchResultsByCityAndService(page, limit));
    // }, [dispatch, page]);
    useEffect(() => {
        // Dispatch the action with search details from query parameters
        dispatch(fetchSearchResultsByCityAndService(city, state, service, address, page, limit));
    }, [dispatch, city, state, service, address, page]);

    // const handleScroll = useCallback(() => {
    //     if (
    //         loading ||
    //         window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 200
    //     ) {
    //         return;
    //     }
    //     if (currentPage < totalPages) {
    //         setPage(prevPage => prevPage + 1);
    //     }
    // }, [loading, currentPage, totalPages]);

    // const handleScroll = useCallback(() => {
    //     // Check if we're near the bottom and not loading
    //     if (
    //         loading ||
    //         window.innerHeight + document.documentElement.scrollTop <
    //         document.documentElement.offsetHeight - 200
    //     ) {
    //         return;
    //     }
    //     // Use the local state "page" to decide whether to fetch more data.
    //     if (page >= totalPages) {
    //         return;
    //     }
    //     setPage(prevPage => prevPage + 1);
    // }, [loading, page, totalPages]);

    const handleScroll = useCallback(() => {
        // Stop if already loading, or if we're not close enough to the bottom,
        // or if our current local page is equal to or greater than totalPages.
        if (
            loading ||
            window.innerHeight + document.documentElement.scrollTop <
            document.documentElement.offsetHeight - 200 ||
            page >= totalPages
        ) {
            return;
        }
        // If conditions are met, increment the page.
        setPage((prevPage) => prevPage + 1);
    }, [loading, page, totalPages]);


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const [filteredContractors, setFilteredContractors] = useState([]);

    // useEffect(() => {
    //     if (contractor) {
    //         setFilteredContractors(prev =>
    //             page === 1 ? contractor : [...prev, ...contractor]
    //         );
    //     }
    // }, [contractor, page]);
    useEffect(() => {
        if (contractor) {
          setFilteredContractors(prev => {
            // For page 1, just use the new results
            const combined = page === 1 ? contractor : [...prev, ...contractor];
            // Remove duplicates based on a unique identifier, here using _id
            const uniqueContractors = Array.from(
              new Map(combined.map(item => [item._id, item])).values()
            );
            return uniqueContractors;
          });
        }
      }, [contractor, page]);
      
    // console.log('filteredContractors', filteredContractors);

    // if (loading) {
    //     return <div style={{
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         height: '100vh'
    //     }}>
    //         <PulseLoader color="#FECC00" />
    //     </div>
    // }

    return (
        <div>
            <Navbar />
            <div className="main">
                <div className="search-cards-cont">
                    {/* <div className="full0"> */}
                    {filteredContractors?.length > 0 ? (
                        filteredContractors?.map((d) => (
                            <div className="search-card">
                                <div className="search-service-name">
                                    <span>{d.service}</span>
                                </div>
                                <div className="search-card-flex">
                                    <div className="search-card-img">
                                        {d.image && d.image.length > 0 && (
                                            // <img src={`/uploaded/${d.image[0]}`} alt="" />
                                            <img src={decodeImage(d.image[0])} alt='' />
                                        )}
                                    </div>

                                    <div className="search-card-info">
                                        <h4 className='search-card-name'>{d.name}</h4>
                                        <p className='sc-short-desc' >{d.shortDescription}</p>
                                        <div className="sc-price">{`$ ${d.price}`}</div>
                                        <div className="sc-location">
                                            <span>
                                                <CiLocationOn />
                                                {`${d.city} ${d.state}`}
                                            </span>
                                        </div>
                                        <div className="sc-buttons">
                                            <button type="submit" className='sc-send-btn' onClick={handleSendEnquiryOpen}>
                                                Send Enquiry
                                            </button>
                                            <button type="submit" className='sc-view-btn' onClick={() => handleViewDetails(d._id)}>
                                                View Details
                                            </button>
                                            <button className='sc-like-btn'><FaRegHeart onClick={() => handleLike(d._id)} />
                                                {d.totalLikes}
                                                {/* {data && data.totalLikes} */}
                                            </button>
                                            <SendEnquiry open={sendEnquiryOpen} setOpen={setSendEnquiryOpen} businessId={d._id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="searcher-no-results-message">
                            <h1>No results found.</h1>
                        </div>
                    )}

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
    );
}

export default Searcher;





// import React, { useState } from "react";
// import "./searcher.css";
// import Navbar from "../../../components/homepage/Navbar/navbar";
// import Footer from "../../../components/homepage/footer/footer";
// import { useDispatch, useSelector } from "react-redux";
// import { CiLocationOn } from "react-icons/ci";
// import { FaRegHeart } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import SendEnquiry from '../../../containers/SendEnquiry/SendEnquiry';
// import { setLike } from "../../../redux/actions/likeAction";
// import { PulseLoader } from "react-spinners";

// function Searcher() {

//     const [sendEnquiryOpen, setSendEnquiryOpen] = useState(false);
//     // const { loading, data } = useSelector((state) => state.searchReducer.data);
//     const { loading, data } = useSelector((state) => state.searchReducer);

//     const dispatch = useDispatch();

//     const handleLike = (businessId) => {
//         // console.log(' businessId', businessId);
//         dispatch(setLike(businessId));
//     };

//     const navigate = useNavigate();

//     const handleViewDetails = (id) => {
//         navigate(`/ViewDetails/${id}`);
//     };

//     // Function to handle opening the dialog
//     const handleSendEnquiryOpen = () => {
//         setSendEnquiryOpen(true);
//     };

//     const decodeImage = (base64Data) => {
//         return `${base64Data}`;
//     };

//     if (loading) {
//         return <div style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100vh'
//         }}>
//             <PulseLoader color="#FECC00" />
//         </div>
//     }

//     return (
//         <div>
//             <Navbar />
//             <div className="main">
//                 <div className="search-cards-cont">
//                     {/* <div className="full0"> */}
//                     {data?.data && data?.data?.length > 0 ? (
//                         data?.data?.map((d) => (
//                             <div className="search-card">
//                                 <div className="search-service-name">
//                                     <span>{d.service}</span>
//                                 </div>
//                                 <div className="search-card-flex">
//                                     <div className="search-card-img">
//                                         {d.image && d.image.length > 0 && (
//                                             // <img src={`/uploaded/${d.image[0]}`} alt="" />
//                                             <img src={decodeImage(d.image[0])} alt='' />
//                                         )}
//                                     </div>

//                                     <div className="search-card-info">
//                                         <h4 className='search-card-name'>{d.name}</h4>
//                                         <p className='sc-short-desc' >{d.shortDescription}</p>
//                                         <div className="sc-price">{`$ ${d.price}`}</div>
//                                         <div className="sc-location">
//                                             <span>
//                                                 <CiLocationOn />
//                                                 {`${d.city} ${d.state}`}
//                                             </span>
//                                         </div>
//                                         <div className="sc-buttons">
//                                             <button type="submit" className='sc-send-btn' onClick={handleSendEnquiryOpen}>
//                                                 Send Enquiry
//                                             </button>
//                                             <button type="submit" className='sc-view-btn' onClick={() => handleViewDetails(d._id)}>
//                                                 View Details
//                                             </button>
//                                             <button className='sc-like-btn'><FaRegHeart onClick={() => handleLike(d._id)} />
//                                                 {d.totalLikes}
//                                                 {/* {data && data.totalLikes} */}
//                                             </button>
//                                             <SendEnquiry open={sendEnquiryOpen} setOpen={setSendEnquiryOpen} businessId={d._id} />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="searcher-no-results-message">
//                             <h1>No results found.</h1>
//                         </div>
//                     )}

//                 </div>

//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default Searcher;