import React, { useEffect } from 'react'
import './banner2.css'

const Banner2 = () => {

    useEffect(() => {
        const images = [
            "/image/21SQFT DESKTOP.jpeg",
            "/image/21SQFT MOBILE.jpeg"
        ];

        const preloads = images.map((image) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = image;
            link.as = 'image';
            document.head.appendChild(link);
            return link;
        });

        return () => {
            preloads.forEach((link) => document.head.removeChild(link));
        };
    }, []);

    return (
        <div className='banner2'>
            <img src="/image/21SQFT DESKTOP.jpeg" alt="" className='banner2-desktop-img' />
            <img src="/image/21SQFT MOBILE.jpeg" alt="" className='banner2-mobile-img' />
        </div>
    )
}

export default Banner2