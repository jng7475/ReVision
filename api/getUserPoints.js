import { db, auth } from '../firebase';

export const getUserPoints = async () => {
    const currentUserID = auth.currentUser.uid;
    if (currentUserID) {
        const documentSnapshot = await db
            .collection('users')
            .doc(currentUserID)
            .get();
        const data = await documentSnapshot.data();
        return data;
    }
};
