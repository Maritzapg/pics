import React, { Component } from 'react';
import firebase from 'firebase';
import UploadFile from './../uploadFile/UploadFile'
//import AuthUserContext from './../../AuthUserContext';
import CardInfo from './../cardInfo/CardInfo'
//import { withStyles } from '@material-ui/core/styles';
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

        this.getPictures()
    }

    getPictures = () =>
    {
        /*firebase.auth().onAuthStateChanged(user =>
        {
            this.setState({ user })
            let query = firebase.database().ref('/pictures').orderByChild('user/uid').equalTo(
                user.uid
            );
            debugger

            query.once( 'value', data => {
                data.forEach(snapshot => {
                    const picture = {
                        key: snapshot.key,
                        image: snapshot.val().image,
                        upload_date: snapshot.val().upload_date,
                        user: snapshot.val().user,
                        comments: snapshot.val().comments
                    }
                    this.setState({
                        pictures: this.state.pictures.concat(picture)
                    })
                });
            });
        })*/
        //Obtiene fotos
        firebase.database().ref('pictures').on('child_added', snapshot => {
            const picture = {
                key: snapshot.key,
                image: snapshot.val().image,
                upload_date: snapshot.val().upload_date,
                user: snapshot.val().user,
                comments: snapshot.val().comments
            }
            this.setState({
                pictures: this.state.pictures.concat(picture)
            })
        })

    }

    handleUpload(event)
    {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let today  = new Date();

        const file = event.target.files[0]
        const storageRef = firebase.storage().ref(`/photos/${file.name}`)
        const task = storageRef.put(file);

        task.on('state_changed', snapshot => {
                let percentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                this.setState({uploadValue: percentaje})
            }, error => {console.log(error.message)
            }, () => {
                task.then(snapshot => snapshot.ref.getDownloadURL())
                    .then((url) => {
                        const date = today.toLocaleDateString("es", options)

                        const  record = {
                            user:{
                                photoURL: this.state.user.photoURL,
                                displayName: this.state.user.displayName,
                                uid: this.state.user.uid
                            },
                            image: url,
                            upload_date: date,
                            comments: []
                        }

                        const dbRef = firebase.database().ref('pictures')
                        const newPicture = dbRef.push()
                        newPicture.set(record)
                    })
                    .catch(console.error);

            }

        )
    }
    handleSubmitComment = (comment, picture) =>
    {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let today  = new Date();
        const date = today.toLocaleDateString("es", options)

        const dbRef = firebase.database().ref('pictures/'+picture.key+'/comments')
        const record = {
            user:{
                userUid: this.state.user.uid,
                userName: this.state.user.displayName,
            },
            comment: comment,
            date: date
        }
        const newComment = dbRef.push()
        newComment.set(record)

        newComment.then(()=> {
            this.setState({pictures:[]})
            this.getPictures()
        }).catch(console.error);
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
                                    <CardInfo picture={picture} submitComment={comment => this.handleSubmitComment(comment, picture)}/>
                                    <br/>
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
                    <br/>
                    {this.renderPics()}
                    <br/>
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