import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import '../estilosSolo.css';
import { dbFirestore } from "../services/firebase";

const User = (props) => {
    var userActual = JSON.parse(localStorage.getItem('user'));
    const { user, onClick } = props;

    if (user.uid === "S95f1tgrDpRSNzOUUZPAzcAtUG43") {
        return (
            <div className="chat_list active_chat" onClick={() => onClick(user)}>
                <div className="chat_people">
                    <div className="chat_img"> <img src={user.picture} alt={user.picture} /> </div>
                    <div className="chat_ib">
                        <h5>{userActual.uid === "S95f1tgrDpRSNzOUUZPAzcAtUG43" ? 'UID: ' + user.uid : user.firstName}</h5>
                        <p>{new Date(user.lastView).toLocaleDateString("en-US")}</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="chat_list " onClick={() => onClick(user)}>
                <div className="chat_people">
                    <div className="chat_img"> <img src={user.picture} alt={user.picture} /> </div>
                    <div className="chat_ib">
                        <h5>{userActual.uid === "S95f1tgrDpRSNzOUUZPAzcAtUG43" ? 'UID: ' + user.uid : user.firstName}</h5>
                        <p>{new Date(user.lastView).toLocaleDateString("en-US")}</p>
                    </div>
                </div>
            </div>
        );
    }
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
                            if (userActual.uid === "S95f1tgrDpRSNzOUUZPAzcAtUG43") {
                                if (doc.data().uid !== uid && doc.data().asignado) {
                                    users.push(doc.data());
                                }
                            } else {
                                if (doc.data().uid !== uid) {
                                    users.push(doc.data());
                                }
                            }
                        });
                        //console.log(users);
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

    useEffect(() => {
        return () => {
            unsus.then(f => f()).catch((error) => console.log(error));
        }
        // eslint-disable-next-line
    }, []);

    const initChat = (user) => {
        setChatStarted(true);

        if (userActual.uid === "S95f1tgrDpRSNzOUUZPAzcAtUG43") {
            setChatUser(`${user.uid}`);
        } else {
            setChatUser(`${user.firstName}`);
        }

        setUserUid(user.uid);

        var actualUser = JSON.parse(localStorage.getItem('user'));

        setMyUserUid(actualUser.uid);

        unsusCon = fetchRealTimeConversation({ uid_1: myUserUid, uid_2: userUid }).then((unsuscribe) => {
            return unsuscribe;
        }).catch((error) => {
            console.log(error);
        });

        //console.log(user);
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
                    //console.log(conversations);
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
            //console.log(msjObj);
        }

        setMessage("");
    }

    const something = (event) => {
        if (event.keyCode === 13) {
            //console.log('enter');
            submitMessage();
            setMessage("");
        }
    }

    return (
        <div>
            <Header />
            <div className="container">
                <h3 className=" text-center">Chateando con {chatStarted ? chatUser : '"Seleccione con doble click"'}</h3>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="inbox_people">
                            <div className="headind_srch">
                                <div className="recent_heading">
                                    <h4>Usuarios</h4>
                                </div>
                            </div>
                            <div className="inbox_chat">
                                {
                                    listUsers.length > 0 ?

                                        listUsers.map(user => {
                                            return (
                                                <User
                                                    onClick={initChat}
                                                    key={user.uid}
                                                    user={user} />
                                            );
                                        })
                                        : null
                                }
                            </div>
                        </div>
                        <div className="mesgs">
                            <div className="msg_history">
                                {
                                    listConversations.length > 0 ?
                                        listConversations.map(con =>
                                            <div key={con.createdAt} style={{ textAlign: con.user_uid_1 === myUserUid ? 'right' : 'left' }}>
                                                {
                                                    con.user_uid_1 === myUserUid ?
                                                        <div className="outgoing_msg">
                                                            <div className="sent_msg">
                                                                <p>{con.message}</p>
                                                                <span className="time_date">{new Date(con.createdAt).toLocaleDateString("en-US")}</span> </div>
                                                        </div>
                                                        :
                                                        <div className="incoming_msg">
                                                            <div className="received_msg">
                                                                <div className="received_withd_msg">
                                                                    <p>{con.message}</p>
                                                                    <span className="time_date">{new Date(con.createdAt).toLocaleDateString("en-US")}</span></div>
                                                            </div>
                                                        </div>
                                                }
                                            </div>)
                                        : null
                                }
                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    {
                                        chatStarted ?
                                            <input type="text"
                                                className="write_msg"
                                                placeholder="Escribe un mensaje."
                                                onKeyDown={(e) => something(e)}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                            :
                                            <input disabled type="text"
                                                className="write_msg"
                                                placeholder="Escribe un mensaje."
                                                onKeyDown={(e) => something(e)}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                    }
                                    {
                                        chatStarted ?
                                            <button className="msg_send_btn" type="button" onClick={submitMessage}><i className="fa fa-paper-plane-o" aria-hidden="true" /></button>
                                            :
                                            <button disabled className="msg_send_btn" type="button" onClick={submitMessage}><i className="fa fa-paper-plane-o" aria-hidden="true" /></button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatSolo;