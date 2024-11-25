import React from 'react'
import './know.css'
import together from './know image/Group 3together.png'
// import about2 from './know image/div.layer-inner (1).png'
// import circle from './know image/div.layer-inner.png'
import parrow from './know image/Link.png'
// import blur from './know image/div.layer-image-inner-wrapper.png'

const Know = () => {

    return (
        <div className='know'>
            <section>
                <div className='know-head'>
                    <h4>WHO ARE WE?</h4>
                    <h2>Know About Us</h2>
                </div>
                <div className='know-cont'>
                    <div className='left-know'>
                        <img src={together} alt='' />
                    </div>
                    <div className='right-know'>
                        <p className='know-paras'>Welcome to 21SQFT.com , an online platform for finding and hiring the best contractors and material vendors for your construction projects. Whether you are building a new house, a new office, or a new commercial complex, we can help you connect with the most qualified or experienced contractors/vendors in your area.21SQFT.com is more than just a directory of contractors, it is a complete solution that helps you plan, manage, and execute your construction project from start to finish.</p>
                        <h5 className='know-mid-p'>What Sets Us Apart:</h5>
                        <div className='know-list'>
                            <img className='parrow' src={parrow} alt=''></img>
                            <p className='know-paras'>Comprehensive Directory: Our platform hosts an extensive range of categories, ensuring that you find the exact service or supplier you need, right at your fingertips.</p>
                        </div>
                        <div className='know-list'>
                            <img className='parrow' src={parrow} alt=''></img>
                            <p className='know-paras'>Featured Excellence: We showcase the best in the industry, spotlighting top suppliers, contractors, and material vendors that meet the highest standards of quality and professionalism.</p>
                        </div>
                        <div className='know-list'>
                            <img className='parrow' src={parrow} alt=''></img>
                            <p className='know-paras'>User-Centric Design: Our user-friendly interface empowers you to search, filter, and connect effortlessly, saving you time and providing you with the information you need.</p>
                        </div>
                    </div>
                </div>
                {/* <div className='know-foot'></div> */}
            </section>
        </div>
    )
}

export default Know;
