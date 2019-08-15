import React from 'react';
import API from './api';

import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import Badge from '@material-ui/core/Badge';

import MoreIcon from '@material-ui/icons/ExpandMore';

class Comment extends React.Component{
    constructor(){
        super()
        this.state = {
            comments: []
        };
        this.handleExpandClick = this.handleExpandClick.bind(this);
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

    handleExpandClick(){
        this.setState({expanded: !this.state.expanded})
    }

    render(){
        let comments = this.state.comments.map((comment) => {
            return <Comment {...comment}/>
        });

        return <CardContent>
            <div dangerouslySetInnerHTML={{ __html: this.props.text }} />
            <IconButton variant="outlined" onClick={this.handleExpandClick}>
                <Badge badgeContent={comments.length} color="secondary">
                    <MoreIcon/>
                </Badge>
            </IconButton>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                {comments}
            </Collapse>
        </CardContent>
    }
}

export default Comment;