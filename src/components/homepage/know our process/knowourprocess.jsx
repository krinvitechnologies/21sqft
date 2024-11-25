import React from 'react'
import './knowourprocess.css'
// import img from './knowourprocess images/div.layer-image-wrapper.png'
// import yellow from './knowourprocess images/div.icon-box.png'
// import pseudo from './knowourprocess images/pseudo.png'
import diversity from './knowourprocess images/Group 274 (1)diversity.png'
import supplier from './knowourprocess images/Group 275 (1)supplier.png'
import call from './knowourprocess images/Group 276call.png'
import { useNavigate } from 'react-router-dom'

const Knowourprocess = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/user/login')
    }

    return (
        <div>
            <section>
                <div className='kop-top-border'></div>
                <div className='kop-back-cont'>
                    <div className='left-kop'>
                        {/* <h2 >LOGIN NOW</h2>
                        <h2>AS USERS OR SUPPLIER/ CONTRACTORS</h2> */}
                        <h2>अपने व्यवसाय को नई उचाईयों तक ले जाने का नाम <span>21SQFT.com</span> Aaj hi free registration करें!</h2>
                        <button onClick={handleLogin}>Register Now</button>
                    </div>
                    <div className='right-kop'>
                        <img src='/image/section-inner.png' alt=''></img>
                    </div>
                </div>
            </section>
            <section className='kop-second-section'>
                {/* <img className='pseudo' src={pseudo} alt=''></img> */}
                <div className='kop-ss-heading'>
                    <h4>OUR TESTIMONIALS</h4>
                    <h2>Know our Process</h2>
                </div>
                <div className='bottom-kop'>
                    <div className='kop-bsingle-card'>
                        <img src={diversity} alt=''></img>
                        <h4 >Step 1</h4>
                        <h5>Browse through categories of contractors, suppliers.</h5>
                    </div>
                    <div className='kop-bsingle-card'>
                        <img src={supplier} alt=''></img>
                        <h4>Step 2</h4>
                        <h5>Access detailed profiles of contractors and suppliers.</h5>
                    </div>
                    <div className='kop-bsingle-card'>
                        <img src={call} alt=''></img>
                        <h4>Step 3</h4>
                        <h5>Initiate communication with preferred contractors/suppliers.</h5>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Knowourprocess;
