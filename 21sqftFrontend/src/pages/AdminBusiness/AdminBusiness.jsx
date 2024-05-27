import React, { useState, useEffect } from 'react'
import "./adminbusiness.css"
import { PulseLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { CiLocationOn } from "react-icons/ci";
import { getAllContractor } from '../../redux/actions/contractorAction';
import { contractorStatusEdit } from '../../redux/actions/adminAction';

const AdminBusiness = () => {

    const [acceptPopup, setAcceptPopup] = useState(false);
    const [rejectPopup, setRejectPopup] = useState(false);

    const { loading, contractor } = useSelector(state => state.contractorReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllContractor());
    }, [dispatch]);

    const decodeImage = (base64Data) => {
        return `${base64Data}`;
    };

    const handleApproval = async (status, _id) => {
        try {
            // Dispatch the action to update business status
            const response = await dispatch(contractorStatusEdit(status, _id));
            if (response) {
                dispatch(getAllContractor());
                setAcceptPopup(false);
                setRejectPopup(false);
            }
        } catch (error) {
            // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
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
        <div className='hdash'>
            <div className="hdash-cont">
                <div className="left-hdash">
                    <AdminSidebar />
                </div>
                <div className="right-hdash">

                    <div className="business-cards-cont">
                        {contractor && contractor?.contractors && contractor?.contractors?.length > 0 ? (
                            contractor.contractors
                                .filter(business => business.status === 'Pending') // Filter contractors array by status
                                .map((business, index) => (
                                    <div className="business-card" key={index}>
                                        <div className="ab-service-name">
                                            <span>{business.service}</span>
                                        </div>
                                        <div className="ab-card-flex">
                                            <div className="ab-card-img">
                                                {business.image && business.image.length > 0 && (
                                                    <img src={decodeImage(business.image[0])} alt='' />
                                                )}
                                            </div>

                                            <div className="ab-card-info">
                                                <h4 className='ab-card-name'>{business.name}</h4>
                                                <p className='abc-short-desc' >{business.shortDescription}</p>
                                                <div className="abc-price">{`$ ${business.price}`}</div>
                                                <div className="abc-location">
                                                    <span>
                                                        <CiLocationOn />
                                                        {`${business.city} ${business.state}`}
                                                    </span>
                                                </div>
                                                <div className="abc-buttons">
                                                    <button type="submit" className='abc-send-btn'
                                                        onClick={() => setAcceptPopup(business._id)}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button type="submit" className='abc-view-btn'
                                                        onClick={() => setRejectPopup(business._id)}
                                                    >
                                                        Reject
                                                    </button>
                                                    {/* Accept popup */}
                                                    <Dialog
                                                        maxWidth="sm"
                                                        open={acceptPopup === business._id}
                                                        onClose={() => setAcceptPopup(null)}
                                                    >
                                                        <DialogContent>
                                                            <div className="ajr-popup">
                                                                <h3>Are you sure you want to consider this business?</h3>
                                                                <div className="ajr-popup-btn-cont">
                                                                    <button className='ajr-popup-yes-btn' onClick={() => handleApproval('Accepted', business._id)} > Yes </button>
                                                                    <button className='ajr-popup-no-btn' onClick={() => setAcceptPopup(false)} > No </button>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>

                                                    {/* reject popup */}
                                                    <Dialog
                                                        maxWidth="sm"
                                                        open={rejectPopup === business._id}
                                                        onClose={() => setRejectPopup(null)}

                                                    >
                                                        <DialogContent>
                                                            <div className="ajr-popup">
                                                                <h3> Are you sure you want to reject this business?</h3>
                                                                <div className="ajr-popup-btn-cont">
                                                                    <button className='ajr-popup-yes-btn' onClick={() => handleApproval('Rejected', business._id)} > Yes </button>
                                                                    <button className='ajr-popup-no-btn' onClick={() => setRejectPopup(false)} > No </button>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div div className="right-hdash-cont">
                                <h3>No pending business</h3>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div >
    )
}

export default AdminBusiness