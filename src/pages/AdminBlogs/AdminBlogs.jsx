import React, { useEffect, useState } from "react";
import "./adminblogs.css";
import {
    Table, TableHead, TableRow, TableCell, TableBody,
    IconButton, Button, Box, Dialog, DialogContent
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import { toast } from "react-toastify";
import { addBlog, deleteBlog, editBlog, getBlogs } from "../../redux/actions/blogAction";
import { BLOG_IMAGE_URL } from "../../services/helper.js";
import { MdAddToPhotos, MdClose, MdOutlineClose } from "react-icons/md";
import { editComment, getComments } from "../../redux/actions/commentAction.js";
// import EditIcon from '@mui/icons-material/Edit';
// import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const AdminBlogs = () => {
    const [addBlogModalOpen, setAddBlogModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [desc, setDesc] = useState("");
    const [blogImage, setBlogImage] = useState(null);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editBlogId, setEditBlogId] = useState(null);
    const [expandedItems, setExpandedItems] = useState({}); // State to track expanded items
    const [existingImage, setExistingImage] = useState(null);

    const [viewCommentsModalOpen, setViewCommentsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const { blogs, loading, error, addLoading, deleteLoading } = useSelector((state) => state.blogReducer) || {};
    //     const { posters, loading, error, addLoading, deleteLoading } = useSelector(state => state.posterReducer) || {};
    const { comments } = useSelector((state) => state.commentReducer) || {};


    useEffect(() => {
        dispatch(getBlogs("all"));
    }, [dispatch]);

    const handleFileChange = (event) => {
        setBlogImage(event.target.files[0]);
    };

    const handleAddBlog = async () => {
        if (!title || !shortDesc || !desc || !blogImage) {
            toast.error("Please fill in all the fields.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("short_description", shortDesc);
        formData.append("description", desc);
        formData.append("image", blogImage);

        try {
            const result = await dispatch(addBlog(formData));
            if (result) {
                toast.success("Blog added successfully");
                setAddBlogModalOpen(false);
                setTitle("");
                setShortDesc("");
                setDesc("");
                setBlogImage(null);
            }
        } catch (error) {
            console.error("Error adding blog:", error);
        }
    };


    // Handle open/close edit modal
    const handleEditClick = (blog) => {
        setTitle(blog.title);
        setShortDesc(blog.short_description);
        setDesc(blog.description);
        setBlogImage(null);
        setExistingImage(blog.image);
        setEditBlogId(blog._id);
        setEditModalOpen(true);
    };

    const handleEditBlog = async () => {
        if (!title || !shortDesc || !desc) {
            toast.error("Please fill in all the fields.");
            return;
        }

        // Validate that at least one image is available
        if (!blogImage && !existingImage) {
            toast.error("Please upload the image.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("short_description", shortDesc);
        formData.append("description", desc);
        // formData.append("image", blogImage);
        // Only append if user uploaded a new one
        if (blogImage) {
            formData.append("image", blogImage);
        } else {
            formData.append("image", existingImage);
        }

        try {
            // const result = await dispatch(editBlog({ id: editBlogId, formData }));
            await dispatch(editBlog(editBlogId, formData));

        } catch (error) {
            // console.error("Error edit blog:", error);
            toast.error(error || "Failed to edit blog");
        }
    };

    const resetForm = () => {
        setTitle("");
        setShortDesc("");
        setDesc("");
        setBlogImage(null);
        setEditBlogId(null);
    };


    const handleDeleteBlog = async (id) => {
        try {
            await dispatch(deleteBlog(id));
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };


    // Handle open/close view comments modal
    const handleViewComments = (blog) => {
        dispatch(getComments(blog._id));
        setViewCommentsModalOpen(true);
    };

    const handleEditComment = async (comment, newStatus) => {
        if (!comment?._id || !newStatus) {
            toast.error("Invalid request. Missing comment ID or status.");
            return;
        }

        const updatedCommentData = {
            // id: comment._id,
            name: comment.name,
            email: comment.email,
            comment: comment.comment,
            status: newStatus,
        };

        try {
            await dispatch(editComment(comment._id, updatedCommentData));
            // toast.success(`Comment ${newStatus} successfully.`);
        } catch (error) {
            toast.error(error?.message || "Failed to update comment status.");
        }
    };



    // Function to toggle the description expansion
    const toggleExpansion = (id) => {
        setExpandedItems(prevState => ({
            ...prevState,
            [id]: !prevState[id] // Toggle the expansion for the given item
        }));
    };

    return (
        <div className="hdash">
            <div className="hdash-cont">
                <div className="left-hdash">
                    <AdminSidebar />
                </div>
                <div className="right-hdash">
                    <div className="blog">
                        <nav className="blog-header">
                            <h1 className="h1">Blogs</h1>
                            <button className="primary-button" onClick={() => setAddBlogModalOpen(true)}>Add Blog</button>
                            <Dialog
                                open={addBlogModalOpen}
                                onClose={() => setAddBlogModalOpen(false)}
                                fullWidth={true}
                                maxWidth="xs"
                                PaperProps={{ style: { backgroundColor: '#F6F6F6', borderRadius: '20px' } }}
                            >
                                <DialogContent>
                                    <div className="modal-form">
                                        <h1 className="h1">Add Blog</h1>
                                        <label className="label">
                                            Title
                                            <input
                                                type="text"
                                                className="input"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                            />
                                        </label>
                                        <label className="label">
                                            Short Description
                                            <textarea
                                                type="text"
                                                className="textarea"
                                                value={shortDesc}
                                                onChange={(e) => setShortDesc(e.target.value)}
                                                required
                                            />
                                        </label>
                                        <label className="label">
                                            Description
                                            <textarea
                                                className="textarea ab-textarea"
                                                value={desc}
                                                onChange={(e) => setDesc(e.target.value)}
                                                required
                                            />
                                        </label>
                                        <label className="label">
                                            Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="input"
                                                onChange={handleFileChange}
                                                required
                                            />
                                        </label>
                                        <button
                                            className="primary-button"
                                            onClick={handleAddBlog}
                                            disabled={addLoading}
                                        >
                                            {addLoading ? "Adding..." : "Add Blog"}
                                        </button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </nav>
                        {/* Optional: Table for showing existing blogs */}

                        {blogs?.length > 0 ? (
                            <Box
                                sx={{
                                    border: "1px solid #ccc",
                                    borderRadius: "12px",
                                    // overflow: "hidden",
                                    overflowX: "auto",
                                    width: "100%",
                                }}
                            >
                                <Table>
                                    <TableHead sx={{ backgroundColor: "#F0F0F0" }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "700", color: '#101010', fontFamily: "Roboto", fontSize: '1.1rem' }}>Sr. no.</TableCell>
                                            <TableCell sx={{ fontWeight: "700", color: '#101010', fontFamily: "Roboto", fontSize: '1.1rem' }}>Image</TableCell>
                                            <TableCell sx={{ fontWeight: "700", color: '#101010', fontFamily: "Roboto", fontSize: '1.1rem' }}>Title</TableCell>
                                            <TableCell sx={{ fontWeight: "700", color: '#101010', fontFamily: "Roboto", fontSize: '1.1rem' }}>Short Description</TableCell>
                                            {/* <TableCell sx={{ fontWeight: "700", color: '#101010', fontFamily: "Roboto", fontSize: '1.1rem' }}>Description</TableCell> */}
                                            <TableCell sx={{ fontWeight: "700", color: '#101010', fontFamily: "Roboto", fontSize: '1.1rem' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {blogs?.map((blog, index) => (
                                            <TableRow key={blog?._id}>
                                                <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem' }}>{index + 1}</TableCell>
                                                <TableCell>
                                                    <img src={`${BLOG_IMAGE_URL}/${blog?.image}`} alt={blog?.name} width="50" />
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem' }}>{blog?.title}</TableCell>
                                                <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem' }}>{blog?.short_description}</TableCell>
                                                {/* <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem', whiteSpace: 'pre-line' }}>{blog?.description}</TableCell> */}
                                                <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem' }}>
                                                    {/* <IconButton onClick={() => handleDeletePoster(blog._id)} color="error">
                                    <DeleteIcon />
                                </IconButton> */}
                                                    <IconButton color="#101010" onClick={() => handleViewComments(blog)}>
                                                        {/* <EditIcon /> */}
                                                        <span style={{ fontSize: "1rem" }}>Comments</span>
                                                    </IconButton>
                                                    <IconButton color="#101010" onClick={() => handleEditClick(blog)}>
                                                        {/* <EditIcon /> */}
                                                        <span style={{ fontSize: "1rem" }}>Edit</span>
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleDeleteBlog(blog?._id)}
                                                        color="error"
                                                        disabled={deleteLoading?.includes(blog?._id)}
                                                        sx={{ fontWeight: "400", fontFamily: "Roboto", fontSize: '1rem' }}
                                                    >
                                                        {deleteLoading?.includes(blog?._id) ? (
                                                            <span style={{ fontSize: "1rem" }}>Deleting...</span>
                                                        ) : (
                                                            // <DeleteIcon />
                                                            <span>Delete</span>
                                                        )}
                                                    </IconButton>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        ) : (
                            <div className="not-found-cont">
                                <h2 className="h2">No Blog Found.</h2>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>

            <Dialog open={editModalOpen}
                // onClose={() => setEditModalOpen(false)}
                onClose={() => {
                    setEditModalOpen(false);
                    resetForm();
                }}
                fullWidth maxWidth="sm"
                PaperProps={{ style: { backgroundColor: '#F6F6F6', borderRadius: '20px' } }}>
                <DialogContent>
                    <div className="modal-form">
                        <h1 className="h1">Edit Blog</h1>
                        <div className="image-upload-wrapper">
                            <input
                                type="file"
                                accept="image/*"
                                id="edit-campaign-image-input"
                                style={{ display: "none" }}
                                onChange={(e) => setBlogImage(e.target.files[0])}
                            />
                            <label htmlFor="edit-campaign-image-input" className="image-preview-container">
                                <div className="ac-upload-image">
                                    {blogImage ? (
                                        // If new image uploaded, preview it
                                        <img
                                            src={URL.createObjectURL(blogImage)}
                                            alt="Preview"
                                            className="image-preview"
                                        />
                                    ) : existingImage ? (
                                        // If editing and existing image is present
                                        <img
                                            src={`${BLOG_IMAGE_URL}/${existingImage}`}
                                            alt="Existing"
                                            className="image-preview"
                                        />
                                    ) : (
                                        // Default icon if no image
                                        <div className="ac-add-photo-icon">
                                            {/* <AddToPhotosIcon sx={{ fontSize: '2rem' }} /> */}
                                            <MdAddToPhotos />
                                        </div>
                                    )}
                                </div>
                            </label>
                        </div>


                        <label className="label">
                            Title
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </label>
                        <label className="label">
                            Short Description
                            <textarea
                                type="text"
                                className="textarea"
                                value={shortDesc}
                                onChange={(e) => setShortDesc(e.target.value)}
                                required
                            />
                        </label>
                        <label className="label">
                            Description
                            <textarea
                                className="textarea ab-textarea"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                required
                            />
                        </label>
                        {/* <label className="label">
                            Image
                            <input
                                type="file"
                                accept="image/*"
                                className="input"
                                onChange={handleFileChange}
                                required
                            />
                        </label> */}
                        <button className="primary-button" onClick={handleEditBlog} disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>


            {/* comments */}
            <Dialog open={viewCommentsModalOpen}
                onClose={() => {
                    setViewCommentsModalOpen(false);
                }}
                fullWidth maxWidth="md"
                PaperProps={{ style: { backgroundColor: '#F6F6F6', borderRadius: '20px' } }}>
                <DialogContent>
                    <div className="modal-form">
                        <div className="blog-header">
                            <h1 className="h1">Comments</h1>
                            <IconButton
                                color="#101010"
                                onClick={() => setViewCommentsModalOpen(false)}
                            >
                                <MdClose />
                            </IconButton>
                        </div>
                        {comments?.length > 0 ? (
                            <Box
                                sx={{
                                    border: "1px solid #ccc",
                                    borderRadius: "12px",
                                    // overflow: "hidden",
                                    overflowX: "auto",
                                    width: "100%",
                                }}
                            >
                                <Table>
                                    <TableHead sx={{ backgroundColor: "#F0F0F0" }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "700", color: '#101010', fontFamily: "Roboto", fontSize: '1.1rem' }}>Sr. no.</TableCell>
                                            <TableCell sx={{ fontWeight: "700", color: '#101010', fontFamily: "Roboto", fontSize: '1.1rem' }}>Name</TableCell>
                                            <TableCell sx={{ fontWeight: "700", color: '#101010', fontFamily: "Roboto", fontSize: '1.1rem' }}>Email</TableCell>
                                            <TableCell sx={{ fontWeight: "700", color: '#101010', fontFamily: "Roboto", fontSize: '1.1rem' }}>Message</TableCell>
                                            <TableCell sx={{ fontWeight: "700", color: '#101010', fontFamily: "Roboto", fontSize: '1.1rem' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* {comments?.map((comment, index) => ( */}
                                        {comments
                                            ?.filter(comment => comment?.status !== "deleted")
                                            .map((comment, index) => (
                                                <TableRow key={comment?._id}>
                                                    <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem' }}>{index + 1}</TableCell>
                                                    <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem' }}>{comment?.name}</TableCell>
                                                    <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem' }}>{comment?.email}</TableCell>
                                                    <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem' }}>{comment?.comment}</TableCell>
                                                    <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem' }}>
                                                        {comment?.status !== "approved" && (
                                                            <IconButton
                                                                color="#101010"
                                                                onClick={() => handleEditComment(comment, "approved")}
                                                            >
                                                                <span style={{ fontSize: "1rem" }}>Approve</span>
                                                            </IconButton>
                                                        )}
                                                        <IconButton
                                                            color="#101010"
                                                            onClick={() => handleEditComment(comment, "deleted")}
                                                        >
                                                            <span style={{ fontSize: "1rem" }}>Delete</span>
                                                        </IconButton>

                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        ) : (
                            <div className="not-found-cont">
                                <h2 className="h2">No Comment Found.</h2>
                            </div>
                        )
                        }

                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default AdminBlogs;
