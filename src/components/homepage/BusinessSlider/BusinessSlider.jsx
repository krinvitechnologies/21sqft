import React, { useEffect, useState } from 'react'
import "./businessslider.css"
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMostLikedContractor } from '../../../redux/actions/contractorAction';
import SendEnquiry from '../../../containers/SendEnquiry/SendEnquiry';
import { PulseLoader } from 'react-spinners';
import { CiLocationOn } from 'react-icons/ci';
import { setLike } from '../../../redux/actions/likeAction'
import { FaRegHeart } from "react-icons/fa";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import SwiperCore from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaChevronRight } from 'react-icons/fa';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function BusinessSlider() {

    const [sendEnquiryOpen, setSendEnquiryOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState({}); // State to track expanded items

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading, mostLikedContractor } = useSelector(state => state.contractorReducer || {});

    useEffect(() => {
        dispatch(getMostLikedContractor());
    }, [dispatch]);

    const handleLike = (businessId) => {
        dispatch(setLike(businessId));
    };

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

    // Function to toggle the description expansion
    const toggleExpansion = (id) => {
        setExpandedItems(prevState => ({
            ...prevState,
            [id]: !prevState[id] // Toggle the expansion for the given item
        }));
    };

    return (
        <div className='business-slider'>
            <div className="businessslider-head-cont">
                <h3>Most Liked</h3>
                <span onClick={() => navigate("/category")}>
                    <FaChevronRight />
                </span>
            </div>

            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                // slidesPerView={3}
                // navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                //  onSwiper={(swiper) => console.log(swiper)}
                //  onSlideChange={() => console.log('slide change')}
                // Add breakpoints here
                breakpoints={{
                    // When window width is >= 320px
                    320: {
                        slidesPerView: 1, // Adjust the number of slides per view for this breakpoint
                    },
                    // When window width is >= 640px
                    640: {
                        slidesPerView: 2, // Adjust the number of slides per view for this breakpoint
                    },
                    960: {
                        slidesPerView: 3, // Adjust the number of slides per view for this breakpoint
                    },
                    1200: {
                        slidesPerView: 3, // Adjust the number of slides per view for this breakpoint
                    },
                    2000: {
                        slidesPerView: 6, // Adjust the number of slides per view for this breakpoint
                    },
                    // Add more breakpoints as needed
                }}
                className='businessslider-swiper'
                loop={true} // Add Autoplay module to the list of modules
                // autoplay={{
                //     delay: 1000, // Delay between slides in milliseconds
                //     disableOnInteraction: false, // Prevent autoplay from stopping on user interaction
                // }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}

            >
                <div className='bs-cont'>
                    {loading ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '40vh',
                        }}>
                            <PulseLoader color="#FECC00" />
                        </div>
                    ) : (
                        mostLikedContractor?.contractors?.slice(0, 6).map((business) => (
                            <SwiperSlide className='bs-card' key={business._id}>
                                <div className="bs-service-name">
                                    <span>{business.service}</span>
                                </div>
                                <div className="bs-card-flex">
                                    <div className="bs-card-img">
                                        {business?.image && business?.image?.length > 0 && (
                                            // <img src={decodeImage(business.image[0])} alt='' />
                                            <img src={decodeImage(business?.image)} alt='' />
                                        )}
                                    </div>

                                    <div className="bs-card-info">
                                        <h4 className='bs-card-name'>{business.name}</h4>
                                        <p className='bsc-short-desc' >
                                            {/* {business.shortDescription} */}
                                            {(business.shortDescription && expandedItems[business._id])
                                                ? business.shortDescription
                                                : business.shortDescription?.length > 50
                                                    ? `${business.shortDescription.substring(0, 50)}...`
                                                    : business.shortDescription}
                                            {business.shortDescription?.length > 50 && (
                                                <button
                                                    className='bs-item-view-btn'
                                                    onClick={() => toggleExpansion(business._id)}
                                                >
                                                    {expandedItems[business._id] ? 'View less' : 'View more'}
                                                </button>
                                            )}
                                        </p>
                                        <div className="bsc-price">{`${business.price}`}</div>
                                        <div className="bsc-location">
                                            <span>
                                                <CiLocationOn />
                                                {`${business.city} ${business.state}`}
                                            </span>
                                        </div>
                                        <div className="bsc-buttons">
                                            <button type="submit" className='bsc-send-btn' onClick={() => handleSendEnquiryOpen(business._id)}>
                                                Send Enquiry
                                            </button>
                                            <button type="submit" className='bsc-view-btn' onClick={() => handleViewDetails(business._id)}>
                                                View Details
                                            </button>
                                            <button className='bsc-like-btn'><FaRegHeart onClick={() => handleLike(business._id)} />
                                                {business.totalLikes}
                                            </button>
                                            <SendEnquiry open={sendEnquiryOpen} setOpen={setSendEnquiryOpen} businessId={business._id} />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </div>
            </Swiper >

        </div>
    )
}