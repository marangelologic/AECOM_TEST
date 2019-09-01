import {
    Grid,
    Typography,
    withStyles,
  } from '@material-ui/core';
import React, { Component } from 'react';
import AecomBackend from '../backend/AecomBackend';
import ContentPageComponent from './ContentPageComponent';

const IMAGE_BASE_URL = "https://apps.aecom-digital.com/excellence/"

const styles = () => ({
    page: {
        background: "#2b363f"
    },
    categoryTitle: {
        color: "#fce515"
    },
    categoryDescription: {
        color: "#ffffff"
    },
    projectTitle: {
        color: "#ffffff",
        cursor: "pointer"
    },
    project: {
        marginBottom: "20px"
    },
    image: {
        width: "100%",
        height: '200px',
        cursor : "pointer"
    }
});

class LandingPageComponent extends Component {
    
    constructor(props) {
        super(props);
        this.aecomBackend = new AecomBackend();
        this.state = {
            categories: null,
            projects: null,
            currentProject: null
        };
    }
    
    componentDidMount() {
        this.aecomBackend.getProjects().then(this.handleResults)
    }

    handleResults = (results) => {
        const categoryList = [];

        results.data.forEach(row => {
            categoryList.push(...row.categories)
        });

        categoryList.sort((a, b) => a.Category_title > b.Category_title ? 1 : -1)
        
        const uniqueCategories = Object.assign({}, ...categoryList.map(s => ({[s.id]: s})));

        this.setState({categories: uniqueCategories, projects: results.data})
    }

    buildCategoryDisplay = (category) => {
        const { projects } = this.state;
        const { classes } = this.props;
        const associatedProjects = projects.filter(project => category.projects.indexOf(project.id) != -1)
        return (
        <Grid key={category.id} item xs={12} md={12}>
            <Typography variant="h4" className={classes.categoryTitle}>{category.Category_title}</Typography>
            <Typography variant="h6" className={classes.categoryDescription}>{category.Category_intro}</Typography>
            <Grid container>
                {
                    associatedProjects.length > 0 && 
                    associatedProjects.map(project => this.buildProjectDisplay(project))
                }
            </Grid>
        </Grid>
        )
    }

    buildProjectDisplay = (project) => {
        const { classes } = this.props;
        return (
            <Grid item xs={6} md={3} justify="center" className={classes.project}>
                <Grid><img src={IMAGE_BASE_URL + project.image.url} className={classes.image}/> </Grid>
                <Grid className={classes.projectTitle} onClick={() => this.onProjectOpen(project)}>{project.title}</Grid>
            </Grid>
        )
    }

    onProjectOpen = (project) => {
        this.setState({currentProject: project})
    }

    onProjectClose = () => {
        this.setState({currentProject: null})
    }

    render() {
        const { categories, currentProject } = this.state;
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Grid container className={classes.page}>
                    {
                        categories != null && Object.keys(categories).map(key => (
                            this.buildCategoryDisplay(categories[key])
                        ))
                    }
                </Grid>
                {   currentProject &&
                    <Grid container justify="center" alignContent="center">
                        <ContentPageComponent currentProject={currentProject} onClose={this.onProjectClose}/>
                    </Grid>
                }
                
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(LandingPageComponent);
  