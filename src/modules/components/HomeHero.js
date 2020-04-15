import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from 'modules/components/Container';
import Button from 'modules/components/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(4),
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(12),
            paddingBottom: theme.spacing(6),
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center',
        // Fix IE11 issue
        marginRight: 0,
        marginLeft: 0,
        padding: `0 ${theme.spacing(2)}px`,
    },
    title: {
        fontSize: 40,
        marginBottom: theme.spacing(2),
        lineHeight: 1.35,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 400,
        marginBottom: theme.spacing(4),
    },
    icon: {
        fontSize: 18,
        marginLeft: theme.spacing(0.5),
    },
}));

function HomeHero() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="md">
                <Typography variant="h1" align="center" color="inherit" className={classes.title}>
                    React themes & templates
                    <br /> to start your next project
                </Typography>
                <Typography
                    component="h2"
                    align="center"
                    variant="h3"
                    color="inherit"
                    className={classes.subtitle}
                >
                    {"A collection of the best React templates and themes curated by Material-UI's creators."}
                </Typography>
                <Button variant="contained" color="primary" href="#populars">
                    Browse themes
                    <ArrowDownwardIcon className={classes.icon} />
                </Button>
            </Container>
        </div>
    );
}

export default HomeHero;
