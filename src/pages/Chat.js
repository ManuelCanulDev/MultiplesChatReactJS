import React, { Component } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import '../estilosGrupal.css';
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid
      });
      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container" ref={this.myRef}>
          {this.state.loadingChats ?
            <div className="spinner-border text-success" role="status"><span className="sr-only">Cargando...</span></div>
            : ""
          }
          <h3 className=" text-center">Sala de Platica General</h3>
          <div className="messaging">
            <div className="inbox_msg">
              <div className="mesgs">
                <div className="msg_history">
                  {this.state.chats.map(chat => {
                    if (this.state.user.uid === chat.uid) {
                      return (
                        <div className="outgoing_msg" key={chat.timestamp}>
                          <div className="sent_msg">
                            <p>{chat.content}</p>
                            <span className="time_date">Yo a las {this.formatTime(chat.timestamp)}</span> </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="incoming_msg" key={chat.timestamp}>
                          <div className="received_msg">
                            <div className="received_withd_msg">
                              <p>{chat.content}</p>
                              <span className="time_date">Anonimo dijo a las {this.formatTime(chat.timestamp)}</span></div>
                          </div>
                        </div>
                      );
                    }
                  })
                  }
                </div>
                <div className="type_msg">
                  <div className="input_msg_write">
                    <form onSubmit={this.handleSubmit} className="mx-3">
                      <input type="text"
                        className="write_msg"
                        placeholder="Escribe un mensaje."
                        onChange={this.handleChange}
                        value={this.state.content}
                      />
                      <button className="msg_send_btn" type="submit"><i className="fa fa-paper-plane-o" aria-hidden="true" /></button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
