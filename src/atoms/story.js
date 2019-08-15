import React from 'react';
import Comment from './comment';
import API from './api';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/ChatOutlined';
import OpenNewIcon from '@material-ui/icons/OpenInNewOutlined';
import TrendingIcon from '@material-ui/icons/TrendingUp';
import TimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/PersonOutline';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import MoreIcon from '@material-ui/icons/ExpandMore';
import { CardActionArea } from '@material-ui/core';

const styles = theme => ({
    card: {
        minWidth: 345,
        margin: '4px auto'
    },
    avatar: {
        backgroundColor: 'red'
    }
});

class Story extends React.Component{
    constructor(){
        super()
        this.state = {
            comments: []
        };
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.showArticle = this.showArticle.bind(this);
    }

    handleExpandClick(){
        this.setState({expanded: !this.state.expanded})
    }

    showArticle(){

    }

    async fetchTopLevelComments(){
        if(!this.props.kids) return;

        let topComments = this.props.kids.map(async (itemID) => {
            return await API.getItem(itemID);
        });
        
        let comments = await Promise.all(topComments);
        this.setState({comments});
    }

    componentWillMount(){
        this.fetchTopLevelComments();
    }

    render(){
        let classes = this.props.classes;
        let storyTimestamp = new Date(this.props.time * 1000);
        let diff = Math.round((new Date() - storyTimestamp) / 36e5);

        let comments = this.state.comments.map((comment) => {
            return <Comment {...comment}/>;
        });

        return <Card className={classes.card}>
            <CardActionArea onClick={this.showArticle}>
                <CardHeader
                    avatar={<Avatar className={classes.avatar} aria-label="karma">
                        {this.props.score}
                    </Avatar>}
                    action={<IconButton aria-label="more">
                        <OpenNewIcon />
                    </IconButton>}
                    title={this.props.title}
                    subheader={`${diff} hours ago`}/>
            </CardActionArea>
            <CardActions>
                <IconButton variant="outlined"><ShareIcon/></IconButton>
                <IconButton variant="outlined" onClick={this.handleExpandClick}>
                    <Badge badgeContent={this.props.descendants} color="secondary">
                        <ChatIcon/>
                    </Badge>
                </IconButton>
                <PersonIcon />{this.props.by}
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="caption" gutterBottom>
                        {comments}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    }
}

export default withStyles(styles)(Story);