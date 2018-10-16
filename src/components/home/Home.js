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
        {
            this.setState({ user })
        })

        firebase.database().ref('pictures').on('child_added', snapshot => {
            this.setState({
                pictures: this.state.pictures.concat(snapshot.val())
            })
        })
    }

    renderPics()
    {
        if(this.state.pictures.length>0)
        {
            return(
                <div style={{display:'inlineBlock'}}>
                    {
                        this.state.pictures.map((picture, i) =>
                        {
                            return (
                                <div key={i}>
                                    <CardInfo picture={picture}/>
                                </div>
                            /*<div key={i}>
                                <img src={picture.image} alt=""/>
                                <br/>
                                <img src={picture.photoURL} alt={picture.displayName}/>
                                <br/>
                                <span>{picture.displayName}</span>
                            </div>*/
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
                {this.renderPics()}
            </div>
        );
    }
}

export default Home;