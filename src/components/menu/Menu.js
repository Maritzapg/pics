import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from './../../AuthUserContext';
import SignOutButton from './../signOut/SignOut';
import * as routes from '../../constants/routes';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const Menu = () =>
    <AuthUserContext.Consumer>
        { authUser => authUser
            ? <NavigationAuth/>
            : <NavigationNonAuth/>
        }
    </AuthUserContext.Consumer>

const NavigationAuth = () =>
    <div style={styles.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" style={styles.grow}>
                    <Link to={routes.LANDING}>Landing</Link>
                </Typography>
                <Typography variant="h6" color="inherit" style={styles.grow}>
                    <Link to={routes.HOME}>Home</Link>
                </Typography>
                <Typography variant="h6" color="inherit" style={styles.grow}>
                    <Link to={routes.ACCOUNT}>Account</Link>
                </Typography>
                <SignOutButton />
            </Toolbar>
        </AppBar>
    </div>
    {/*<Menu>
        <li><Link to={routes.LANDING}>Landing</Link></li>
        <li><Link to={routes.HOME}>Home</Link></li>
        <li><Link to={routes.ACCOUNT}>Account</Link></li>
        <li><SignOutButton /></li>
    </Menu>*/}

const NavigationNonAuth = () =>
    <div style={styles.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" color="inherit" style={styles.grow}>
                    <Link to={routes.LANDING}>Landing</Link>
                </Typography>
                <Button color="inherit"><Link to={routes.SIGN_IN}>Sign In</Link></Button>
            </Toolbar>
        </AppBar>
    </div>
    {/*<ul>
        <li><Link to={routes.LANDING}>Landing</Link></li>
        <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
    </ul>*/}

/*const Menu = () =>
    <div>
        <ul>
            <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
            <li><Link to={routes.LANDING}>Landing</Link></li>
            <li><Link to={routes.HOME}>Home</Link></li>
            <li><Link to={routes.ACCOUNT}>Account</Link></li>
            <li><SignOutButton /></li>
        </ul>
    </div>*/

export default Menu;