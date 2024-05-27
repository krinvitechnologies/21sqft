import React, { useState, useEffect } from 'react'
import './viewdetails.css'
import Navbar from '../../components/homepage/Navbar/navbar'
import Footer from '../../components/homepage/footer/footer'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getContractorDetail } from '../../redux/actions/contractorAction';
import SendEnquiry from '../../containers/SendEnquiry/SendEnquiry';
import { PulseLoader } from 'react-spinners';
import { FaPhoneAlt, FaRegEdit } from 'react-icons/fa';
import { CiLocationOn } from "react-icons/ci";
import SupplierEditSidebar from '../../containers/SupplierEditSidebar/SupplierEditSidebar';
import { getSupplier, supplierLogout } from '../../redux/actions/supplierAuthAction';

function ViewDetails() {
    // const location = useLocation();
    // const item = location.state.id;
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, contractorDetail } = useSelector(state => state.contractorReducer);
    const { supplier } = useSelector(state => state.supplierAuthReducer);
    const [sendEnquiryOpen, setSendEnquiryOpen] = useState(false);
    const [showEditProfileSidebar, setShowEditProfileSidebar] = useState(false);

    useEffect(() => {
        dispatch(getContractorDetail(id)); // Dispatch action to fetch contractor details when component mounts
    }, [dispatch, id]);

    // const { contractor } = contractorDetail;
    const contractor = contractorDetail ? contractorDetail.contractor : null;
    const loggedContractor = supplier ? supplier.contractor : null;

    // Function to handle opening the dialog
    const handleSendEnquiryOpen = () => {
        setSendEnquiryOpen(true);
    };

    const openEditProfileSidebar = () => {
        setShowEditProfileSidebar(true);
    };

    const closeEditProfileSidebar = () => {
        setShowEditProfileSidebar(false);
    };

    const handleLogout = () => {
        dispatch(supplierLogout(navigate));
        // Call API to fetch data again
        dispatch(getSupplier());
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
        <div className='cont-detail-cont'>
            <div className="cd-header">
                <Navbar />
            </div>
            <div className="contractor-detail">
                {contractor && (
                    <div className="cd-cont">
                        <div className="top-cd">
                            <div className="top-left-img-cont">
                                {/* <img src={contractor.image[0]} alt='' /> */}
                                {contractor && contractor.image && contractor.image[0] && (
                                    <img src={contractor.image[0]} alt='' />
                                )}
                            </div>
                            <div className="top-right-cont">
                                {/* {isSupplierAuthenticated ? (
                                    <div className="cd-edit-btn">
                                        <button onClick={openEditProfileSidebar}>Edit <FaRegEdit /></button>
                                        {showEditProfileSidebar && (
                                            <SupplierEditSidebar SupplierEditProfileSidebar={closeEditProfileSidebar} />
                                        )}
                                    </div>
                                ) : (
                                    <div className="cd-send-enq-btn">
                                        <button type='submit' onClick={handleSendEnquiryOpen}>Send Enquiry</button>
                                    </div>
                                )} */}
                                {loggedContractor && loggedContractor.id === id ? (
                                    <div className="cd-edit-btn">
                                        <button onClick={openEditProfileSidebar}>
                                            Edit <FaRegEdit />
                                        </button>
                                        {showEditProfileSidebar && (
                                            <SupplierEditSidebar
                                                SupplierEditProfileSidebar={closeEditProfileSidebar}
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <div className="cd-send-enq-btn">
                                        <button type="submit" onClick={handleSendEnquiryOpen}>
                                            Send Enquiry
                                        </button>
                                    </div>
                                )}
                                <h4>{contractor.name}</h4>
                                <p>{contractor.shortDescription}</p>
                                <div className="cd-details">
                                    <span className='t1'>Service-{contractor.service}</span>
                                    <span className='t2'><FaPhoneAlt />{contractor.phoneNo}</span>
                                    <span className='t3'>Rs {contractor.price}</span>
                                </div>
                                <div className="cd-address">
                                    <span><CiLocationOn /> {contractor.city} {contractor.state}</span>
                                </div>
                            </div>
                        </div>

                        <div className="cd-aboutus">
                            <h3>About Us</h3>
                            <p>{contractor.description}</p>
                        </div>

                        <div className="cd-images-cont">
                            <h3>Photos</h3>
                            <div className="cd-images">
                                {/* {contractor.image.slice(1).map((image, index) => (
                                    <img key={index} src={image} alt='' />
                                ))} */}
                                {/* {contractor && contractor.image && contractor.image.map((image, index) => (
                                    // <img key={index} src={`http://localhost:8080/uploaded/${image}`} alt='' />
                                ))} */}
                                {contractor && contractor.image && contractor.image.slice(1).map((image, index) => (
                                    <img key={index} src={image} alt='' />
                                ))}
                            </div>
                        </div>

                        {/* {isSupplierAuthenticated && (
                            <div className="cd-logout-btn">
                                <button type='submit' onClick={handleLogout}>Logout</button>
                            </div>
                        )} */}
                        {loggedContractor && loggedContractor.id === id && (
                            <div className="cd-logout-btn">
                                <button type="submit" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
            <SendEnquiry open={sendEnquiryOpen} setOpen={setSendEnquiryOpen} />
        </div>
    )
}

export default ViewDetails;
