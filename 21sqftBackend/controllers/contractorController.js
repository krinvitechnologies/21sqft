import { Contractor } from "../models/contractorModel.js";
import { User } from "../models/userModel.js";
import validator from "validator";

// get contractor profile
export const getContractor = async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.user.userId);

    if (!contractor) {
      return res.status(404).json({
        success: false,
        error: "Contractor not found",
      });
    }

    // Extract only the fields you want to send to the frontend
    const { _id, name, email, phoneNo, service, address, city, state, image, like, price, shortDescription, description } = contractor;

    res.status(200).json({
      success: true,
      contractor: {
        id: _id,
        name,
        email,
        phoneNo,
        service,
        address,
        city,
        state,
        image,
        like,
        price,
        shortDescription,
        description,
      }
    });
  } catch (error) {
    console.error("Error fetching contractor profile:", error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};


// edit supplier profile
export const contractorEdit = async (req, res) => {
  try {
    let images = [];

    // Check if req.body contains base64 encoded images
    if (req.body.images && req.body.images.length > 0) {
      images = req.body.images;
    }

    const { name, email, phoneNo, service, address, city, state, shortDescription, description, price } = req.body;

    // Validation checks
    if (!name || !email || !phoneNo || !service || !address || !city || !state || !price || !shortDescription) {
      return res.status(400).json({ success: false, message: "All Fields Are Required" });
    }

    if (phoneNo.length !== 10 || !/^[0-9]{10}$/.test(phoneNo)) {
      return res.status(400).json({ success: false, message: "Please enter a valid phone number" });
    }

    if (!validator.isMobilePhone(phoneNo, 'en-IN')) {
      return res.status(400).json({ message: 'Please enter a valid phone number' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Please enter a valid email' });
    }

    // Find the contractor by ID
    const contractor = await Contractor.findById(req.user.userId);

    if (!contractor) {
      return res.status(404).json({ success: false, message: "Contractor not found" });
    }

    // Remove images that are not in the updated list
    const imagesToRemove = contractor.image.filter(image => !images.includes(image));

    // Delete images from the database
    await Contractor.findByIdAndUpdate(req.user.userId, { $pull: { image: { $in: imagesToRemove } } });

    const updatedContractor = await Contractor.findByIdAndUpdate(req.user.userId, {
      $set: {
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
      },
      // $addToSet: {
      //   image: { $each: images },
      // },
      $addToSet: {
        image: { $each: images },
      },
    }, { new: true }); // Add { new: true } option to return updated document

    if (!updatedContractor) {
      return res.status(404).json({ success: false, message: "Contractor not found" });
    }

    // Set password field to undefined
    updatedContractor.password = undefined;

    res.status(200).send({ status: "success", message: "Profile updated successfully", contractor: updatedContractor });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", message: "An error occurred while updating profile" });
  }
};


// like
export const like = async (req, res) => {
  try {
    const { businessId } = req.body;
    const userId = req.user.userId;

    const contractor = await Contractor.findById(businessId);
    const user = await User.findById(userId);

    if (!contractor) {
      return res.status(404).json({ success: false, message: "Contractor not found" });
    }

    const index = contractor.likes.indexOf(userId);
    if (index === -1) {
      // User has not liked the business, add like
      contractor.likes.push(userId);
      contractor.totalLikes += 1; // Increment total likes count
      await contractor.save();

      // Add business ID to user's liked businesses
      user.likedBusinesses.push(businessId);
      await user.save();

      return res.status(200).json({ success: true, message: "Liked", totalLikes: contractor.totalLikes });
    } else {
      // User has already liked the business, remove like
      contractor.likes.splice(index, 1);
      contractor.totalLikes -= 1; // Decrement total likes count
      await contractor.save();

      // Remove business ID from user's liked businesses
      const businessIndex = user.likedBusinesses.indexOf(businessId);
      if (businessIndex !== -1) {
        user.likedBusinesses.splice(businessIndex, 1);
        await user.save();
      }

      return res.status(200).json({ success: true, message: "Unliked", totalLikes: contractor.totalLikes });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};


// fetch contractor data
export const getAllContractor = async (req, res) => {
  try {
    const contractors = await Contractor.find();

    // Extract only the fields you want to send to the frontend for each contractor
    const contractorData = contractors.map(contractor => ({
      _id: contractor._id,
      name: contractor.name,
      phoneNo: contractor.phoneNo,
      service: contractor.service,
      address: contractor.address,
      city: contractor.city,
      state: contractor.state,
      image: contractor.image,
      shortDescription: contractor.shortDescription,
      price: contractor.price,
      description: contractor.description,
      like: contractor.like,
      totalLikes: contractor.totalLikes,
      status: contractor.status,
      //  image: contractor.image ? fs.readFileSync(contractor.image).toString('base64') : null,
    }));

    res.status(200).json({
      success: true,
      contractors: contractorData,
    });
  } catch (error) {
    console.error("Error fetching contractors:", error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const getContractorDetails = async (req, res) => {
  try {
    // console.log('req.params.id', req.params.id);
    const contractor = await Contractor.findById(req.params.id);

    if (!contractor) {
      return res.status(404).json({
        success: false,
        message: "Contractor not found",
      });
    }

    // Extract only the fields you want to send to the frontend
    const contractorData = {
      _id: contractor._id,
      name: contractor.name,
      phoneNo: contractor.phoneNo,
      service: contractor.service,
      address: contractor.address,
      city: contractor.city,
      state: contractor.state,
      image: contractor.image,
      shortDescription: contractor.shortDescription,
      description: contractor.description,
      price: contractor.price,
      like: contractor.like,
    };

    res.status(200).json({
      success: true,
      contractor: contractorData,
    });
  } catch (error) {
    console.error("Error fetching contractor:", error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};



// search
// export const search = async (req, res) => {
//   try {
//     var Search = req.body;
//     var data = await Contractor.find({
//       $or: [
//         { name: { $regex: ".*" + Search + ".*", $options: "i" } },
//         { phone: { $regex: ".*" + Search + ".*", $options: "i" } },
//         { service: { $regex: ".*" + Search + ".*", $options: "i" } },
//         { address: { $regex: ".*" + Search + ".*", $options: "i" } },
//         { city: { $regex: ".*" + Search + ".*", $options: "i" } },
//         { state: { $regex: ".*" + Search + ".*", $options: "i" } },
//       ],
//     });
//     if (data.length > 0) {
//       res.status(200).json({ data });
//     } else {
//       res.status(500).send({ status: "failed", message: "Data not found" });
//     }
//   } catch (error) {
//     res.status(500).send({ status: "failed", message: error });
//   }
// };
export const search = async (req, res) => {
  try {
    var { q: search, city, state, service, completeAddress } = req.query;

    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: ".*" + search + ".*", $options: "i" } },
          { phone: { $regex: ".*" + search + ".*", $options: "i" } },
          { service: { $regex: ".*" + search + ".*", $options: "i" } },
          { address: { $regex: ".*" + search + ".*", $options: "i" } },
          { city: { $regex: ".*" + search + ".*", $options: "i" } },
          { state: { $regex: ".*" + search + ".*", $options: "i" } },
        ],
      };
    } else {
      // Check if completeAddress contains "India" and remove it
      console.log('completeAddress', completeAddress);
      if (completeAddress.includes('India')) {
        completeAddress = completeAddress.replace(/, India/g, '');
      }

      const addressWords = completeAddress.split(', '); // Split the completeAddress string into individual words

      // Construct the query to search for each word in the address field
      query = {
        $or: addressWords.map(word => ({
          address: { $regex: ".*" + word + ".*", $options: "i" }
        })),
        $and: [
          { service: { $regex: ".*" + service + ".*", $options: "i" } },
        ],
      };
    }

    var data = await Contractor.find(query);

    if (data.length > 0) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ status: "failed", message: "Data not found" });
    }
  } catch (error) {
    res.status(500).send({ status: "failed", message: error });
  }
};


// contractor logout
export const contractorLogout = async (req, res, next) => {

  res.cookie("21sqft", "", {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out"
  })

}


// this controller is searching according to the city and state 
// export const search = async (req, res) => {
//   try {
//     var { q: search, city, state, service } = req.query;
//     console.log('req.query', req.query);
//     // console.log(city);
//     // console.log(address);
//     // console.log(service);
//     // let query;
//     let query = {};
//     if (search) {
//       query = {
//         $or: [
//           { name: { $regex: ".*" + search + ".*", $options: "i" } },
//           { phone: { $regex: ".*" + search + ".*", $options: "i" } },
//           { service: { $regex: ".*" + search + ".*", $options: "i" } },
//           { address: { $regex: ".*" + search + ".*", $options: "i" } },
//           { city: { $regex: ".*" + search + ".*", $options: "i" } },
//           { state: { $regex: ".*" + search + ".*", $options: "i" } },
//         ],
//       };
//     } else {
//       // query = {
//       //     $or: [
//       //       { service: { $regex: ".*" + service + ".*", $options: "i" } },
//       //       { state: { $regex: ".*" + state + ".*", $options: "i" } },
//       //       { city: { $regex: ".*" + city + ".*", $options: "i" } },
//       //     ],
//       //   };
//       // }

//       query = {
//         $or: [
//           {
//             $and: [
//               { service: { $regex: ".*" + service + ".*", $options: "i" } },
//               { city: { $regex: ".*" + city + ".*", $options: "i" } },
//             ],
//           },
//           {
//             $and: [
//               { service: { $regex: ".*" + service + ".*", $options: "i" } },
//               { state: { $regex: ".*" + state + ".*", $options: "i" } },
//             ],
//           },
//         ],
//       };
//     }

//     var data = await Contractor.find(query);
//     // console.log('data', data);
//     if (data.length > 0) {
//       res.status(200).json({ data });
//     } else {
//       res.status(404).json({ status: "failed", message: "Data not found" });
//     }
//   } catch (error) {
//     res.status(500).send({ status: "failed", message: error });
//   }
// };