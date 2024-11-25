import React from 'react'
import './home.css'
import Navbar from '../../components/homepage/Navbar/navbar';
import Banner from '../../components/homepage/Banner/banner';
import Banner2 from '../../components/homepage/Banner2/Banner2';
import Krinvi from '../../components/homepage/krinvi/Krinvi';
import Know from '../../components/homepage/know about us/know';
import Footer from '../../components/homepage/footer/footer';
import Knowourprocess from '../../components/homepage/know our process/knowourprocess';
import Explore from '../../components/homepage/explore/explore';
import Contactform from '../../components/homepage/contactform/contactform';
import BusinessSlider from '../../components/homepage/BusinessSlider/BusinessSlider';

const Home = () => {
    return (
        <div className='home'>
            <Navbar />
            <Banner2 />
            <Banner />
            <Explore />
            <BusinessSlider />
            <Krinvi />
            <Know />
            <Knowourprocess />
            <Contactform />
            <Footer />
        </div>
    )
}

export default Home;
