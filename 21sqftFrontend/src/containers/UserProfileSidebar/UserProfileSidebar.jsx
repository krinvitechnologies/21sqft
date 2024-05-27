
import React, { useEffect, useState } from 'react';
import './userprofilesidebar.css'
import Drawer from '@mui/material/Drawer';
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { userEditProfile, userLogout } from '../../redux/actions/userAuthAction';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UserProfileSidebar({ UserProfileSidebar }) {

    const { loading, user } = useSelector(state => state.userReducer);

    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [email, setEmail] = useState(user?.user?.email || '');
    const [userName, setUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    useEffect(() => {
        if (user && user?.user) {
            setUserName(user?.user?.userName || '');
            setEmail(user?.user?.email || '');
        }
    }, [user]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(userLogout(navigate));
    };

    const handleEditProfile = () => {
        // Open the edit profile drawer
        setEditProfileOpen(true);
    };

    const handleCloseEditProfile = () => {
        setEditProfileOpen(false);
    };

    const handleSaveProfile = async (e) => {
        try {
            e.preventDefault();
            if (!userName || !email || !newPassword || !confirmPassword) {
                toast.error("All fields are required");
            } else if (newPassword !== confirmPassword) {
                toast.error("Passwords do not match");
            } else {
                const userEditProfileData = {
                    userName,
                    email,
                    newPassword,
                    confirmPassword
                };
                const response = await dispatch(userEditProfile(userEditProfileData));
                if (response && response.success) {
                    // Clear input fields upon successful profile update
                    setEmail("");
                    setUserName("");
                    setNewPassword("");
                    setConfirmPassword("");
                    handleCloseEditProfile();
                    // Close the profile drawer if it's open
                    UserProfileSidebar && UserProfileSidebar();
                }
            }
        } catch (error) {
            console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
            // toast.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
        }
    };

    // if (loading) {
    //     return <div style={{
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         height: '100vh'
    //     }}>
    //          <PulseLoader color="#FECC00" />
    //     </div>
    // }

    return (
        <Drawer
            anchor="right" // Anchor the drawer to the right side
            open={true} // Always open when rendered
            onClose={UserProfileSidebar} // Close the drawer when clicking outside
        >
            <div className='up-sidebar'>
                <div className="top-ups">
                    <div className='ups-name-cont'>
                        <img src="/image/profile.png" alt="" />
                        <span>{user?.user?.userName}</span>
                    </div>
                    <div className='ups-email-cont'>
                        <span>Email: {user?.user?.email}</span>
                    </div>
                    <div>
                        <button onClick={handleEditProfile} className='ups-edit-profile-btn'><FaRegEdit /> Edit Profile</button>
                        <Drawer
                            anchor="right"
                            open={editProfileOpen}
                            onClose={handleCloseEditProfile}
                        >
                            <div className="ups-edit-profile-content">
                                {loading ? (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100vh',
                                        width: '100%'
                                    }}>
                                        <PulseLoader color="#A6A9AC" />
                                    </div>
                                ) : (
                                    <div>
                                        <button className='ups-edit-profile-btn'><FaRegEdit /> Edit Profile</button>
                                        <div className='ups-edit-form-cont'>
                                            <label>
                                                Email Address
                                                <input
                                                    type="email"
                                                    placeholder='Enter your Email Address'
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </label>
                                            <label>
                                                User name
                                                <input
                                                    type="text"
                                                    placeholder='Enter your User name'
                                                    value={userName}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                />
                                            </label>
                                            <label>
                                                New Password
                                                <input
                                                    type="password"
                                                    placeholder='Enter your Password'
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                />
                                            </label>
                                            <label>
                                                Confirm Password
                                                <input
                                                    type="password"
                                                    placeholder='Enter your Password'
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <button className='ups-save-btn' onClick={handleSaveProfile}>Save</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Drawer>
                    </div>
                </div>

                <div className='ups-logout-btn'>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </Drawer>
    )
}

export default UserProfileSidebar