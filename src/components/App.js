import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './../components/menu/Menu'
import LandingPage from './landing/Landing';
//import SignUpPage from './SignUp';
import SignInPage from './signIn/SignIn';
//import PasswordForgetPage from './PasswordForget';
import HomePage from './home/Home';
import AccountPage from './account/Account';

import * as routes from '../constants/routes';

import firebase from 'firebase';
//import UploadFile from './uploadFile/UploadFile'
import './App.css';
import withAuthentication from './withAuthentication/WithAuthentication';

/*class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }
    componentWillMount()
    {
        firebase.auth().onAuthStateChanged(authUser =>
        {
            this.setState({ authUser })
        })
    }

    /!*componentDidMount() {
        debugger
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
        });
    }*!/

    render() {
        return (
            <Router>
                <div>
                    <Menu authUser={this.state.authUser} />

                    <hr/>

                    <Route exact path={routes.LANDING} component={LandingPage}/>
                    {/!*<Route
                        exact path={routes.SIGN_UP}
                        component={SignUpPage}
                    />*!/}
                    <Route exact path={routes.SIGN_IN} component={SignInPage}/>
                    {/!*<Route
                        exact path={routes.PASSWORD_FORGET}
                        component={PasswordForgetPage}
                    />*!/}
                    <Route exact path={routes.HOME} component={HomePage}/>
                    <Route exact path={routes.ACCOUNT} component={AccountPage}/>
                </div>
            </Router>
        );
    }
}*/


const App = () =>
    <Router>
        <div>
            <Menu/>
            <hr/>
            <Route exact path={routes.LANDING} component={LandingPage}/>
            {/*<Route exact path={routes.SIGN_UP} component={SignUpPage} />*/}
            <Route exact path={routes.SIGN_IN} component={SignInPage}/>
            {/*<Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />*/}
            <Route exact path={routes.HOME} component={HomePage}/>
            <Route exact path={routes.ACCOUNT} component={AccountPage}/>
        </div>
    </Router>

/*class App extends Component {

    constructor(){
        super();
        this.state = {
            user: null, pictures:[]
        }

        this.handleAuth = this.handleAuth.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    componentWillMount()
    {
        firebase.auth().onAuthStateChanged(user =>
        {
            this.setState({ user })
        })

        firebase.database().ref('pictures').on('child_added', snapshot => {
            this.setState({
                pictures: this.state.pictures.concat(snapshot.val())
            })
        })
    }

    handleAuth()
    {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => console.log(`${result.user.email} ha iniciado sesión`))
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    handleLogout()
    {
        firebase.auth().signOut()
            .then(result => console.log(`${result.user.email} ha salido de la sesión`))
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    handleShowPicture(task)
    {
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                console.log(url);
                return url
            })
            .catch(console.error);
    }

    handleUpload(event)
    {
        const file = event.target.files[0]
        const storageRef = firebase.storage().ref(`/photos/${file.name}`)
        const task = storageRef.put(file);
        let downloadUrl

        task.on('state_changed', snapshot => {
                let percentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                this.setState({uploadValue: percentaje})
            }, error => {console.log(error.message)
            }, () => {
                task.then(snapshot => snapshot.ref.getDownloadURL())
                .then((url) => {
                    const  record = {
                        photoURL: this.state.user.photoURL,
                        displayName: this.state.user.displayName,
                        image: url
                    }

                    const dbRef = firebase.database().ref('pictures')
                    const newPicture = dbRef.push()
                    newPicture.set(record)
                })
                .catch(console.error);

            }

        )
    }

    renderLoginButton()
    {
        if(this.state.user)
        {
            return(
                <div>
                    <img src={this.state.user.photoURL}  alt={this.state.user.displayName} />
                    <p>Hola {this.state.user.displayName}</p>
                    <button onClick={this.handleLogout}>Logout</button>
                    <UploadFile onUpload={this.handleUpload}/>

                    {this.state.pictures.map((picture, i) => (
                        <div key={i}>
                            <img src={picture.image} alt=""/>
                            <br/>
                            <img src={picture.photoURL} alt={picture.displayName}/>
                            <br/>
                            <span>{picture.displayName}</span>
                        </div>
                    )).reverse()}
                </div>
            )
        }
        else {
            return(
                <button onClick={this.handleAuth}>Login with Google</button>
            )
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {this.renderLoginButton()}
                </header>

            </div>
        );
    }
}*/

export default withAuthentication(App);
