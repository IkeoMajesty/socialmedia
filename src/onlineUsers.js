import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { onlineUsers } from "./actions";

export class OnlineUsers extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { onlineUsers } = this.props;
    if (!onlineUsers) {
      return <h1>No online users.</h1>;
    }

    const renderOnlineUsers = (
      <div>
        <h1>Online Users:</h1>
        <div className="row">
          {this.props.onlineUsers.map(user => (
            <div key={user.id} className="friend col-md-6">
              <p>
                <b>User Name:</b>{user.firstname} {user.lastname}
              </p>
               <Link to={`user/${user.id}`}>
                  {!user.image ? (
                    <img
                      className="pic"
                      src="https://assets.pcmag.com/media/images/357201-how-to-lock-down-your-facebook-profile.jpg?thumb=y&width=275&height=275"
                    />
                  ) : (
                    <img className="pic" src={user.image} />
                  )}
               </Link>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div>
        {!onlineUsers.length && <h1>No online users.</h1>}
        {!!onlineUsers.length && renderOnlineUsers}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    onlineUsers: state.onlineUsers
  };
}

export default connect(mapStateToProps)(OnlineUsers);
