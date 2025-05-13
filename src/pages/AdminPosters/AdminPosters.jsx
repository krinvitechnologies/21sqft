import React, { useEffect, useState } from "react";
import "./adminposters.css"
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, Box } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSelector, useDispatch } from "react-redux";
import { POSTER_URL } from "../../services/helper.js";
import { addPoster, deletePoster, getPosters } from "../../redux/actions/posterAction.js";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import { toast } from "react-toastify";

const AdminPosters = () => {
    // const [posters, setPosters] = useState([]);
    const [addPosterModalOpen, setAddPosterModalOpen] = useState(false);
    const [posterName, setPosterName] = useState("");
    const [posterImage, setPosterImage] = useState(null);

    const dispatch = useDispatch();
    // const { posters, loading, error } = useSelector((state) => state.poster);
    const { posters, loading, error, addLoading, deleteLoading } = useSelector(state => state.posterReducer) || {};

    useEffect(() => {
        dispatch(getPosters());
    }, [dispatch]);

    // Handle file change
    const handleFileChange = (event) => {
        setPosterImage(event.target.files[0]);
    };

    // Handle form submission
    // const handleAddPoster = async () => {
    //     if (!posterName || !posterImage) {
    //         alert("Please provide both a name and an image.");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("poster_name", posterName);
    //     formData.append("image", posterImage);

    //     try {
    //         // const response = await axios.post("http://localhost:8080/api/v1/poster/add", formData, {
    //         //     headers: { "Content-Type": "multipart/form-data" },
    //         // });

    //         // setPosters((prev) => [...prev, response.data]); // Update the state with new poster
    //         // dispatch(addPoster(formData));
    //         // setAddPosterModalOpen(false);
    //         // setPosterName("");
    //         // setPosterImage(null);
    //         const resultAction = await dispatch(addPoster(formData));
    //         if (addPoster.fulfilled.match(resultAction)) {
    //             setAddPosterModalOpen(false);
    //             setPosterName("");
    //             setPosterImage(null);
    //         }
    //     } catch (error) {
    //         console.error("Error adding poster:", error);
    //     }
    // };

    const handleAddPoster = async () => {
        if (!posterName || !posterImage) {
            // alert("Please provide both a name and an image.");
            toast.error(`${'Please provide both a name and an image.'}`);
            return;
        }

        const formData = new FormData();
        formData.append("poster_name", posterName);
        formData.append("image", posterImage);

        try {
            const result = await dispatch(addPoster(formData));
            if (result?.success) {
                // If the poster is added successfully, close modal and reset fields
                setAddPosterModalOpen(false);
                setPosterName("");
                setPosterImage(null);
                // document.getElementById("posterImageInput").value = null;
            }
        } catch (error) {
            console.error("Error adding poster:", error);
        }
    };

    const handleDeletePoster = async (id) => {
        try {
            // await axios.delete(`http://localhost:8080/api/v1/poster/delete/${id}`); // Replace with your delete API endpoint
            // setPosters((prevPosters) => prevPosters.filter((poster) => poster.id !== id));       
            dispatch(deletePoster(id));
        } catch (error) {
            console.error("Error deleting poster:", error);
        }
    };

    return (
        <div className='hdash'>
            <div className="hdash-cont">
                <div className="left-hdash">
                    <AdminSidebar />
                </div>
                <div className="right-hdash">

                    <div className="poster">
                        <nav className="poster-header">
                            <h1 className="h1">Posters</h1>
                            <button className="primary-button" onClick={() => setAddPosterModalOpen(true)}>Add Poster</button>
                            <Dialog
                                open={addPosterModalOpen}
                                onClose={() => setAddPosterModalOpen(false)}
                                fullWidth={true} // Set to true to make the dialog take up the full width
                                maxWidth="xs"
                                PaperProps={{ style: { backgroundColor: '#F6F6F6', maxWidth: '300px', borderRadius: '20px' } }}
                            >
                                <DialogContent>
                                    <div className="modal-form">
                                        <h1 className="h1">Add Poster</h1>
                                        <label className="label">
                                            Name
                                            <input
                                                type="text"
                                                className="input"
                                                value={posterName}
                                                onChange={(e) => setPosterName(e.target.value)}
                                                required
                                            />
                                        </label>
                                        <label className="label">
                                            Image
                                            <input type="file" accept="image/*" className="input" onChange={handleFileChange} required />
                                        </label>
                                        <button className="primary-button" onClick={handleAddPoster} disabled={addLoading}>
                                            {addLoading ? 'Adding...' : 'Add Poster'}
                                        </button>
                                        {/* <button className="primary-button" onClick={handleAddPoster}>Add Poster</button> */}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </nav>
                        {posters?.length > 0 ? (
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
                                            <TableCell sx={{ fontWeight: "700", color: '#101010', fontFamily: "Roboto", fontSize: '1.1rem' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {posters?.map((poster, index) => (
                                            <TableRow key={poster?._id}>
                                                <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem' }}>{index + 1}</TableCell>
                                                <TableCell>
                                                    <img src={`${POSTER_URL}/${poster?.image}`} alt={poster?.name} width="50" />
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem' }}>{poster?.name}</TableCell>
                                                <TableCell sx={{ fontWeight: "400", color: '#101010', fontFamily: "Roboto", fontSize: '1rem' }}>
                                                    {/* <IconButton onClick={() => handleDeletePoster(poster._id)} color="error">
                                    <DeleteIcon />
                                </IconButton> */}
                                                    <IconButton
                                                        onClick={() => handleDeletePoster(poster?._id)}
                                                        color="error"
                                                        disabled={deleteLoading?.includes(poster?._id)}
                                                        sx={{ fontWeight: "400", fontFamily: "Roboto", fontSize: '1rem' }}
                                                    >
                                                        {deleteLoading?.includes(poster?._id) ? (
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
                                <h2 className="h2">No Posters Found.</h2>
                            </div>
                        )
                        }
                    </div>

                </div>
            </div>
        </div >
    );
};

export default AdminPosters;