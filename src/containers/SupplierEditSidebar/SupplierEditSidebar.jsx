import React, { useEffect, useRef, useState } from 'react'
import './suppliereditsidebar.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import { supplierEditProfile } from '../../redux/actions/supplierAuthAction';
import { PulseLoader } from 'react-spinners';
import validator from 'validator';

function SupplierEditSidebar({ SupplierEditProfileSidebar }) {

    const { loading, supplier } = useSelector(state => state.supplierAuthReducer);

    const [name, setName] = useState(supplier?.contractor?.name || '')
    const [email, setEmail] = useState(supplier?.contractor?.email || '')
    const [phoneNo, setPhoneNo] = useState(supplier?.contractor?.phoneNo || '')
    const [service, setService] = useState(supplier?.contractor?.service || '')
    const [address, setAddress] = useState(supplier?.contractor?.address || '')
    const [city, setCity] = useState(supplier?.contractor?.city || '')
    const [state, setState] = useState(supplier?.contractor?.state || '')
    const [price, setPrice] = useState(supplier?.contractor?.price || '')
    const [shortDescription, setShortDescription] = useState(supplier?.contractor?.shortDescription || '')
    const [description, setDescription] = useState(supplier?.contractor?.description || '')
    const [images, setImages] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {
        if (supplier && supplier?.contractor) {
            setName(supplier?.contractor?.name || '');
            setEmail(supplier?.contractor?.email || '');
            setPhoneNo(supplier?.contractor?.phoneNo || '');
            setService(supplier?.contractor?.service || '');
            setAddress(supplier?.contractor?.address || '');
            setCity(supplier?.contractor?.city || '');
            setState(supplier?.contractor?.state || '');
            setPrice(supplier?.contractor?.price || '');
            setShortDescription(supplier?.contractor?.shortDescription || '');
            setDescription(supplier?.contractor?.description || '');
            setImages(supplier?.contractor?.image || '');
        }
    }, [supplier]);

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'scroll';
        };
    }, []);

    const inputRef = useRef(null);

    const handleimg = () => {
        inputRef.current.click();
    };


    // const changeimg = async (event) => {
    //     const files = event.target.files;
    //     const fileArray = Array.from(files);

    //     const base64Array = await Promise.all(fileArray.map(file => convertToBase64(file)));
    //     setImages((prevImages) => [...prevImages, ...base64Array]);
    // };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };


    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        handleImageUpload(files);
    };

    const handleImageUpload = async (files) => {
        const fileArray = Array.from(files);

        const base64Array = await Promise.all(fileArray.map(async (file) => {
            if (file.size > 1024 * 1024) { // Check if file size exceeds 1 MB
                toast.error("File size should not exceed 1 MB");
                return null;
            } else {
                return await convertToBase64(file);
            }
        }));

        // Filter out null values (files exceeding size limit) before updating state
        const filteredBase64Array = base64Array.filter(Boolean);

        setImages((prevImages) => [...prevImages, ...filteredBase64Array]);
    };


    const changeimg = async (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);

        const base64Array = await Promise.all(fileArray.map(file => {
            if (file.size > 1024 * 1024) { // Check if file size exceeds 1 MB
                toast.error("File size should not exceed 1 MB");
                return null;
            } else {
                return convertToBase64(file);
            }
        }));

        // Filter out null values (files exceeding size limit) before updating state
        const filteredBase64Array = base64Array.filter(Boolean);

        setImages((prevImages) => [...prevImages, ...filteredBase64Array]);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((image, i) => i !== index));
    };

    // const handleSave = async (e) => {
    //     try {
    //         e.preventDefault();
    //         // if (
    //         //     !name ||
    //         //     !phoneNo ||
    //         //     !service ||
    //         //     !address ||
    //         //     !city ||
    //         //     !state ||
    //         //     !price ||
    //         //     !shortDescription ||
    //         //     !description ||
    //         //     !images
    //         // ) {
    //         //     toast.error("All fields are required");
    //         // } else {
    //         console.log('images', images);
    //         const newform = new FormData();
    //         // images.forEach((image, index) => {
    //         //     // Append all files with the same field name
    //         //     newform.append("file", image);
    //         // });
    //         // images.forEach((image, index) => {
    //         //     // Append all base64 strings with the same field name
    //         //     newform.append(`image${index}`, image);
    //         // });
    //         // images.forEach((image, index) => {
    //         //     newform.append("images", image);
    //         // });
    //         // Append each image as a file
    //         images.forEach((image, index) => {
    //             const file = dataURLtoFile(image, `image_${index}.png`);
    //             newform.append("images", file);
    //         });

    //         // newform.append("file", images);
    //         newform.append("name", name);
    //         newform.append("phoneNo", phoneNo);
    //         newform.append("service", service);
    //         newform.append("address", address);
    //         newform.append("city", city);
    //         newform.append("state", state);
    //         newform.append("price", price);
    //         newform.append("shortDescription", shortDescription);
    //         // Log the FormData object
    //         console.log("FormData:", newform);
    //         // console.log(newform);
    //         const response = await dispatch(supplierEditProfile(newform));

    //         // Clear input fields upon successful registration
    //         if (response && response.success) {
    //             setName("");
    //             setPhoneNo("");
    //             setService("");
    //             setAddress("");
    //             setCity("");
    //             setState("");
    //             setPrice("");
    //             setShortDescription("");
    //             setDescription("");
    //         }
    //         dispatch(getSupplier());
    //         // }
    //     } catch (error) {
    //         console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
    //         // toast.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
    //     }
    // };

    // // Function to convert base64 string to File object
    // const dataURLtoFile = (dataUrl, filename) => {
    //     const arr = dataUrl.split(',');
    //     const mime = arr[0].match(/:(.*?);/)[1];
    //     const bstr = atob(arr[1]);
    //     let n = bstr.length;
    //     const u8arr = new Uint8Array(n);
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     return new File([u8arr], filename, { type: mime });
    // };


    const handleSave = async (e) => {
        try {
            e.preventDefault();
            if (
                !name ||
                !email ||
                !phoneNo ||
                !service ||
                !address ||
                !city ||
                !state ||
                !price ||
                !shortDescription ||
                !description
            ) {
                toast.error("All fields are required");
            }
            else if (!validator.isMobilePhone(phoneNo, 'en-IN')) {
                toast.error('Please enter a valid phone number');
            } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || !validator.isEmail(email)) {
                toast.error("Invalid Email")
            } else if (images.length === 0) {
                toast.error('Please upload at least one image');
            } else {
                const supplierEditProfileData = {
                    name: name,
                    email: email,
                    phoneNo: phoneNo,
                    service: service,
                    address: address,
                    city: city,
                    state: state,
                    price: price,
                    shortDescription: shortDescription,
                    description: description,
                    images: images
                };

                dispatch(supplierEditProfile(supplierEditProfileData));
            }
        } catch (error) {
            console.error('Something went wrong:', error);
        }
    };

    return (
        <Drawer
            anchor="right" // Anchor the drawer to the right side
            open={true} // Always open when rendered
            onClose={SupplierEditProfileSidebar} // Close the drawer when clicking outside
        >
            <div className="sep-modal">
                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh'
                    }}>
                        <PulseLoader color="#FECC00" />
                    </div>
                ) : (
                    <form className="sep-modal-form">

                        <div className="sep-modal-form-field">
                            <label>
                                Name
                                <input
                                    type="text"
                                    placeholder='Enter your name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <label>
                                Email
                                <input
                                    type="email"
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="sep-modal-form-field">
                            <label>
                                Phone no
                                <input
                                    type="text"
                                    placeholder='Enter your Phone Number'
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                />
                            </label>
                            <label>
                                Services
                                <input
                                    type="text"
                                    placeholder='Enter your Service'
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="sep-modal-form-field">
                            <label>
                                Address
                                <input
                                    type="text"
                                    placeholder='Enter your Address'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="sep-modal-form-field">
                            <label>
                                City
                                <input
                                    type="text"
                                    placeholder='Enter your City'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </label>
                            <label>
                                State
                                <input
                                    type="text"
                                    placeholder='Enter your State'
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </label>
                            <label>
                                Price
                                <input
                                    type="text"
                                    placeholder='Enter your Price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="sep-modal-form-field">
                            <label>
                                Short Description
                                <input
                                    type="text"
                                    placeholder='Enter your Short Description'
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="sep-modal-form-field">
                            <label>
                                Description
                                <textarea
                                    placeholder='Enter your Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="uploadimg">
                            <div className="up00">Upload Photos</div>
                            <div className="dotted-box" onClick={handleimg} onDragOver={handleDragOver} onDrop={handleDrop}>
                                <div className="load">
                                    <div className="load1">
                                        <input
                                            type="file"
                                            onChange={changeimg}
                                            ref={inputRef}
                                            style={{ display: 'none' }}
                                            id="file-input"
                                            className="upload-input"
                                            accept="image/jpeg, image/png"
                                            multiple
                                        />

                                        <label
                                            htmlFor="file-input"
                                            className="upload-label"
                                        >
                                            <div
                                                className="drag"
                                                htmlFor="file-input"
                                            >
                                                <i className="fa-solid fa-cloud-arrow-up"></i>
                                            </div>
                                            <p>Drag and Drop</p>
                                        </label>
                                        <p>
                                            Browse to upload. only png,jpeg, upto
                                            1 MB
                                        </p>
                                    </div>
                                </div>
                                <div className="boximg">
                                    {images.map((image, index) => (
                                        <div className="bo1" key={index}>
                                            <div
                                                className="contain"
                                                onClick={() => removeImage(index)}
                                            >
                                                X
                                            </div>
                                            <div id="boxes">
                                                <img
                                                    // src={URL.createObjectURL(
                                                    //     image
                                                    // )}
                                                    src={image}
                                                    className="wii1"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button type='submit' className='sep-modal-save-btn' onClick={handleSave}>Save</button>

                    </form>
                )}
            </div>
        </Drawer>
    )
}

export default SupplierEditSidebar