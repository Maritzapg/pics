import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import image from '../../assets/images/img-01.png'
//import { SignUpLink } from './SignUp';
import { auth } from './../../firebase';
import * as routes from './../../constants/routes';

const SignIn = ({ history }) =>
    <div>
        {/*<h1>Sign In</h1>*/}
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
            .then((user) => {
                this.setState({ ...INITIAL_STATE });
                history.push(routes.HOME);

                if(user){
                    user.updateProfile({
                        displayName: 'pepito',
                        photoURL: 'gs://pics-ec9a0.appspot.com/photos/profiles/_healthymond-313801-unsplash.jpg'
                    })
                }
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
            <form onSubmit={this.onSubmit}>

                <link rel="stylesheet" type="text/css" href="../../assets/vendor/bootstrap/css/bootstrap.min.css"/>
                <link rel="stylesheet" type="text/css" href="../../fonts/font-awesome-4.7.0/css/font-awesome.min.css"/>
                <link rel="stylesheet" type="text/css" href="../../assets/vendor/animate/animate.css"/>
                <link rel="stylesheet" type="text/css" href="../../assets/vendor/css-hamburgers/hamburgers.min.css"/>
                <link rel="stylesheet" type="text/css" href="../../assets/vendor/select2/select2.min.css"/>
                {/*<link rel="stylesheet" type="text/css" href="css/util.css"/>
                <link rel="stylesheet" type="text/css" href="css/main.css"/>*/}

                <script src="../../assets/vendor/jquery/jquery-3.2.1.min.js"/>
                <script src="../../assets/vendor/bootstrap/js/popper.js"/>
                <script src="../../assets/vendor/bootstrap/js/bootstrap.min.js"/>
                <script src="../../assets/vendor/select2/select2.min.js"/>
                <script src="../../assets/vendor/tilt/tilt.jquery.min.js"/>
                {/*<script >
                    $('.js-tilt').tilt({
                    scale: 1.1
                })
                </script>*/}
                {/*<script src="js/main.js"></script>*/}

                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <div className="login100-pic js-tilt" data-tilt style={{marginTop:'-10%'}}>
                                {/*<img src="images/img-01.png" alt="IMG"/>*/}
                                <img src={image} alt="imagen"/>
                            </div>

                            <form className="login100-form validate-form" style={{marginTop:'-7%'}}>
                                <span className="login100-form-title">
                                    Picstagram
                                </span>

                                    <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                        <input className="input100"
                                               type="text"
                                               value={email}
                                               name="email"
                                               placeholder="Email"
                                               onChange={event => this.setState(byPropKey('email', event.target.value))}
                                        />
                                            <span className="focus-input100"/>
                                            <span className="symbol-input100">
                                                <i className="fa fa-envelope" aria-hidden="true"/>
                                            </span>
                                    </div>

                                    <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                        <input className="input100"
                                               type="password"
                                               value={password}
                                               name="pass"
                                               placeholder="Password"
                                               onChange={event => this.setState(byPropKey('password', event.target.value))}
                                        />
                                            <span className="focus-input100"/>
                                            <span className="symbol-input100">
                                                <i className="fa fa-lock" aria-hidden="true"/>
                                            </span>
                                    </div>

                                    <div className="container-login100-form-btn">
                                        <button className="login100-form-btn" disabled={isInvalid}>
                                            Login
                                        </button>
                                    </div>

                                    { error && <p>{error.message}</p> }

                                    {/*<div className="text-center p-t-12">
                                    <span className="txt1">
                                        Forgot
                                    </span>
                                        <a className="txt2" href="#">
                                            Username / Password?
                                        </a>
                                    </div>

                                    <div className="text-center p-t-136">
                                        <a className="txt2" href="#">
                                            Create your Account
                                            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"/>
                                        </a>
                                    </div>*/}
                            </form>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter(SignIn);

export {
    SignInForm,
};