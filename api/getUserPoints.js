import { db, auth } from '../firebase';

export const getUserPoints = async () => {
    const currentUserID = auth.currentUser.uid;
    console.log('curre', currentUserID);
    if (currentUserID) {
        const documentSnapshot = await db
            .collection('points')
            .doc(currentUserID)
            .get();
        console.log('ddi', documentSnapshot);
        const data = await documentSnapshot.data();
        console.log('asd', data);
        return data;
    }
};
