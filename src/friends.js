import React from "react";
import { connect } from "react-redux";
import {
  receiveFriendsRequests,
  endFriendship,
  acceptRequest
} from "./actions";
import { Link } from "react-router-dom";
import Loading from './loading';

class Friends extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    console.log("Friends componentDidMount!");
    !this.props.allFriends &&
      this.props.dispatch(receiveFriendsRequests());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.possibleFriends != nextProps.possibleFriends || this.props.alreadyFriends != nextProps.alreadyFriends) {
      this.setState({ ...this.state, loading: false });
    } 
  }

  render() {
    const  { loading } = this.state;
    const {
      dispatch,
      alreadyFriends,
      possibleFriends,
      allFriends
    } = this.props;
    if (!possibleFriends && !alreadyFriends) {
      return <h1>There is no friends yet!</h1>;
    }

    const renderFriendAndFriendRequests = (
      <div>
        <div className="friends">
          <h2>Friendship Requests:</h2>
          {this.props.possibleFriends && this.props.possibleFriends.map(fr => (
            <div key={fr.id} className="friend">
              <p>
                <b>User Name: </b>{fr.firstname} {fr.lastname}
              </p>
              {!fr.image ? (
                <img
                  className="pic"
                  src="https://assets.pcmag.com/media/images/357201-how-to-lock-down-your-facebook-profile.jpg?thumb=y&width=275&height=275"
                />
              ) : (
                <img className="pic" src={fr.image} />
              )}
              <p>{fr.bio} </p>
              <button
                className="btn bg-warning text-white"
                onClick={() => dispatch(acceptRequest(fr.id))}
              >
                Accept Request
              </button>
            </div>
          ))}
        </div>
        
        <div className="friends">
          <h2>Your friends:</h2>
          <div className="row">
            {this.props.alreadyFriends && this.props.alreadyFriends.map(fr => (
              <div key={fr.id} className="friend">
                <p>
                  <b>User Name: </b>{fr.firstname} {fr.lastname}
                </p>
                {!fr.image ? (
                  <img
                    className="pic"
                    src="https://assets.pcmag.com/media/images/357201-how-to-lock-down-your-facebook-profile.jpg?thumb=y&width=275&height=275"
                  />
                ) : (
                  <img className="pic" src={fr.image} />
                )}
                <p>{fr.bio}</p>
                <button
                  className="btn bg-warning text-white"
                  onClick={() => dispatch(endFriendship(fr.id))}
                >
                  unfriend me!
                </button>
              </div>
            ))}
          </div>
        </div>
      
      </div>
    );

    return (
      <div id="friend">
        {(!allFriends || !allFriends.length) && <h1>There is no friends yet!</h1>}
        {!loading && renderFriendAndFriendRequests}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allFriends: state.allFriends,
    possibleFriends:
      state.allFriends &&
      state.allFriends.filter(fr => !fr.accepted),
    alreadyFriends:
      state.allFriends &&
      state.allFriends.filter(fr => fr.accepted),
  };
}

export default connect(mapStateToProps)(Friends);
