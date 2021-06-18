import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import './estilosChatIndividual.css';
import { dbFirestore } from "../services/firebase";

const ChatSolo = () => {
    var userActual = JSON.parse(localStorage.getItem('user'));

    const [listUsers, setCurrentPost] = useState({});

    let unsus;

    useEffect(() => {

        const fetchUsers = async (uid) => {
            try {
                const unsuscribe = dbFirestore.collection("users")
                    .onSnapshot((querySnapShot) => {
                        const users = [];
                        querySnapShot.forEach(function (doc) {
                            if (doc.data().uid !== uid) {
                                users.push(doc.data());
                            }
                        });
                        console.log(users);
                        setCurrentPost(users);
                    });

                    return unsuscribe;
            } catch (err) {
                console.error(err);
            }
        };

        // eslint-disable-next-line
        unsus = fetchUsers(userActual.uid).then((unsuscribe) => {
            return unsuscribe;
        }).catch((error) => {
            console.log(error);
        })
        

    }, []);

    useEffect(() => {
        return () => {
            unsus.then(f => f()).catch((error) => console.log(error));
        }
    },[]);

    return (
        <div>
            <Header />
            <br></br>
            <br></br>
            <section className="contenedorDeChat">

                <div className="listOfUsers">
                    <br></br>
                    {
                        listUsers.length > 0 ?
                        listUsers.map(user => {
                                return (
                                    <div key={user.uid} className="displayName">
                                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px' }}>
                                            <span style={{ fontWeight: 500 }}>{user.firstName} <br></br> Ultima vez: {new Date(user.lastView).toLocaleDateString("en-US")}</span>
                                        </div>
                                    </div>
                                );
                            }) : null
                    }
                </div>
                <div className="chatArea">
                    <br></br>
                    <div className="chatHeader"> Rizwan Khan </div>
                    <div className="messageSections">
                        <div style={{ textAlign: 'left' }}>
                            <p className="messageStyle" >Hello User</p>
                        </div>

                    </div>
                    <div className="chatControls">
                        <textarea />
                        <button>Send</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ChatSolo;