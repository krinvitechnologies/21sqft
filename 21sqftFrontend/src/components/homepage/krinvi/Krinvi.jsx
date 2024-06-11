import React, { useEffect } from 'react'
import "./krinvi.css"
import { Link } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';

SwiperCore.use([Pagination, Scrollbar, A11y]);

const Krinvi = () => {

    const imageSlider = [
        {
            id: 1,
            img: "/image/krinvi.png",
            link: "https://krinvitechnologies.com/",
        },
        // {
        //     id: 2,
        //     img: "/image/krinvi.png",
        //     link: "https://krinvitechnologies.com/",
        // },
    ]

    // useEffect(() => {
    //     // Ensure that the AdSense script is loaded
    //     (window.adsbygoogle = window.adsbygoogle || []).push({});
    // }, []);

    useEffect(() => {
        if (window.adsbygoogle && window.adsbygoogle.loaded === false) {
            window.adsbygoogle = window.adsbygoogle || [];
            window.adsbygoogle.push({});
        }
    }, []);

    return (
        <div className='krinvi'>
            <Swiper
                modules={[Pagination, Scrollbar, A11y, Autoplay]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {
                    imageSlider.map((image) => (
                        <SwiperSlide key={image.id}>
                            <Link to={image.link}>
                                < img src={image.img} alt="" />
                            </Link>
                        </SwiperSlide>
                    ))
                }
                <SwiperSlide>
                    <div className="adsense-ad">
                        <ins className="adsbygoogle"
                            style={{ display: 'block' }}
                            data-ad-client="ca-pub-8531308511787623"
                            data-ad-slot="xxxxxxxxxx"
                            data-ad-format="auto"></ins>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Krinvi

//     // adsense code snipit
// <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8531308511787623"
//      crossorigin="anonymous"></script>

//     //  ads.txt snipit
//     google.com, pub - 8531308511787623, DIRECT, f08c47fec0942fa0

//     //  meta tag
//     < meta name = "google-adsense-account" content = "ca-pub-8531308511787623" >