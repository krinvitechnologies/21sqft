
import React, { useState } from 'react'
import "./adminsidebar.css"
import { FaArrowLeftLong, FaBars } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdClose } from "react-icons/md";
// import { useDispatch, useSelector } from 'react-redux';
// import { AdminLogoutRequest } from '../../../redux/actions/HNauthAction';
import Cookies from 'js-cookie';

const AdminSidebar = () => {

    // eslint-disable-next-line
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [isBars, setIsBars] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleSideNav = () => {
        // toggleMenu(); // Toggle the side navigation
        setIsBars(!isBars); // Toggle the FaBars/MdClose icon
    };

    const handleLogout = () => {
        Cookies.remove('21sqft');
        // dispatch(AdminLogoutRequest());
        navigate('/');
    };

    return (
        <div className={`hdprofile ${isContentVisible ? 'show-sidebar' : ''}`}>
            {/* <div className='hdprofile'> */}
            <div className="hdpro-cont">
                <div className={`left-hdpro ${isContentVisible ? 'show-sidebar' : ''}`}>
                    {/* <div className="left-hdpro"> */}
                    <div className="left-hdpro-cont">
                        <div className="top-hleft-card">
                            <Link to="/" className='hleftcard-link'>
                                <button className='hdpro-back-btn'><FaArrowLeftLong /></button>
                            </Link>
                            {/* <button className='hlc-bar-btn' onClick={handleFabarClick}><FaBars /></button> */}

                            <div className="navbar-toggle" onClick={toggleMenu} >
                                <button
                                    // onClick={handleCancel}
                                    onClick={toggleSideNav}
                                    className='hlc-bar-btn'
                                >
                                    {isBars ? (
                                        <FaBars />
                                    ) : (
                                        <MdClose />
                                    )}
                                </button>

                            </div>
                        </div>

                        <div className={`items ${showMenu ? 'open' : ''}`} >
                            {/* {isContentVisible && ( */}
                            <div className='bottom-sidnav-hlc'>

                                <div className="krinvilogo-img-cont">
                                    {/* <img src="/assests/kt.png" alt="Krinvi" /> */}
                                    <div className="hlc-logo">
                                        <div>A</div>
                                    </div>
                                    <h3>Admin</h3>
                                </div>

                                <div className="hlc-mid-bottom-combine">

                                    <div className="hlc-mid-cont">

                                        <Link to="/admin/business" className='hleftcard-link'>
                                            <button
                                                className={`hdpro-text-list ${location.pathname === '/admin/business' ? 'active' : ''
                                                    }`}
                                            >
                                                Business
                                            </button>
                                        </Link>
                                        <Link to="/admin/posters" className='hleftcard-link'>
                                            <button
                                                className={`hdpro-text-list ${location.pathname === '/admin/posters' ? 'active' : ''
                                                    }`}
                                            >
                                                Posters
                                            </button>
                                        </Link>
                                        <Link to="/admin/blogs" className='hleftcard-link'>
                                            <button
                                                className={`hdpro-text-list ${location.pathname === '/admin/blogs' ? 'active' : ''
                                                    }`}
                                            >
                                                Blogs
                                            </button>
                                        </Link>

                                    </div>
                                    <div className="hlc-bottom-cont">
                                        <button className='hdpro-logoutbtn' onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>

                            </div>
                            {/* )} */}
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar