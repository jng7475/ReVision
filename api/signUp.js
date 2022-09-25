import { db, auth } from '../firebase';

export const postUserDetails = async (userDetails) => {
    const currentUserID = auth.currentUser?.uid;
    if (currentUserID) {
        await db.collection('users').doc(currentUserID).set({
            userDetails,
        });
        await db.collection('users').doc(currentUserID).update({ points: 0 });
    }
};
