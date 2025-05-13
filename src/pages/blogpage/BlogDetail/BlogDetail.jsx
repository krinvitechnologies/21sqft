import React, { useEffect, useState } from 'react'
import './blogdetail.css'
import Navbar from '../../../components/homepage/Navbar/navbar'
import Footer from '../../../components/homepage/footer/footer';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from '../../../redux/actions/blogAction.js'
import { BLOG_IMAGE_URL } from '../../../services/helper.js'
import { useParams } from 'react-router-dom';
import { addComment, getComments } from '../../../redux/actions/commentAction.js';
import { toast } from 'react-toastify';
import { MdAccountCircle } from 'react-icons/md';

let URL = window.location.href;

function BlogDetail() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { blogs, loading, error } = useSelector((state) => state.blogReducer) || {};
    const { comments } = useSelector((state) => state.commentReducer) || {};

    const [form, setForm] = useState({
        name: '',
        email: '',
        comment: '',
    });

    useEffect(() => {
        dispatch(getBlogs(id));
        dispatch(getComments(id));
    }, [dispatch, id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePostComment = async () => {
        try {
            if (!form.name || !form.email || !form.comment) {
                toast.error("Please fill in all the fields.");
                // return;
            } else {
                const result = await dispatch(addComment({ ...form, blog: id }));
                if (result) {
                    toast.success("Comment created successfully");
                    setForm({ name: '', email: '', comment: '' });
                }
            }
        } catch (error) {
            // console.error("Error adding comment:", error);
        }
    };

    return (
        <div className='bd'>
            <Navbar />
            <div className='bd-cont'>
                <div className='bd-sections'>
                    <h1 className='h1'>{blogs.title}</h1>
                    <div className='bd-share-icon'>
                        <FacebookShareButton
                            url={`${URL}`}
                        >
                            <img src="/image/icons8-facebook-48.png" alt="img" />
                        </FacebookShareButton>
                        <LinkedinShareButton
                            url={`${URL}`}
                        >
                            <img src="/image/icons8-linkedin-48.png" alt="img" />
                        </LinkedinShareButton>
                        <WhatsappShareButton
                            url={`${URL}`}
                        >
                            <img src="/image/icons8-whatsapp-48.png" alt="img" />
                        </WhatsappShareButton>

                        <TwitterShareButton
                            url={`${URL}`}
                        >
                            <img src="/image/icons8-twitter-circled-48.png" alt="img" />
                        </TwitterShareButton>
                    </div>
                    <div className='bd-img-cont'>
                        <img src={`${BLOG_IMAGE_URL}/${blogs?.image}`} alt={blogs?.title} />
                    </div>
                    <div className='blog-detail-desc'>
                        {blogs?.description}
                    </div>
                </div>

                {/* <div className="pre">
                    <a href='/why-work-zone-safety-is-important-for-everyone' className='pre1'>
                        <span>Previous Post</span>
                    </a>
                </div> */}

                <div className='bd-sections'>
                    <div className='bd-comment-form'>
                        <h2 className='h2'>Leave a Comment</h2>
                        {/* <span>Your email address will not be published. Required fields are marked *</span> */}
                        <span>Your email address will not be published.</span>
                        <textarea name="comment"
                            value={form.comment}
                            onChange={handleChange} type="text" rows={8} placeholder='Type here..' />
                        <div className='bd-cf-fields'>
                            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder='Enter name' />
                            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder='Enter email' />
                            {/* <input type="text" placeholder='Website' /> */}
                        </div>
                        <div>
                            <button onClick={handlePostComment} className='primary-button'>Post Comment</button>
                        </div>
                    </div>
                </div>

                {Array.isArray(comments) && comments.length > 0 && (
                    <div className="bd-sections">
                        <h3 className='h3 rc-text-heading'>Recent Comments</h3>
                        {comments?.map((comment) => (
                            <div key={comment._id} className='recent-comment-box'>
                                <div className='rc-head'>
                                    <div className='rc-picon'>
                                        <MdAccountCircle />
                                    </div>
                                    <div>
                                        <span className='rc-name'>{comment.name}</span>
                                        <small className='rc-created-at'>{new Date(comment.createdAt).toLocaleString()}</small>
                                    </div>
                                </div>
                                <p className='rc-message'>{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <Footer />
        </div>
    )
}

export default BlogDetail;