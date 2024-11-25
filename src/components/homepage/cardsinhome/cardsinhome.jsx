import React, { useState, useEffect } from 'react'
import './cardsinhome.css'
// import "./upcategory.css"
// import Send from '../../../pages/categorypage/Popup/Send'
// import ViewDetails from './ViewDetails'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setLike } from '../../../redux/actions/likeAction'
import { setFetch } from '../../../redux/actions/fetchcardsAction';
import { useSelector } from 'react-redux';

function Cardsinhome() {
    const dispatch = useDispatch('')
    useEffect(() => {
        dispatch(setFetch());
    }, [dispatch]);
    const { data } = useSelector(state => state.fetchReducer);
    const handleFetch = (id) => {
        // e.preventDefault()
        dispatch(setFetch(id))
    }
    const [like, setLiked] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setLike(like))
        // axios.post('http://localhost:8000/api/auth/like', { like })
    }
    const [payment, setPayment] = useState(false)
    const band = () => setPayment(false)
    const Mymodel = () => {
        setPayment(true);
    }

    const navigate = useNavigate();
    const handleRedirect = (id) => {
        navigate('/ViewDetails', { state: { id } });
    };

    // const navigate1 = useNavigate();
    // const handleRedirect1 = () => {
    // navigate1('/Searcher');
    // };

    return (
        <>
            <div>
                <h1 className='cardsinhome-head'>Recently Viewed</h1>
            </div>
            <div className="cardsinhome-main">
                {data && data.myData.map((item) => (
                    <div className="doubleCard-inhome" key={item.id} onClick={() => handleFetch(item.id)}>
                        {/* <div className="full0"> */}
                        {/*  */}
                        <div className="construction">
                            <div className="mm">
                                <div className="mm2"></div>
                                <span className='upper'>Construction</span>
                            </div>
                            <div className="cont10">
                                <div className="photo">
                                    <img className='img10' src='https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg' alt='' />
                                </div>
                                <div className="right">
                                    <h4>{item.name}</h4>
                                    <p className='sme'>{item.name} Co. for your for your next Construction project</p>
                                    <div className='t30'>$100 to $200 per square foot</div>
                                    <div className="loca0">
                                        <span><i className="fa-solid fa-location-dot"></i>{item.city},{item.state}</span>
                                    </div>
                                    <div className="uright10">
                                        <button type='submit' onClick={Mymodel} className='numbtn'> Send Enquiry</button>
                                        <button type='submit' onClick={() => handleRedirect(item)} className='numbtn0'>View Details</button>
                                        <i className="fa-regular fa-heart" onChange={(e) => setLiked(e.target.value)} onSubmit={handleSubmit}></i>
                                        {/* {payment && <Send band={band} />} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*------------------- 2nd------------------------------------------------------------------------------------- */}
                        {/* <div className="full1"> */}
                        {/* <span className='upper'>Construction</span> */}
                        {/* <div className="construction"> */}
                        {/* <div className="mm"> */}
                        {/* <div className="mm2"></div> */}
                        {/* <span className='upper'>Construction</span> */}
                        {/* </div> */}
                        {/* <div className="cont10"> */}
                        {/* <div className="photo"> */}
                        {/* <img className='img10' src='https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg' alt='' /> */}
                        {/* </div> */}
                        {/* <div className="right"> */}
                        {/* <h4>Shubham Construction Co.</h4> */}
                        {/* <p className='sme'>Shubham Construction Co. for your for your next Construction project</p> */}
                        {/* <div className='t30'>$100 to $200 per square foot</div> */}
                        {/* <div className="loca0"> */}
                        {/* <span><i className="fa-solid fa-location-dot"></i>Greater Noida Uttar Pradesh</span> */}
                        {/* </div> */}
                        {/* <div className="uright10"> */}
                        {/* <button type='submit' onClick={Mymodel} className='numbtn'> Send Enquiry</button> */}
                        {/* <button type='submit' onClick={handleRedirect} className='numbtn0'>View Details</button> */}
                        {/* <i className="fa-regular fa-heart" onChange={(e) => setLiked(e.target.value)} onSubmit={handleSubmit}></i> */}
                        {/* {payment && <Send band={band} />}    */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* </div> */}
                    </div>
                ))}
                {/* --------------------------second double------------------------------------------------------------------------ */}
                {/* <div className="doubleCard-inhome"> */}
                {/* <div className="full0"> */}
                {/*  */}
                {/* <div className="construction"> */}
                {/* <div className="mm"> */}
                {/* <div className="mm2"></div> */}
                {/* <span className='upper'>Construction</span> */}
                {/* </div> */}
                {/* <div className="cont10"> */}
                {/* <div className="photo"> */}
                {/* <img className='img10' src='https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg' alt='' /> */}
                {/* </div> */}
                {/* <div className="right"> */}
                {/* <h4>Shubham Construction Co.</h4> */}
                {/* <p className='sme'>Shubham Construction Co. for your for your next Construction project</p> */}
                {/* <div className='t30'>$100 to $200 per square foot</div> */}
                {/* <div className="loca0"> */}
                {/* <span><i className="fa-solid fa-location-dot"></i>Greater Noida Uttar Pradesh</span> */}
                {/* </div> */}
                {/* <div className="uright10"> */}
                {/* <button type='submit' onClick={Mymodel} className='numbtn'> Send Enquiry</button> */}
                {/* <button type='submit' onClick={handleRedirect} className='numbtn0'>View Details</button> */}
                {/* <i className="fa-regular fa-heart" onChange={(e) => setLiked(e.target.value)} onSubmit={handleSubmit}></i> */}
                {/* {payment && <Send band={band} />}    */}
                {/* </div> */}
                {/* </div> */}
                {/* </div> */}
                {/* </div> */}
                {/*------------------- 2nd------------------------------------------------------------------------------------- */}
                {/* <div className="full1"> */}
                {/* <span className='upper'>Construction</span> */}
                {/* <div className="construction"> */}
                {/* <div className="mm"> */}
                {/* <div className="mm2"></div> */}
                {/* <span className='upper'>Construction</span> */}
                {/* </div> */}
                {/* <div className="cont10"> */}
                {/* <div className="photo"> */}
                {/* <img className='img10' src='https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg' alt='' /> */}
                {/* </div> */}
                {/* <div className="right"> */}
                {/* <h4>Shubham Construction Co.</h4> */}
                {/* <p className='sme'>Shubham Construction Co. for your for your next Construction project</p> */}
                {/* <div className='t30'>$100 to $200 per square foot</div> */}
                {/* <div className="loca0"> */}
                {/* <span><i className="fa-solid fa-location-dot"></i>Greater Noida Uttar Pradesh</span> */}
                {/* </div> */}
                {/* <div className="uright10"> */}
                {/* <button type='submit' onClick={Mymodel} className='numbtn'> Send Enquiry</button> */}
                {/* <button type='submit' onClick={handleRedirect} className='numbtn0'>View Details</button> */}
                {/* <i className="fa-regular fa-heart" onChange={(e) => setLiked(e.target.value)} onSubmit={handleSubmit}></i> */}
                {/* {payment && <Send band={band} />}    */}
                {/* </div> */}
                {/* </div> */}
                {/* </div> */}
                {/* </div> */}
                {/* </div> */}
                {/* </div> */}
            </div>
        </>
    )
}

export default Cardsinhome;