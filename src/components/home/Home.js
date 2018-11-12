import React, { Component } from 'react';
import firebase from 'firebase';
import CardInfo from './../cardInfo/CardInfo'

class Home extends Component {

    constructor() {
        super();
        this.state = {
            user: null, pictures: []
        }
    }

    componentWillMount()
    {
        firebase.auth().onAuthStateChanged(user =>
        {debugger
            this.setState({ user })
        })

        this.getPictures()
    }

    getPictures()
    {
        firebase.database().ref('pictures').on('child_added', snapshot => {
            const picture = {
                key: snapshot.key,
                image: snapshot.val().image,
                upload_date: snapshot.val().upload_date,
                user: snapshot.val().user,
                userMail: snapshot.val().user.email,
                comments: snapshot.val().comments
            }
            this.setState({
                pictures: this.state.pictures.concat(picture)
            })
        })
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
                <div style={{display:'inlineBlock', paddingLeft:'30%'}}>
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
        return (
            <div>
                <br/>
                {this.renderPics()}
                <br/>
            </div>
        );
    }
}

export default Home;