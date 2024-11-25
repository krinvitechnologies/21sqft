import React, { useRef, useState, useEffect, useCallback } from 'react'
import './supplierregister.css'
import { Link, useNavigate } from 'react-router-dom'
import { supplierRegister } from '../../../redux/actions/supplierAuthAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';
import ServicesSidebar from '../../../containers/ServicesSidebar/ServicesSidebar';
import validator from 'validator';
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../../redux/constants/constant";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true; // Load script asynchronously
  script.defer = true; // Use defer to ensure the script is executed after the document has finished parsing

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  // Add loading=async attribute
  script.setAttribute('loading', 'async');
  document.getElementsByTagName("head")[0].appendChild(script);
};


function SupplierRegister() {

  const inputRef = useRef(null)
  // const formRef = useRef(null);
  const [profilePic, setProfilePic] = useState('');
  const [serviced, setServiced] = useState(false)
  const [service, setService] = useState('');
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [password, setPassword] = useState('')
  const [price, setPrice] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  // const [image, setImage] = useState('')
  // const [base64Image, setBase64Image] = useState('');
  // eslint-disable-next-line
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 28.7041,
    lng: 77.1025,
  });

  const autoCompleteRef = useRef(null);
  const handleScriptLoad = useCallback((updateQuery) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        componentRestrictions: { country: "IN" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  }, []);

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    // console.log({ query });
    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };
    // console.log({ latLng });
    setSelectedLocation(latLng);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
      () => handleScriptLoad(setAddress)
    );
  }, [handleScriptLoad]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.supplierAuthReducer);

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      if (!name || !phoneNo || !email || !service || !address || !city || !state || !password || !shortDescription || !price || !profilePic) {
        toast.error("All fields are required");
      }
      else if (!validator.isMobilePhone(phoneNo, 'en-IN')) {
        toast.error('Please enter a valid phone number');
      }
      else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || !validator.isEmail(email)) {
        toast.error("Please enter a valid email")
      }
      else if (password.length < 6) {
        toast.error("Password length must be at least 6 characters");
      } else {
        const supplierRegisterData = {
          image: profilePic,
          name,
          email,
          phoneNo,
          service,
          address,
          city,
          state,
          price,
          password,
          shortDescription,
        };

        // Dispatch action to register supplier
        const response = await dispatch(supplierRegister(supplierRegisterData, navigate));

        // Clear input fields upon successful registration
        if (response && response.success) {
          setName('');
          setEmail('');
          setPhoneNo('');
          setService('');
          setAddress('');
          setCity('');
          setState('');
          setPassword('');
          setPrice('');
          setShortDescription('');
        }
      }
    } catch (error) {
      console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
    }
  };

  const changeimg = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };


  // const convertToBase64 = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setBase64Image(reader.result);
  //   };
  //   reader.onerror = (error) => {
  //     console.error('Error converting image to base64:', error);
  //   };
  // };

  // const changeimg = (event) => {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   // Read the file as base64 and set it as profilePic state
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setProfilePic(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };


  // const upload = async () => {
  //   try {
  //     const newform = new FormData();
  //     newform.append("file", profilePic);
  //     const res = await axiosRequest.post("/upload", newform);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleRegister = async (e) => {
  //   try {
  //     e.preventDefault();

  //     // const supplierRegisterData = {
  //     //   name,
  //     //   phoneNo,
  //     //   service,
  //     //   address,
  //     //   city,
  //     //   state,
  //     //   image: profilePic,
  //     //   password
  //     // };

  //     if (!name || !phoneNo || !service || !address || !city || !state || !password || !shortDescription || !price) {
  //       toast.error("All fields are required");
  //     }
  //     else if (!validator.isMobilePhone(phoneNo, 'en-IN')) {
  //       toast.error('Please enter a valid phone number');
  //     }
  //     else if (password.length < 6) {
  //       toast.error("Password length must be at least 6 characters");
  //     } else {
  //       const supplierRegisterData = new FormData();
  //       supplierRegisterData.append("file", profilePic);
  //       supplierRegisterData.append("name", name);
  //       supplierRegisterData.append("phoneNo", phoneNo);
  //       supplierRegisterData.append("service", service);
  //       supplierRegisterData.append("address", address);
  //       supplierRegisterData.append("city", city);
  //       supplierRegisterData.append("state", state);
  //       supplierRegisterData.append("price", price);
  //       supplierRegisterData.append("password", password);
  //       supplierRegisterData.append("shortDescription", shortDescription);

  //       const response = await dispatch(supplierRegister(supplierRegisterData, navigate));

  //       // Clear input fields upon successful registration
  //       if (response && response.success) {
  //         setName("");
  //         setPhoneNo("");
  //         setService("");
  //         setAddress("");
  //         setCity("");
  //         setState("");
  //         setPassword("");
  //       }
  //     }
  //   } catch (error) {
  //     console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
  //   }
  // };

  if (loading) {
    return <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <PulseLoader color="#FECC00" />
    </div>
  }


  const openServiceSidebar = () => {
    setServiced(true);
  };

  const closeServiceSidebar = () => {
    setServiced(false);
    setService(sessionStorage.getItem('opts'));
  };

  return (
    <div className='supplier-register'>
      <div className='left-sr'>
        <img src='/image/div2.jpg' alt='img' />
      </div>
      <div className='right-sr'>
        <div className="right-top-sr">
          <div>
            <Link to="/" className="ul-link">
              Back
            </Link>
          </div>
          <img src="/image/sq.jpg" alt="" />
        </div>

        <form action=""
          onSubmit={(e) => {
            handleRegister(e);
          }}
          encType="multipart/form-data">
          <div className="supplier-register-form">
            <div className="sr-welcome-text">
              <h3>Welcome!</h3>
            </div>

            <div className="sr-tab-cont">
              <Link to="/user/login" className="sr-user-link">
                User
              </Link>
              <Link to="/supplier/login" className="sr-login-link">
                Contractor/Supplier
              </Link>
            </div>

            <div className="Bhrl3">

              <div className="bhrl3">
                {/* <div className="sr-form-field">
                  <label htmlFor="mmr" >Name
                    <input id='mmr' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter you name of  your company' />
                  </label>
                </div> */}
                <div className="honeservl3">
                  <div className="sr-form-field">
                    <label htmlFor="mmr" >Name
                      <input id='mmr' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />
                    </label>
                    <label htmlFor="mmr" >Email
                      <input id='mmr' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
                    </label>
                  </div>
                </div>

                <div className="honeservl3">
                  <div className="sr-form-field">
                    <label htmlFor="mmr1">Phone no
                      <input id="mmr1" type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} placeholder='Enter your phone no' />
                    </label>

                    <label htmlFor='mmr2'>Service
                      <input id='mmr2' type="text" onClick={openServiceSidebar} value={service} onChange={(e) => setService(e.target.value)} placeholder='Enter Service you provide' />
                    </label>

                  </div>

                </div>
                {serviced && <ServicesSidebar service0={closeServiceSidebar} />}
              </div>

              {/* <div className="pniml3" >
                {profilePic ? (<img src={URL.createObjectURL(profilePic)} className='wiii' alt='' />) : (<label htmlFor="file-inputl3"><div className="dragerl3"></div><p>+ Upload profile picture</p></label>)}
                <input type="file" value={image} onChange={changeimg} ref={inputRef} id="file-inputl3" style={{ display: 'none' }} className="upload-inputl3" accept="image/jpeg, image/png" />
                <input type="file" onChange={changeimg} ref={inputRef} id="file-inputl3" style={{ display: 'none' }} className="upload-inputl3" accept="image/jpeg, image/png" />
              </div> */}
              <div className="pniml3">
                {profilePic ? (
                  <label htmlFor="file-inputl3">
                    <img src={profilePic} className='wiii' alt='' />
                    <p>+ Upload profile picture</p>
                  </label>
                  // <img src={profilePic} className='wiii' alt='' />
                ) : (
                  <label htmlFor="file-inputl3">
                    <div className="dragerl3"></div>
                    <p>+ Upload profile picture</p>
                  </label>
                )}
                <input type="file" onChange={changeimg} ref={inputRef} id="file-inputl3" style={{ display: 'none' }} className="upload-inputl3" accept="image/jpeg, image/png" />
              </div>
            </div>

            <div className="sr-form-field">
              <label>Address
                <input id='dlr1' type="text" placeholder='' ref={autoCompleteRef} value={address} onChange={(e) => setAddress(e.target.value)} />
              </label>
            </div>

            <div className="sr-form-field">
              <label>City
                <input id='dlr2' type="text" placeholder='' value={city} onChange={(e) => setCity(e.target.value)} />
              </label>
              <label>State
                <input id='dlr3' type="text" placeholder='' value={state} onChange={(e) => setState(e.target.value)} />
              </label>
            </div>

            <div className="sr-form-field">
              <label>Short Description
                <input id='shortDescription' type="text" placeholder='' value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
              </label>
            </div>

            <div className="sr-form-field">
              <label>Price
                <input id='price' type="text" placeholder='' value={price} onChange={(e) => setPrice(e.target.value)} />
              </label>
            </div>

            <div className="sr-form-field">
              <label htmlFor='cce'>Password
                <input id='cce' type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
            </div>
          </div>
          <div className="bottom-sr">
            <button type='submit' onClick={handleRegister}>Registration</button>
            <div> Already have an account
              <Link to='/supplier/login' className='sr-link'>Login</Link></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SupplierRegister