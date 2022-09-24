import { db, auth } from '../firebase';

export const postUserDetails = async (userDetails) => {
    const currentUserID = auth.currentUser?.uid;
    console.log(currentUserID);
    if (currentUserID) {
        await db.collection('users').doc(currentUserID).set({
            userDetails,
        });
    }
};
