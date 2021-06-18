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

export const getRealTimeOneUser = (uid) => {
    dbFirestore.collection("users")
    .where("uid","==",uid)
    .onSnapshot((querySnapShot) => {
        const users = [];
        querySnapShot.forEach(function(doc) {
            users.push(doc.data());
        });
        console.log(users);
    });
}