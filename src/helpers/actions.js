import { dbFirestore } from "../services/firebase";

export const getRealTimeUsers = (uid) => {
    dbFirestore.collection("users")
    .onSnapshot((querySnapShot) => {
        const users = [];
        querySnapShot.forEach(function(doc) {
            if(doc.data().uid !== uid){
                users.push(doc.data());
            }
        });
        console.log(users);
    });
}
