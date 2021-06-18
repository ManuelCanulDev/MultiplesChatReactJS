import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import './estilosChatIndividual.css';
import { dbFirestore } from "../services/firebase";

const User = (props) => {

    const { user, onClick } = props;

    return (
        <div onClick={() => onClick(user)} className="displayName" >
            <div className="displayPic">
                      <img src={user.picture} alt="" />
                  </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px' }}>
                <span style={{ fontWeight: 500 }}>{user.firstName} <br></br> Ultima vez: {new Date(user.lastView).toLocaleDateString("en-US")}</span>
            </div>
        </div>
    );
}

const ChatSolo = () => {
    var userActual = JSON.parse(localStorage.getItem('user'));

    const [listUsers, setCurrentListUsers] = useState({});

    const [listConversations, setListConversations] = useState({});

    const [chatStarted, setChatStarted] = useState(false);

    const [chatUser, setChatUser] = useState('');

    const [message, setMessage] = useState('');

    const [userUid, setUserUid] = useState(null);

    const [myUserUid, setMyUserUid] = useState(null);

    // eslint-disable-next-line
    let unsus;

    // eslint-disable-next-line
    let unsusCon;

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
                        setCurrentListUsers(users);
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
        });


    }, []);

    // eslint-disable-next-line
    useEffect(() => {
        return () => {
            unsus.then(f => f()).catch((error) => console.log(error));
        }
    }, []);

    const initChat = (user) => {
        setChatStarted(true);
        setChatUser(`${user.firstName}`);
        setUserUid(user.uid);

        var actualUser = JSON.parse(localStorage.getItem('user'));

        setMyUserUid(actualUser.uid);

        unsusCon = fetchRealTimeConversation({ uid_1: myUserUid, uid_2: userUid }).then((unsuscribe) => {
            return unsuscribe;
        }).catch((error) => {
            console.log(error);
        });

        console.log(user);
    }

    const fetchRealTimeConversation = async (user) => {
        try {
            const unsuscribe = dbFirestore.collection("conversations")
                //.where('user_uid_1', 'in', [user.uid_1, user.uid_2])
                .orderBy("createdAt", "asc")
                .onSnapshot((querySnapShot) => {
                    const conversations = [];
                    querySnapShot.forEach(function (doc) {
                        if (
                            (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
                            ||
                            (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
                        ) {
                            conversations.push(doc.data())
                        }
                    });
                    console.log(conversations);
                    setListConversations(conversations);
                });

            return unsuscribe;
        } catch (err) {
            console.error(err);
        }
    };

    const submitMessage = (e) => {
        const msjObj = {
            user_uid_1: myUserUid,
            user_uid_2: userUid,
            message
        }

        if (message !== "") {
            dbFirestore.collection('conversations')
                .add({
                    ...msjObj,
                    isView: false,
                    createdAt: new Date()
                })
                .then((data) => {
                    console.log(data)
                })
                .catch(error => {
                    console.log(error)
                });
            console.log(msjObj);
        }

        setMessage("");
    }

    const something=(event)=> {
        if (event.keyCode === 13) {
            console.log('enter');
            submitMessage();
            setMessage("");
        }
    }

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
                                    <User
                                        onClick={initChat}
                                        key={user.uid}
                                        user={user} />
                                );
                            }) : null
                    }
                </div>
                <div className="chatArea">

                    <br></br>
                    <div className="chatHeader">
                        {
                            chatStarted ? chatUser : ''

                        }
                    </div>
                    <div className="messageSections">
                        {
                            listConversations.length > 0 ?
                                listConversations.map(con =>
                                    <div key={con.createdAt} style={{ textAlign: con.user_uid_1 === myUserUid ? 'right' : 'left' }}>
                                        {
                                            con.user_uid_1 === myUserUid ?
                                                <p className="messageStyle2" >{con.message}</p>
                                                :
                                                <p className="messageStyle" >{con.message}</p>
                                        }
                                    </div>)
                                : null

                        }
                    </div>
                    {
                        chatStarted ?
                            <div className="chatControls">
                                <textarea
                                    wrap="off"
                                    onKeyDown={(e) => something(e) }
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Escriba su mensaje"
                                />
                                <button onClick={submitMessage}>Enviar</button>
                            </div>
                            : null
                    }

                </div>
            </section>
        </div>
    );
}

export default ChatSolo;