import React, { useEffect } from "react";
import "./posterslider.css"
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import { useSelector, useDispatch } from "react-redux";
import { POSTER_URL } from "../../../services/helper.js";
import { getPosters } from "../../../redux/actions/posterAction.js";

SwiperCore.use([Pagination, Scrollbar, A11y]);

const PosterSlider = () => {

    const dispatch = useDispatch();
    const { posters, loading, error } = useSelector(state => state.posterReducer) || {};

    useEffect(() => {
        dispatch(getPosters());
    }, [dispatch]);

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
                    posters?.map((poster) => (
                        <SwiperSlide key={poster?.id}>
                            <img src={`${POSTER_URL}/${poster?.image}`} alt={poster?.name} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default PosterSlider