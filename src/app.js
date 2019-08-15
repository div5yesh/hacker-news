import React from "react";
import ReactDOM from "react-dom";

import API from './atoms/api';
import Story from "./atoms/story";

import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';

import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    drawer: {
        width: '300px'
    },
    container: {
        backgroundColor: 'lightgray'
    }
});

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            stories: []
        };
    }

    async fetchFirst10Stories() {
        let first10 = this.state.topStories.slice(0, 10);
        first10 = first10.map(async (itemID) => {
            return await API.getItem(itemID);
        });

        let stories = await Promise.all(first10);
        this.setState({stories});
    }

    async fetchTopStories() {
        let topStories = await API.getTopStories();
        this.setState({
            topStories
        });
        this.fetchFirst10Stories();
    }

    componentWillMount() {
        this.fetchTopStories();
    }

    render() {
        let classes = this.props.classes;
        let stories = this.state.stories.map((story) => {
            return <Story {...story}/>;
        });

        return <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        App
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={false}
                classes={{
                paper: classes.drawer,
                }}>
            </Drawer>
            <Grid className={classes.container} container direction="column" justify="center" alignItems="center">
                <Grid item xs={6}>
                    {stories}
                </Grid>
            </Grid>
        </div>;
    }
}

let StyledApp = withStyles(styles)(App);
ReactDOM.render(<StyledApp />, document.getElementById("app"));