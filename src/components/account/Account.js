import React, { Component } from 'react';
import firebase from 'firebase';
import UploadFile from './../uploadFile/UploadFile'
import AuthUserContext from './../../AuthUserContext';
import CardInfo from './../cardInfo/CardInfo'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

class Account extends Component {

    constructor() {
        super();
        this.state = {
            user: null, pictures: [], uploadValue:null
        }
        this.handleUpload = this.handleUpload.bind(this)
    }

    componentWillMount()
    {
        firebase.auth().onAuthStateChanged(user =>
        {
            this.setState({ user })
        })

        firebase.database().ref('pictures').on('child_added', snapshot => {
            debugger
            this.setState({
                pictures: this.state.pictures.concat(snapshot.val())
            })
        })
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
                    debugger
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

    renderPics()
    {
        if(this.state.pictures.length>0)
        {
            return(
                <div>
                    {
                        this.state.pictures.map((picture, i) =>
                        {
                            return (
                                <div key={i}>
                                    <CardInfo picture={picture}/>
                                </div>
                            )
                        }).reverse()
                    }
                </div>
            )
        }
    }


    render() {
        if(this.state.user)
        {
            return (
                <div style={{paddingLeft:'30%'}}>
                    <Avatar
                        alt="Adelle Charles"
                        src={this.state.user.photoURL}
                        style={{width:120, height:120}}
                        //className={classNames(classes.avatar, classes.bigAvatar)}
                    />
                    <p>Hola {this.state.user.displayName}</p>
                    <UploadFile onUpload={this.handleUpload} uploadValue={this.state.uploadValue}/>

                    {this.renderPics()}
                </div>
            );
        }
        else
        {
            return (<div></div>)
        }
    }
}

export default Account;