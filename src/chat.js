import React from "react";
import { connect } from "react-redux";
import { initSocket } from "./socket";
import { showChat, newMessage } from "./actions";
import { toReadableDate } from './util';
import ProfilePic from "./profilepic";

export class Chat extends React.Component {
  constructor() {
    super();
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    !this.props.allMessages && this.props.dispatch(showChat());
    console.log("Chat componentDidMount!");
  }

  componentDidUpdate() {
    if (!this.ref) {
      return;
    }
    this.ref.scrollTop = this.ref.scrollHeight - this.ref.clientHeight;
  }

  sendMessage(e) {
    console.log("sendMessage in chat component");
    let socket = initSocket();

    if (e.which == 13) {
      let message = e.target.value;
      socket.emit("newMessage", message);
      e.target.value = "";
    }
  }

  render() {
    const { allMessages } = this.props;
    if (!allMessages) {
      return <div>There is no message yet.</div>;
    }
    const renderChat = (
      <div>
        <h1 className="chat-name">Chat Room</h1>
        <div
          className="chat-messages-container"
          ref={ref => (this.ref = ref)}
        >
          {this.props.allMessages.map((message, key) => (
            <div key={key} className="single-message">
              <p className="d-flex p-2">
                <div style={{ flexGrow: 1 }}>
                  <b className="text-uppercase">{message.firstname} {message.lastname}: </b>
                  <span id="chat-message">{message.chat_message}</span>
                </div>
                <div className="mx-2">{toReadableDate(message.created_at)}</div>
              </p>
            </div>
          ))}
        </div>
        <textarea
          className="chat-textarea mt-3"
          placeholder="Message..."
          onKeyDown={this.sendMessage}
        />
      </div>
    );

    return (
      <div>
        {!allMessages.length && <h1>let's have a chat</h1>}
        {!!allMessages.length && renderChat}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allMessages: state.allMessages
  };
};

export default connect(mapStateToProps)(Chat);

