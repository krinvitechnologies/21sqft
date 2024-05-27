import React, { useCallback, useEffect, useRef, useState } from "react";
import "./banner.css";
import search1 from "./banner images/Group 3.png";
import { useNavigate } from "react-router-dom";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../../redux/constants/constant";
import ServicesSidebar from "../../../containers/ServicesSidebar/ServicesSidebar";
import { useDispatch } from "react-redux";
import { fetchSearchResultsByCityAndService } from "../../../redux/actions/searchAction";
import { toast } from "react-toastify";
// import cement from './banner images/cement 1.png'
let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true; // Load script asynchronously

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
  document.getElementsByTagName("head")[0].appendChild(script);
};

const Banner = () => {
  const [serviced, setServiced] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [service, setService] = useState("");
  // eslint-disable-next-line
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 28.7041,
    lng: 77.1025,
  });

  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
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

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };
    const latlang = new window.google.maps.LatLng(latLng.lat, latLng.lng);
    // eslint-disable-next-line
    var geocoder = (geocoder = new window.google.maps.Geocoder());
    geocoder.geocode({ latLng: latlang }, function (results, status) {
      // console.log(results);
      if (status === window.google.maps.GeocoderStatus.OK) {
        // console.log(results[0]);
        if (results[0]) {
          setCity(
            results[0].address_components[
              results[0].address_components.length - 5
            ].long_name
          );
        }
        if (results[results.length - 2]) {
          setState(results[results.length - 2].address_components[0].long_name);
        }
      }
    });

    setSelectedLocation(latLng);
  };
  // console.log('state', state);
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery)
    );
  }, [handleScriptLoad]);

  const openServiceSidebar = () => {
    setServiced(true);
  };

  const closeServiceSidebar = () => {
    setServiced(false);
    setService(sessionStorage.getItem("opts"));
  };

  // search
  const handleSearch = async () => {
    try {
      const addressObject = await autoComplete.getPlace();
      const completeAddress = addressObject?.formatted_address;
      // console.log('completeAddress', completeAddress);

      if ((city.length === 0 || state.length === 0) && service.length === 0) {
        toast.error("Enter location and service");
      }
      else if (city.length === 0 || state.length === 0) {
        toast.error('Enter location');
      }
      else if (service.length === 0) {
        toast.error('Select service');
      }
      else if (!completeAddress) {
        toast.error('Select a valid address');
      }
      else {
        // console.log('service', service);
        dispatch(fetchSearchResultsByCityAndService(city, state, service, completeAddress));
        navigate("/searcher");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleConnect = () => {
  //   navigate("/contact");
  // };

  return (
    <div className="banner">
      {/* <div className="banner-cont">
        <div className="left-banner-text"> */}
          {/* <h1 className="banner-head1">Looking for Reliable</h1>
          <h1 className="banner-head2">Contractor Suppliers?</h1>
          <h3 className="banner-head3">
            Build with Confidence Using Our High-Quality Cement Materials.
          </h3> */}
          {/* <h1 className="banner-head1">Construction का एक ही destination - <span className="banner-head2">21SQFT.com!</span></h1> */}
          {/* <h1 className="banner-head2">21SQFT.com!</h1> */}
          {/* <button className="banner-btn" onClick={handleConnect}>
            Connect Now
          </button>
        </div>
      </div> */}
      <div className="bottom-banner-cont">
        <div className="banner-search-cont">
          <div className="banner-search-field">
            <input
              placeholder="Your City"
              ref={autoCompleteRef}
              onChange={(event) => setQuery(event.target.value)}
              value={query}
            />
          </div>

          <div className="banner-search-field">
            <input
              id="mmr2"
              type="text"
              onClick={openServiceSidebar}
              onChange={(e) => setService(e.target.value)}
              placeholder="Services"
              value={service}
              readOnly
            />
            <img className="banner-search" src={search1} alt="" onClick={handleSearch} />
          </div>
          {serviced && <ServicesSidebar service0={closeServiceSidebar} />}
        </div>
      </div>
    </div>
  );
};

export default Banner;
