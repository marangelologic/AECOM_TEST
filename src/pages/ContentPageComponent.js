import {
    Grid,
    Typography,
    withStyles,
  } from '@material-ui/core';
import React, { Component } from 'react';


const IMAGE_BASE_URL = "https://apps.aecom-digital.com/excellence/"

const styles = () => ({
    page: {
        top: "5%",
        position: "absolute",
        background: "#2b363f",
        width: "80%",
        padding: "20px"
    },
    project: {
        width: "70%"
    },
    projectTitle: {
        color: "#ffffff"
    },
    projectText: {
        color: "#ffffff"
    },
    closeButton: {
        float:"right",
        color: "#ffffff",
        cursor: "pointer"
    },
    image: {
        width: "100%",
        height: '200px',
    }
});

class ContentPageComponent extends Component {
    
    render() {
        const { classes, currentProject, onClose } = this.props;
        return (
            <Grid container justify="center" alignContent="center" className={classes.page}>
                <Grid item xs={12} md={12} className={classes.closeButton} alignContent="flex-end" onClick={() => onClose()}>X</Grid>
                <Grid className={classes.project}>
                    <Typography variant="h4" className={classes.projectTitle}>{currentProject.title}</Typography>
                    <Typography variant="h6" className={classes.projectText}>{currentProject.project_text}</Typography>
                    <img src={IMAGE_BASE_URL + currentProject.image.url} className={classes.image}/> 
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(ContentPageComponent);