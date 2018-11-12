import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
//import FavoriteIcon from '@material-ui/icons/Favorite';
//import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    card: {
        maxWidth: 600,
        paddingTop: '2%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class CardInfo extends React.Component {
    constructor() {
        super();
        this.state = {expanded: false, name: ''};
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onPressEnter(event)
    {
        if (event.key === 'Enter') { this.props.submitComment(this.state.name) }
    }

    renderComments = () =>
    {
        const {comments} = this.props.picture

        if(comments)
        {
            return(
                <div>
                    {
                        Object.keys(comments).map((key, i) =>
                        {
                            return (
                                <CardContent key={i} style={{paddingTop:0, paddingBottom:0}}>
                                    <Typography paragraph>
                                        <strong>{comments[key].user.userName}  </strong>{comments[key].comment}
                                    </Typography>
                                </CardContent>
                            )
                        }).reverse()
                    }
                </div>
            )
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar} src={this.props.picture.user.photoURL}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={this.props.picture.user.displayName}
                    subheader={(this.props.picture.upload_date)}
                />
                <CardMedia
                    className={classes.media}
                    image={this.props.picture.image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography component="p">
                        <TextField
                            id="standard-full-width"
                            //label="Label"
                            style={{ margin: 8 }}
                            placeholder="Agregar un comentario"
                            //helperText="Full width!"
                            fullWidth
                            onChange={this.handleChange('name')}
                            onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    ev.preventDefault()
                                    this.onPressEnter(ev)
                                }
                            }}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites" onClick={this.handleExpandClick}>
                        {/*<FavoriteIcon />*/}
                        Comentarios
                    </IconButton>
                    {/*<IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>*/}
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    {this.renderComments()}
                </Collapse>
            </Card>
        );
    }
}

export default withStyles(styles)(CardInfo);