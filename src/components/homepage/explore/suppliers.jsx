import React from 'react'
import './suppliers.css'
import { useNavigate } from 'react-router-dom'
import image1 from './exploreimages/Group 254.png'
import image2 from './exploreimages/Group 255.png'
import image3 from './exploreimages/Group 256.png'
import image4 from './exploreimages/Group 257.png'
import image5 from './exploreimages/Group 258.png'
import image6 from './exploreimages/Group 259.png'
import image7 from './exploreimages/Group 260.png'
import image8 from './exploreimages/Group 267.png'
import image9 from './exploreimages/Group 266.png'
import image10 from './exploreimages/Group 265.png'
import image11 from './exploreimages/Group 264.png'
import image12 from './exploreimages/Group 263.png'
import image13 from './exploreimages/Group 262.png'
import image14 from './exploreimages/Group 261.png'
import image15 from './exploreimages/Group 273.png'
import image16 from './exploreimages/Group 272.png'
import image17 from './exploreimages/Group 271.png'
import image18 from './exploreimages/Group 270.png'
import image19 from './exploreimages/Group 269.png'
import image20 from './exploreimages/Group 268.png'

const Suppliers = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    return (
        <div>
            <div className='explore-main-buttons'>
                <button className='explore-suppliers-contractors' onClick={handleClick}>Contractors</button>
                <button className='explore-suppliers-materials'> Materials Vendors/ Suppliers</button>
            </div>
            <div className='explore-grid'>
                <div>
                    <img className='explore-width' src={image1} alt=''></img>
                    <p className='explore-pp'>Sanitary/bath Fittings</p>
                </div>
                <div>
                    <img className='explore-width' src={image2} alt=''></img>
                    <p className='explore-pp'>Electrical/ lightings</p>
                </div>
                <div>
                    <img className='explore-width' src={image3} alt=''></img>
                    <p className='explore-pp'>Tiles/flooring</p>
                </div>
                <div>
                    <img className='explore-width' src={image4} alt=''></img>
                    <p className='explore-pp'>Pains and surface care</p>
                </div>
                <div>
                    <img className='explore-width' src={image5} alt=''></img>
                    <p className='explore-pp'>Wood work</p>
                </div>
                <div>
                    <img className='explore-width' src={image6} alt=''></img>
                    <p className='explore-pp'>Wallpaper/pvc/vinee</p>
                </div>
                <div>
                    <img className='explore-width' src={image7} alt=''></img>
                    <p className='explore-pp'>Marbles and stone</p>
                </div>
                <div>
                    <img className='explore-width' src={image8} alt=''></img>
                    <p className='explore-pp'>Bricks/ sand</p>
                </div>
                <div>
                    <img className='explore-width' src={image9} alt=''></img>
                    <p className='explore-pp'>Modular kitchen</p>
                </div>
                <div>
                    <img className='explore-width' src={image10} alt=''></img>
                    <p className='explore-pp'>Cement</p>
                </div>
                <div>
                    <img className='explore-width' src={image11} alt=''></img>
                    <p className='explore-pp'>Iron</p>
                </div>
                <div>
                    <img className='explore-width' src={image12} alt=''></img>
                    <p className='explore-pp'>Crushed stone/bajri</p>
                </div>
                <div>
                    <img className='explore-width' src={image13} alt=''></img>
                    <p className='explore-pp'>Hardware and tools</p>
                </div>
                <div>
                    <img className='explore-width' src={image14} alt=''></img>
                    <p className='explore-pp'>Water purifier</p>
                </div>
                <div>
                    <img className='explore-width' src={image15} alt=''></img>
                    <p className='explore-pp'>Gates/grills/railings</p>
                </div>
                <div>
                    <img className='explore-width' src={image16} alt=''></img>
                    <p className='explore-pp'>Water tanks</p>
                </div>
                <div>
                    <img className='explore-width' src={image17} alt=''></img>
                    <p className='explore-pp'>Solar pannels</p>
                </div>
                <div>
                    <img className='explore-width' src={image18} alt=''></img>
                    <p className='explore-pp'>Air conditioning</p>
                </div>
                <div>
                    <img className='explore-width' src={image19} alt=''></img>
                    <p className='explore-pp'>Elevator</p>
                </div>
                <div>
                    <img className='explore-width' src={image20} alt=''></img>
                    <p className='explore-pp'>Cctv/security system</p>
                </div>
            </div>
        </div>
    )
}

export default Suppliers;
