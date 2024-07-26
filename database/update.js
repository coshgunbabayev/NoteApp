import User from "../models/userModel.js";

async function updateDocuments() {
    // try {
    //     const documents = await User.find({});
    //     for (let doc of documents) {
    //         if(!doc.bio) {
    //             doc.bio = '';
    //             await doc.save();
    //         };

    //         if (!doc.profilePicture) {
    //             doc.profilePicture = '';
    //             await doc.save();
    //         };

    //         if (!doc.profilePictureId) {
    //             doc.profilePictureId = '';
    //             await doc.save();
    //         };
    //     };
    //     console.log('All documentation updated');
    // } catch (err) {
    //     console.log(err);
    // };
};

export default updateDocuments;