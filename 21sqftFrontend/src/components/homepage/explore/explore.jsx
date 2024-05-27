import React, { useState } from 'react'
import './explore.css'
// import left from './exploreimages/span.each-object.png'
import image1 from './exploreimages/Group 234.png'
import image2 from './exploreimages/Group 235.png'
import image3 from './exploreimages/Group 236.png'
import image4 from './exploreimages/Group 237.png'
import image5 from './exploreimages/Group 238.png'
import image6 from './exploreimages/Group 239.png'
import image7 from './exploreimages/Group 240.png'
import image8 from './exploreimages/Group 241.png'
import image9 from './exploreimages/Group 242.png'
import image10 from './exploreimages/Group 243.png'
import image11 from './exploreimages/Group 244.png'
import image12 from './exploreimages/Group 247.png'
import image13 from './exploreimages/Group 246.png'
import image14 from './exploreimages/Group 248.png'
import image15 from './exploreimages/Group 253.png'
import image16 from './exploreimages/Group 252.png'
import image17 from './exploreimages/Group 251.png'
import image18 from './exploreimages/Group 250.png'
import image19 from './exploreimages/Group 249.png'
// import right from './exploreimages/span.each-object (1).png'

import image01 from './exploreimages/Group 254.png'
import image02 from './exploreimages/Group 255.png'
import image03 from './exploreimages/Group 256.png'
import image04 from './exploreimages/Group 257.png'
import image05 from './exploreimages/Group 258.png'
import image06 from './exploreimages/Group 259.png'
import image07 from './exploreimages/Group 260.png'
import image08 from './exploreimages/Group 267.png'
import image09 from './exploreimages/Group 266.png'
import image010 from './exploreimages/Group 265.png'
import image011 from './exploreimages/Group 264.png'
import image012 from './exploreimages/Group 263.png'
import image013 from './exploreimages/Group 262.png'
import image014 from './exploreimages/Group 261.png'
import image015 from './exploreimages/Group 273.png'
import image016 from './exploreimages/Group 272.png'
import image017 from './exploreimages/Group 271.png'
import image018 from './exploreimages/Group 270.png'
import image019 from './exploreimages/Group 269.png'
import image020 from './exploreimages/Group 268.png'

const Explore = () => {

    const [activeTab, setActiveTab] = useState('contractor');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='explore'>
            {/* <img className='explore-left' src={left} alt=''></img> */}
            <div className='explore-head'>
                <h4 >CATEGORIES</h4>
                <h2 >Explore our categories</h2>
            </div>
            <div className='explore-tabs-buttons'>
                <button className={`explore-tab-btn ${activeTab === 'contractor' ? 'active' : ''}`} onClick={() => handleTabClick('contractor')}>Contractors</button>
                <button className={`explore-tab-btn ${activeTab === 'supplier' ? 'active' : ''}`} onClick={() => handleTabClick('supplier')}>Suppliers</button>
            </div>

            {activeTab === 'contractor' && (
                <div>
                    <div className='explore-grid'>
                        <div className='explore-grid-width'>
                            <img className='explore-width ew-three' src={image1} alt=''></img>
                            <p className='explore-pp'>Construction Contractors</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image2} alt=''></img>
                            <p className='explore-pp'>Paint Contractors</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image3} alt=''></img>
                            <p className='explore-pp'>Pop Contractors</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image4} alt=''></img>
                            <p className='explore-pp'>Carpenter</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image5} alt=''></img>
                            <p className='explore-pp'>Shuttering</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image6} alt=''></img>
                            <p className='explore-pp'>Plumbing Contractors</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image7} alt=''></img>
                            <p className='explore-pp'>Interior Designers</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width ew-three' src={image8} alt=''></img>
                            <p className='explore-pp'>Waterproofing</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image9} alt=''></img>
                            <p className='explore-pp'>Heat Insulation</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image10} alt=''></img>
                            <p className='explore-pp'>False Ceiling</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image11} alt=''></img>
                            <p className='explore-pp'>Upvc Fittings</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image12} alt=''></img>
                            <p className='explore-pp'>Flooring</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image13} alt=''></img>
                            <p className='explore-pp'>Electric Contractors</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image14} alt=''></img>
                            <p className='explore-pp'>Jcb Movers</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width ew-three' src={image15} alt=''></img>
                            <p className='explore-pp'>Aluminum Fittings</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image16} alt=''></img>
                            <p className='explore-pp'>Glass</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image17} alt=''></img>
                            <p className='explore-pp'>Fire system</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image18} alt=''></img>
                            <p className='explore-pp'>Landscapers</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image19} alt=''></img>
                            <p className='explore-pp'>Architects</p>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'supplier' && (
                <div>
                    <div className='explore-grid'>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image01} alt=''></img>
                            <p className='explore-pp'>Sanitary/bath Fittings</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image02} alt=''></img>
                            <p className='explore-pp'>Electrical/ lightings</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image03} alt=''></img>
                            <p className='explore-pp'>Tiles/flooring</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image04} alt=''></img>
                            <p className='explore-pp'>Pains and surface care</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image05} alt=''></img>
                            <p className='explore-pp'>Wood work</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image06} alt=''></img>
                            <p className='explore-pp'>Wallpaper/pvc/vinee</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image07} alt=''></img>
                            <p className='explore-pp'>Marbles and stone</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image08} alt=''></img>
                            <p className='explore-pp'>Bricks/ sand</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image09} alt=''></img>
                            <p className='explore-pp'>Modular kitchen</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image010} alt=''></img>
                            <p className='explore-pp'>Cement</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image011} alt=''></img>
                            <p className='explore-pp'>Iron</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image012} alt=''></img>
                            <p className='explore-pp'>Crushed stone/bajri</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image013} alt=''></img>
                            <p className='explore-pp'>Hardware and tools</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image014} alt=''></img>
                            <p className='explore-pp'>Water purifier</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image015} alt=''></img>
                            <p className='explore-pp'>Gates/grills/railings</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image016} alt=''></img>
                            <p className='explore-pp'>Water tanks</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image017} alt=''></img>
                            <p className='explore-pp'>Solar pannels</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image018} alt=''></img>
                            <p className='explore-pp'>Air conditioning</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image019} alt=''></img>
                            <p className='explore-pp'>Elevator</p>
                        </div>
                        <div className='explore-grid-width'>
                            <img className='explore-width' src={image020} alt=''></img>
                            <p className='explore-pp'>Cctv/security system</p>
                        </div>
                    </div>
                </div>
            )}
            {/* <img className='explore-right' src={right} alt=''></img> */}
        </div >
    )
}

export default Explore;