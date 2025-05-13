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
import { deleteSupplierAccount, getSupplier, supplierLogout } from '../../redux/actions/supplierAuthAction';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

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

    // State to track if cookie "21sqft" exists
    const [isTokenAvailable, setIsTokenAvailable] = useState(false);
    const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

    // Helper function to check if a specific cookie exists
    const getCookie = (name) => {
        const cookieArr = document.cookie.split(";");
        for (let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].split("=");
            if (name === cookiePair[0].trim()) {
                return cookiePair[1];
            }
        }
        return null;
    };

    // Check for the token in cookies on component mount
    useEffect(() => {
        const token = getCookie("21sqft");
        if (token) {
            setIsTokenAvailable(true);
        }
    }, []);

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

    // const deleteCookie = (name) => {
    //     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    // };
    const deleteCookie = (name, path = '/', domain = '') => {
        console.log(`Deleting cookie: ${name}`);
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain};`;
    };
    // const handleLogout = () => {
    //     // Assuming the path is '/' and domain is '' (default domain)
    //     deleteCookie('21sqft', '/', ''); 
    //     // Perform any other logout actions here (e.g., dispatching logout actions)
    //     // dispatch(supplierLogout(navigate)); // Uncomment if needed
    //     navigate('/');
    // };



    // const handleLogout = () => {
    //     deleteCookie('21sqft');
    //     // dispatch(supplierLogout(navigate));
    //     navigate('/');
    // };

    const handleLogout = () => {
        dispatch(supplierLogout(navigate));
        // Call API to fetch data again
        dispatch(getSupplier());
    };

    const handleDeleteAccount = async (id) => {
        try {
            dispatch(deleteSupplierAccount(id, navigate));
        } catch (error) {
            console.error("Error deleting account:", error);
        }
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
                                {loggedContractor && loggedContractor._id === id ? (
                                    <div className="cd-edit-btn">
                                        <div className="cd-logout-btn">
                                            <button type="submit" onClick={handleLogout}>
                                                Logout
                                            </button>
                                            <button type="submit" onClick={() => setDeleteAccountModalOpen(true)}>
                                                Delete Account
                                            </button>
                                            <Dialog
                                                open={deleteAccountModalOpen}
                                                onClose={() => setDeleteAccountModalOpen(false)}
                                                fullWidth={true} // Set to true to make the dialog take up the full width
                                                maxWidth="xs"
                                                PaperProps={{ style: { backgroundColor: '#F6F6F6', borderRadius: '20px' } }}
                                            >
                                                <DialogContent>
                                                    <div className="modal-form">
                                                        <h3 className="h3">Are you sure you want to delete this account? This action cannot be undone.</h3>
                                                        <div className='vd-del-acc-btns'>
                                                            <button className="cancel-button" onClick={() => setDeleteAccountModalOpen(false)}>
                                                                Cancel
                                                            </button>
                                                            <button className="primary-button" onClick={() => handleDeleteAccount(id)} disabled={loading}>
                                                                {loading ? 'Deleting...' : 'Delete'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>

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
                                    {isTokenAvailable && (
                                        <span className='t2'><FaPhoneAlt />{contractor.phoneNo}</span>
                                    )}
                                    <span className='t3'>Rs {contractor.price}</span>
                                </div>
                                <div className="cd-address">
                                    <span><CiLocationOn /> {contractor.city} {contractor.state}</span>
                                </div>
                            </div>
                        </div>

                        {contractor.description && contractor.description.trim() !== "" && (
                            <div className="cd-aboutus">
                                <h3>About Us</h3>
                                <p>{contractor.description}</p>
                            </div>
                        )}

                        {contractor.image && contractor.image.length > 1 && (
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
                        )}

                        {/* {isSupplierAuthenticated && (
                            <div className="cd-logout-btn">
                                <button type='submit' onClick={handleLogout}>Logout</button>
                            </div>
                        )} */}
                        {/* {loggedContractor && loggedContractor._id === id && (
                            <div className="cd-logout-btn">
                                <button type="submit" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )} */}
                    </div>
                )}
            </div>
            <Footer />
            <SendEnquiry open={sendEnquiryOpen} setOpen={setSendEnquiryOpen} />
        </div>
    )
}

export default ViewDetails;






















// in this edit code there is an issue in this code when i am edit the supplier but after a edit me user ke authenticate hone pr kuch button show kr rha hu jese edit , logout vo remove ho jate h and even when i am come again on the view details page then route me id bhi undefied show krne lgta h pr reducer me data hota h   this is the view details page code import React, { useState, useEffect } from 'react'
// import './viewdetails.css'
// import Navbar from '../../components/homepage/Navbar/navbar'
// import Footer from '../../components/homepage/footer/footer'
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getContractorDetail } from '../../redux/actions/contractorAction';
// import SendEnquiry from '../../containers/SendEnquiry/SendEnquiry';
// import { PulseLoader } from 'react-spinners';
// import { FaPhoneAlt, FaRegEdit } from 'react-icons/fa';
// import { CiLocationOn } from "react-icons/ci";
// import SupplierEditSidebar from '../../containers/SupplierEditSidebar/SupplierEditSidebar';
// import { getSupplier, supplierLogout } from '../../redux/actions/supplierAuthAction';

// function ViewDetails() {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { loading, contractorDetail } = useSelector(state => state.contractorReducer);
//     const { supplier } = useSelector(state => state.supplierAuthReducer);
//     const [sendEnquiryOpen, setSendEnquiryOpen] = useState(false);
//     const [showEditProfileSidebar, setShowEditProfileSidebar] = useState(false);

//     const [isTokenAvailable, setIsTokenAvailable] = useState(false);

//     const getCookie = (name) => {
//         const cookieArr = document.cookie.split(";");
//         for (let i = 0; i < cookieArr.length; i++) {
//             const cookiePair = cookieArr[i].split("=");
//             if (name === cookiePair[0].trim()) {
//                 return cookiePair[1];
//             }
//         }
//         return null;
//     };

//     useEffect(() => {
//         const token = getCookie("21sqft");
//         if (token) {
//             setIsTokenAvailable(true);
//         }
//     }, []);

//     useEffect(() => {
//         dispatch(getContractorDetail(id)); 
//     }, [dispatch, id]);

//     const contractor = contractorDetail ? contractorDetail.contractor : null;
//     const loggedContractor = supplier ? supplier.contractor : null;

//     // Function to handle opening the dialog
//     const handleSendEnquiryOpen = () => {
//         setSendEnquiryOpen(true);
//     };

//     const openEditProfileSidebar = () => {
//         setShowEditProfileSidebar(true);
//     };

//     const closeEditProfileSidebar = () => {
//         setShowEditProfileSidebar(false);
//     };

//     const handleLogout = () => {
//         dispatch(supplierLogout(navigate));
//         dispatch(getSupplier());
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
//         <div className='cont-detail-cont'>
//             <div className="cd-header">
//                 <Navbar />
//             </div>
//             <div className="contractor-detail">
//                 {contractor && (
//                     <div className="cd-cont">
//                         <div className="top-cd">
//                             <div className="top-left-img-cont">
//                                 {contractor && contractor.image && contractor.image[0] && (
//                                     <img src={contractor.image[0]} alt='' />
//                                 )}
//                             </div>
//                             <div className="top-right-cont">
//                                 {loggedContractor && loggedContractor.id === id ? (
//                                     <div className="cd-edit-btn">
//                                         <button onClick={openEditProfileSidebar}>
//                                             Edit <FaRegEdit />
//                                         </button>
//                                         {showEditProfileSidebar && (
//                                             <SupplierEditSidebar
//                                                 SupplierEditProfileSidebar={closeEditProfileSidebar}
//                                             />
//                                         )}
//                                     </div>
//                                 ) : (
//                                     <div className="cd-send-enq-btn">
//                                         <button type="submit" onClick={handleSendEnquiryOpen}>
//                                             Send Enquiry
//                                         </button>
//                                     </div>
//                                 )}
//                                 <h4>{contractor.name}</h4>
//                                 <p>{contractor.shortDescription}</p>
//                                 <div className="cd-details">
//                                     <span className='t1'>Service-{contractor.service}</span>
//                                     {isTokenAvailable && (
//                                         <span className='t2'><FaPhoneAlt />{contractor.phoneNo}</span>
//                                     )}
//                                     <span className='t3'>Rs {contractor.price}</span>
//                                 </div>
//                                 <div className="cd-address">
//                                     <span><CiLocationOn /> {contractor.city} {contractor.state}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {contractor.description && contractor.description.trim() !== "" && (
//                             <div className="cd-aboutus">
//                                 <h3>About Us</h3>
//                                 <p>{contractor.description}</p>
//                             </div>
//                         )}

//                         {contractor.image && contractor.image.length > 1 && (
//                             <div className="cd-images-cont">
//                                 <h3>Photos</h3>
//                                 <div className="cd-images">
//                                     {contractor && contractor.image && contractor.image.slice(1).map((image, index) => (
//                                         <img key={index} src={image} alt='' />
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                         {loggedContractor && loggedContractor.id === id && (
//                             <div className="cd-logout-btn">
//                                 <button type="submit" onClick={handleLogout}>
//                                     Logout
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//             <Footer />
//             <SendEnquiry open={sendEnquiryOpen} setOpen={setSendEnquiryOpen} />
//         </div>
//     )
// }

// export default ViewDetails;
//    and this is the edit profile code      import React, { useEffect, useRef, useState } from 'react' 
// import './suppliereditsidebar.css'
// import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
// import Drawer from '@mui/material/Drawer';
// import { supplierEditProfile } from '../../redux/actions/supplierAuthAction';
// import { PulseLoader } from 'react-spinners';
// import validator from 'validator';

// function SupplierEditSidebar({ SupplierEditProfileSidebar }) {

//     const { loading, supplier } = useSelector(state => state.supplierAuthReducer);

//     const [name, setName] = useState(supplier?.contractor?.name || '')
//     const [email, setEmail] = useState(supplier?.contractor?.email || '')
//     const [phoneNo, setPhoneNo] = useState(supplier?.contractor?.phoneNo || '')
//     const [service, setService] = useState(supplier?.contractor?.service || '')
//     const [address, setAddress] = useState(supplier?.contractor?.address || '')
//     const [city, setCity] = useState(supplier?.contractor?.city || '')
//     const [state, setState] = useState(supplier?.contractor?.state || '')
//     const [price, setPrice] = useState(supplier?.contractor?.price || '')
//     const [shortDescription, setShortDescription] = useState(supplier?.contractor?.shortDescription || '')
//     const [description, setDescription] = useState(supplier?.contractor?.description || '')
//     const [images, setImages] = useState([]);

//     const dispatch = useDispatch()

//     useEffect(() => {
//         if (supplier && supplier?.contractor) {
//             setName(supplier?.contractor?.name || '');
//             setEmail(supplier?.contractor?.email || '');
//             setPhoneNo(supplier?.contractor?.phoneNo || '');
//             setService(supplier?.contractor?.service || '');
//             setAddress(supplier?.contractor?.address || '');
//             setCity(supplier?.contractor?.city || '');
//             setState(supplier?.contractor?.state || '');
//             setPrice(supplier?.contractor?.price || '');
//             setShortDescription(supplier?.contractor?.shortDescription || '');
//             setDescription(supplier?.contractor?.description || '');
//             setImages(supplier?.contractor?.image || '');
//         }
//     }, [supplier]);

//     useEffect(() => {
//         document.body.style.overflowY = 'hidden';
//         return () => {
//             document.body.style.overflowY = 'scroll';
//         };
//     }, []);
//              const handleSave = async (e) => {
//         try {
//             e.preventDefault();
//             if (
//                 !name ||
//                 !email ||
//                 !phoneNo ||
//                 !service ||
//                 !address ||
//                 !city ||
//                 !state ||
//                 !price ||
//                 !shortDescription ||
//                 !description
//             ) {
//                 toast.error("All fields are required");
//             }
//             else if (!validator.isMobilePhone(phoneNo, 'en-IN')) {
//                 toast.error('Please enter a valid phone number');
//             } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || !validator.isEmail(email)) {
//                 toast.error("Invalid Email")
//             } else if (images.length === 0) {
//                 toast.error('Please upload at least one image');
//             } else {
//                 const supplierEditProfileData = {
//                     name: name,
//                     email: email,
//                     phoneNo: phoneNo,
//                     service: service,
//                     address: address,
//                     city: city,
//                     state: state,
//                     price: price,
//                     shortDescription: shortDescription,
//                     description: description,
//                     images: images
//                 };

//                 dispatch(supplierEditProfile(supplierEditProfileData));
//             }
//         } catch (error) {
//             console.error('Something went wrong:', error);
//         }
//     };

//     return (
//         <Drawer
//             anchor="right" // Anchor the drawer to the right side
//             open={true} // Always open when rendered
//             onClose={SupplierEditProfileSidebar} // Close the drawer when clicking outside
//         >
//             <div className="sep-modal">
//                 {loading ? (
//                     <div style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         height: '100vh'
//                     }}>
//                         <PulseLoader color="#FECC00" />
//                     </div>
//                 ) : (
//                     <form className="sep-modal-form">

//                         <div className="sep-modal-form-field">
//                             <label>
//                                 Name
//                                 <input
//                                     type="text"
//                                     placeholder='Enter your name'
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                 />
//                             </label>
//                             <label>
//                                 Email
//                                 <input
//                                     type="email"
//                                     placeholder='Enter your email'
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </label>
//                         </div>
//                         <div className="sep-modal-form-field">
//                             <label>
//                                 Phone no
//                                 <input
//                                     type="text"
//                                     placeholder='Enter your Phone Number'
//                                     value={phoneNo}
//                                     onChange={(e) => setPhoneNo(e.target.value)}
//                                 />
//                             </label>
//                             <label>
//                                 Services
//                                 <input
//                                     type="text"
//                                     placeholder='Enter your Service'
//                                     value={service}
//                                     onChange={(e) => setService(e.target.value)}
//                                 />
//                             </label>
//                         </div>
//                         <div className="sep-modal-form-field">
//                             <label>
//                                 Address
//                                 <input
//                                     type="text"
//                                     placeholder='Enter your Address'
//                                     value={address}
//                                     onChange={(e) => setAddress(e.target.value)}
//                                 />
//                             </label>
//                         </div>
//                         <div className="sep-modal-form-field">
//                             <label>
//                                 City
//                                 <input
//                                     type="text"
//                                     placeholder='Enter your City'
//                                     value={city}
//                                     onChange={(e) => setCity(e.target.value)}
//                                 />
//                             </label>
//                             <label>
//                                 State
//                                 <input
//                                     type="text"
//                                     placeholder='Enter your State'
//                                     value={state}
//                                     onChange={(e) => setState(e.target.value)}
//                                 />
//                             </label>
//                             <label>
//                                 Price
//                                 <input
//                                     type="text"
//                                     placeholder='Enter your Price'
//                                     value={price}
//                                     onChange={(e) => setPrice(e.target.value)}
//                                 />
//                             </label>
//                         </div>
//                         <div className="sep-modal-form-field">
//                             <label>
//                                 Short Description
//                                 <input
//                                     type="text"
//                                     placeholder='Enter your Short Description'
//                                     value={shortDescription}
//                                     onChange={(e) => setShortDescription(e.target.value)}
//                                 />
//                             </label>
//                         </div>
//                         <div className="sep-modal-form-field">
//                             <label>
//                                 Description
//                                 <textarea
//                                     placeholder='Enter your Description'
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 />
//                             </label>
//                         </div>

//                         <button type='submit' className='sep-modal-save-btn' onClick={handleSave}>Save</button>

//                     </form>
//                 )}
//             </div>
//         </Drawer>
//     )
// }

// export default SupplierEditSidebar                 this is the action code      export const supplierEditProfile = (supplierEditProfileData) => async (dispatch) => {
//   try {
//     dispatch({ type: SUPPLIER_EDIT_REQUEST });
//     const token = Cookies.get('21sqft');

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       }
//     };
//     const response = await axiosRequest.put(
//       `/contractor/edit`,
//       supplierEditProfileData,
//       config,
//     );

//     dispatch({
//       type: SUPPLIER_EDIT_SUCCESS,
//       payload: response?.data,
//     });
//     toast.success(response?.data?.message || "Profile Updated Successfully");
//     return response.data;

//   } catch (error) {
//     dispatch({
//       type: SUPPLIER_EDIT_FAILURE,
//       payload: error.response?.data?.message || 'Something Went Wrong',
//     });
//     toast.error(error.response?.data?.message || 'Something Went Wrong');
//   }
// };          and this is the reducer code       import {
//   GET_SUPPLIER_FAILURE,
//   GET_SUPPLIER_REQUEST,
//   GET_SUPPLIER_SUCCESS,
//   SUPPLIER_EDIT_FAILURE,
//   SUPPLIER_EDIT_REQUEST,
//   SUPPLIER_EDIT_SUCCESS,
//   SUPPLIER_LOGIN_FAILURE,
//   SUPPLIER_LOGIN_REQUEST,
//   SUPPLIER_LOGIN_SUCCESS,
//   SUPPLIER_LOGOUT_FAIL,
//   SUPPLIER_LOGOUT_REQUEST,
//   SUPPLIER_LOGOUT_SUCCESS,
//   SUPPLIER_REGISTER_FAILURE,
//   SUPPLIER_REGISTER_REQUEST,
//   SUPPLIER_REGISTER_SUCCESS,
//   SUPPLIER_FORGOT_PASSWORD_OTP_SEND_REQUEST,
//   SUPPLIER_FORGOT_PASSWORD_OTP_SEND_SUCCESS,
//   SUPPLIER_FORGOT_PASSWORD_OTP_SEND_FAIL,
//   SUPPLIER_FORGOT_PASSWORD_OTP_VERIFY_REQUEST,
//   SUPPLIER_FORGOT_PASSWORD_OTP_VERIFY_SUCCESS,
//   SUPPLIER_FORGOT_PASSWORD_OTP_VERIFY_FAIL,
//   SUPPLIER_SET_NEW_PASSWORD_REQUEST,
//   SUPPLIER_SET_NEW_PASSWORD_SUCCESS,
//   SUPPLIER_SET_NEW_PASSWORD_FAIL,
// } from "../constants/supplierAuthConstant";

// const initialState = {
//   loading: false,
//   error: null,
//   success: false,
//   supplier: null,
//   // isSupplierAuthenticated: false
//   otpSend: false,
//   otpVerify: false,
// };

// export const supplierAuthReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SUPPLIER_REGISTER_REQUEST:
//     case SUPPLIER_LOGIN_REQUEST:
//     case GET_SUPPLIER_REQUEST:
//     case SUPPLIER_EDIT_REQUEST:
//     case SUPPLIER_LOGOUT_REQUEST:
//     case SUPPLIER_FORGOT_PASSWORD_OTP_SEND_REQUEST:
//     case SUPPLIER_FORGOT_PASSWORD_OTP_VERIFY_REQUEST:
//     case SUPPLIER_SET_NEW_PASSWORD_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//         success: false,
//         isSupplierAuthenticated: false
//       };

//     case SUPPLIER_REGISTER_SUCCESS:
//     case SUPPLIER_LOGIN_SUCCESS:
//     case GET_SUPPLIER_SUCCESS:
//     case SUPPLIER_EDIT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         success: true,
//         supplier: action.payload,
//         error: null,
//         isSupplierAuthenticated: true
//       };

//     case SUPPLIER_FORGOT_PASSWORD_OTP_SEND_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         otpSend: true,
//       }

//     case SUPPLIER_FORGOT_PASSWORD_OTP_VERIFY_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         otpVerify: true,
//       }

//     case SUPPLIER_SET_NEW_PASSWORD_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         otpSend: false,
//         otpVerify: false,
//       };

//     case SUPPLIER_FORGOT_PASSWORD_OTP_SEND_FAIL:
//     case SUPPLIER_FORGOT_PASSWORD_OTP_VERIFY_FAIL:
//     case SUPPLIER_SET_NEW_PASSWORD_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.error,
//       };

//     case SUPPLIER_REGISTER_FAILURE:
//     case SUPPLIER_LOGIN_FAILURE:
//     case GET_SUPPLIER_FAILURE:
//     case SUPPLIER_EDIT_FAILURE:
//     case SUPPLIER_LOGOUT_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.error,
//         supplier: null,
//         success: false,
//         isSupplierAuthenticated: false
//       };

//     case SUPPLIER_LOGOUT_SUCCESS:
//       return {
//         ...state,
//         supplier: null,
//         error: null,
//         loading: false,
//         isSupplierAuthenticated: false
//       };

//     default:
//       return state;
//   }
// };

// export default supplierAuthReducer; 