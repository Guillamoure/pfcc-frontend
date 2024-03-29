import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import localhost from "../localhost";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: false
  };

  // renderSignedIn = () => {
  //   if (this.props.currentUser){
  //     render(){
  //       <Redirect to='/classes'/>
  //     }
  //   }
  // }

  // componentDidMount() {
  //   const token = localStorage.getItem('token')
  //   console.log('token is', token)
  //
  // }

  renderSubmit = e => {
    e.preventDefault();
    fetch(`${localhost}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(r => r.json())
      .then(data => {
        if (!data.error) {
          this.props.dispatch({
            type: "SIGNIN",
            user: data.user,
            admin: data.user.admin
          });
          localStorage.setItem("token", data.token);
          this.setState({ username: "", password: "", error: false });
          this.props.history.push("/");
        } else {
          console.log(data.error);
          this.setState({ username: "", password: "", error: true });
        }
      });
  };

  renderChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1 className="project-name front-and-center">CharacterFinder</h1>
        <h4 className="project-name subtitle">
          Pathfinder TTRPG Database & Character Creator
        </h4>

        <Form onSubmit={this.renderSubmit} style={{ margin: "0 20%" }}>
          <Form.Field>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={this.renderChange}
              autocomplete="off"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="text"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.renderChange}
              autocomplete="off"
            />
          </Form.Field>
          <Button type="submit"> Login </Button>
        </Form>
        {this.state.error ? (
          <p>
            <strong>Invalid login. Please try again.</strong>
          </p>
        ) : null}
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  };
};

export default connect(mapStatetoProps)(Login);
