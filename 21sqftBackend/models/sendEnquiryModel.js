import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business', // Reference to the Business model
    },
    name: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String,
    }
}, {
    timestamps: true
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
