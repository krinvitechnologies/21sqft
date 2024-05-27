import React, { useState } from "react";
import "./searcher.css";
import Navbar from "../../../components/homepage/Navbar/navbar";
import Footer from "../../../components/homepage/footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { CiLocationOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SendEnquiry from '../../../containers/SendEnquiry/SendEnquiry';
import { setLike } from "../../../redux/actions/likeAction";
import { PulseLoader } from "react-spinners";

function Searcher() {

    const [sendEnquiryOpen, setSendEnquiryOpen] = useState(false);
    // const { loading, data } = useSelector((state) => state.searchReducer.data);
    const { loading, data } = useSelector((state) => state.searchReducer);

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

    if (loading) {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <PulseLoader color="#FECC00" />
        </div>
    }

    return (
        <div>
            <Navbar />
            <div className="main">
                <div className="search-cards-cont">
                    {/* <div className="full0"> */}
                    {data?.data && data?.data?.length > 0 ? (
                        data?.data?.map((d) => (
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

            </div>
            <Footer />
        </div>
    );
}

export default Searcher;