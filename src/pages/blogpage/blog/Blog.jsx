// dynamic blog page code
import React, { useEffect, useState } from 'react'
import './blog.css'
import { Link } from 'react-router-dom'
import Navbar from '../../../components/homepage/Navbar/navbar'
import Footer from '../../../components/homepage/footer/footer'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from '../../../redux/actions/blogAction.js'
import { BLOG_IMAGE_URL } from '../../../services/helper.js'

let URL = window.location.href;

function Blog() {

    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.blogReducer) || {};

    useEffect(() => {
        dispatch(getBlogs("all"));
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className='mainDKr'>
                <div className='Dkr2'>
                    {/* {blogs?.map((blog, index) => ( */}
                    {Array.isArray(blogs) && blogs.map((blog, index) => (
                        <div className='blog-container1' key={blog._id}>
                            <div className='Dkr3-img'>
                                <img src={`${BLOG_IMAGE_URL}/${blog?.image}`} alt={blog?.title} />
                            </div>

                            <div className='Dkr4-content'>
                                <span>{blog.title}</span>
                            </div>
                            <div className='Dkr5-content1'>
                                <p>Spread the Love</p>
                            </div>
                            <div className='Dkr6-icons'>
                                <FacebookShareButton
                                    // url={`${URL}/creating-a-cozy-retreat-tips-for-designing-a-comfortable-living-space`}
                                    url={`${URL}/${blog._id}`}
                                >
                                    <img src="/image/icons8-facebook-48.png" alt="img" />
                                </FacebookShareButton>
                                <LinkedinShareButton
                                    // url={`${URL}/creating-a-cozy-retreat-tips-for-designing-a-comfortable-living-space`}
                                    url={`${URL}/${blog._id}`}
                                >
                                    <img src="/image/icons8-linkedin-48.png" alt="img" />
                                </LinkedinShareButton>
                                <WhatsappShareButton
                                    // url={`${URL}/creating-a-cozy-retreat-tips-for-designing-a-comfortable-living-space`}
                                    url={`${URL}/${blog._id}`}
                                >
                                    <img src="/image/icons8-whatsapp-48.png" alt="img" />
                                </WhatsappShareButton>

                                <TwitterShareButton
                                    // url={`${URL}/creating-a-cozy-retreat-tips-for-designing-a-comfortable-living-space`}
                                    url={`${URL}/${blog._id}`}
                                >
                                    <img src="/image/icons8-twitter-circled-48.png" alt="img" />
                                </TwitterShareButton>
                            </div>
                            <div className='Dkr7-content2'>
                                <p>{blog.short_description}</p>
                            </div>
                            <div className='link'>
                                <Link to={`/blog/${blog._id}`} className='non' >Read More <i className="fa-solid fa-chevron-right"></i></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Blog;



// static blog page code
// import React from 'react'
// import './blog.css'
// import { Link } from 'react-router-dom'
// import Navbar from '../../../components/homepage/Navbar/navbar'
// import Footer from '../../../components/homepage/footer/footer'
// import {
//     FacebookShareButton,
//     LinkedinShareButton,
//     TwitterShareButton,
//     WhatsappShareButton,
// } from "react-share";

// let URL = window.location.href;

// function Blog() {

//     return (
//         <div>
//             <Navbar />
//             <div className='mainDKr'>
//                 <div className='Dkr2'>
//                     <div className='blog-container1'>
//                         <div className='Dkr3-img'>
//                             <img src='/image/div0.jpg' alt='img' />
//                         </div>

//                         <div className='Dkr4-content'>
//                             <span>Creating a Cozy Retreat: Tips for Designing a Comfortable Living Space</span>
//                         </div>
//                         <div className='Dkr5-content1'>
//                             <p>Spread the Love</p>
//                         </div>
//                         <div className='Dkr6-icons'>
//                             <FacebookShareButton
//                                 url={`${URL}/creating-a-cozy-retreat-tips-for-designing-a-comfortable-living-space`}
//                             >
//                                 <img src="/image/icons8-facebook-48.png" alt="img" />
//                             </FacebookShareButton>
//                             <LinkedinShareButton
//                                 url={`${URL}/creating-a-cozy-retreat-tips-for-designing-a-comfortable-living-space`}
//                             >
//                                 <img src="/image/icons8-linkedin-48.png" alt="img" />
//                             </LinkedinShareButton>
//                             <WhatsappShareButton
//                                 url={`${URL}/creating-a-cozy-retreat-tips-for-designing-a-comfortable-living-space`}
//                             >
//                                 <img src="/image/icons8-whatsapp-48.png" alt="img" />
//                             </WhatsappShareButton>

//                             <TwitterShareButton
//                                 url={`${URL}/creating-a-cozy-retreat-tips-for-designing-a-comfortable-living-space`}
//                             >
//                                 <img src="/image/icons8-twitter-circled-48.png" alt="img" />
//                             </TwitterShareButton>
//                         </div>
//                         <div className='Dkr7-content2'>
//                             <p>Spread the love  When it comes to designing the interiors of your home, the goal is not just to make it aesthetically pleasing but also to create a space that<br /> feels like a sanctuary. Your living space should be a cozy retreat where you can unwind, relax, and truly feel at home. In this blog …
//                             </p>
//                         </div>
//                         <div className='link'>
//                             <Link to='/creating-a-cozy-retreat-tips-for-designing-a-comfortable-living-space' className='non' >Read More <i className="fa-solid fa-chevron-right"></i></Link>
//                         </div>
//                     </div>

//                     <div className='dkr8-container1'>

//                         <div className='Dkr9-img1'>
//                             <img src='/image/img1.jpg' alt='img' />
//                         </div>
//                         <div className='Dkr10-content'>
//                             <span>
//                                 Why Work Zone Safety Is Important for Everyone</span>
//                         </div>
//                         <div className='Dkr11-content1'>
//                             <p>Spread the Love</p>
//                         </div>
//                         <div className='Dkr6-icons'>
//                             <FacebookShareButton
//                                 url={`${URL}/why-work-zone-safety-is-important-for-everyone`}
//                             >
//                                 <img src="/image/icons8-facebook-48.png" alt="img" />
//                             </FacebookShareButton>
//                             <LinkedinShareButton
//                                 url={`${URL}/why-work-zone-safety-is-important-for-everyone`}
//                             >
//                                 <img src="/image/icons8-linkedin-48.png" alt="img" />
//                             </LinkedinShareButton>
//                             <WhatsappShareButton
//                                 url={`${URL}/why-work-zone-safety-is-important-for-everyone`}
//                             >
//                                 <img src="/image/icons8-whatsapp-48.png" alt="img" />
//                             </WhatsappShareButton>
//                             <TwitterShareButton
//                                 url={`${URL}/why-work-zone-safety-is-important-for-everyone`}
//                             >
//                                 <img src="/image/icons8-twitter-circled-48.png" alt="img" />
//                             </TwitterShareButton>
//                         </div>
//                         <div className='Dkr12-content2'>
//                             <p>Spread the love  Work zones are essential to be able to maintain and upgrade our roadways. However, work zones can be dangerous because hazards often
//                                 <br /> appear unexpectedly, endangering roadway workers and motorists. So, how can we make work zones safer? Creating
//                                 safe work zones requires risk <br />management strategies to be implemented by employees, supervisory personnel …
//                             </p></div>
//                         <div className='Dkr13-link'>
//                             <Link to='/why-work-zone-safety-is-important-for-everyone' className='ccd' >Read More <i className="fa-solid fa-chevron-right"></i></Link>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default Blog;