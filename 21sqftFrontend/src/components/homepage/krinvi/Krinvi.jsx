import React from 'react'
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
        {
            id: 2,
            img: "/image/krinvi.png",
            link: "https://krinvitechnologies.com/",
        },
    ]

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
            </Swiper>
        </div>
    )
}

export default Krinvi