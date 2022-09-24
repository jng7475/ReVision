import { db, auth } from '../firebase';

export const setUserPoints = async (points) => {
    const currentUserID = auth.currentUser?.uid;
    if (currentUserID) {
        await db
            .collection('users')
            .doc(currentUserID)
            .update({ points: points });
    }
};
