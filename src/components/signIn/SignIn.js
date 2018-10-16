import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
//import { SignUpLink } from './SignUp';
import { auth } from './../../firebase';
import * as routes from './../../constants/routes';

const SignIn = ({ history }) =>
    <div>
        <h1>Sign In</h1>
        <SignInForm history={history} />
        {/*<SignUpLink />*/}
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
        this.handleAuthWithGoogle = this.handleAuthWithGoogle.bind(this)
    }

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    handleAuthWithGoogle()
    {
        const {
            history,
        } = this.props;

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(() => {history.push(routes.HOME);})
            .catch(error => this.setState(byPropKey('error', error)));
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        type="password"
                        placeholder="Password"
                    />
                    <button disabled={isInvalid} type="submit">
                        Sign In
                    </button>

                    { error && <p>{error.message}</p> }
                </form>
                <button onClick={this.handleAuthWithGoogle}>Login with Google</button>
            </div>
        );
    }
}

export default withRouter(SignIn);

export {
    SignInForm,
};