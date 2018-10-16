import React, { Component } from 'react';
import * as routes from './../../constants/routes';
import { withRouter } from 'react-router-dom';
import { auth } from './../../firebase';
import Button from '@material-ui/core/Button';

const SignOut = ({ history }) =>
    <div>
        <SignOutButton history={history} />
    </div>

class SignOutButton extends Component {

    constructor() {
        super();
        this.state = {
            user: null, pictures: []
        }

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout = () =>
    {
        const {
            history,
        } = this.props;

        auth.doSignOut()
        history.push(routes.SIGN_IN)
    }

    render() {
        return (
            <Button color="inherit" onClick={this.handleLogout}>Sign Out</Button>
        );
    }
}


export default withRouter(SignOut);

export {
    SignOutButton,
};
//export default SignOutButton;