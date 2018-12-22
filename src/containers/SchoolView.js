import React, { Component } from 'react'
import { connect } from 'react-redux';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import aws_exports from '../aws-exports';

import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button'

import FormDialog from '../components/FormDialog'

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

class SchoolView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newSyDialog: false
        }

        this.mutations = mutations
        this.queries = queries

        this.handleChangeSy = this.handleChangeSy.bind(this);
        this.handleSubmitNewSy = this.handleSubmitNewSy.bind(this)
    }

    handleClick() {
        alert('You clicked the Chip.'); // eslint-disable-line no-alert
    }

    handleClickNewSyDialogOpen = () => {
        this.setState({ newSyDialog: true, value: '' });
    };

    handleClickNewSyDialogClose = () => {
        this.setState({ newSyDialog: false });
    };

    handleChangeSy(event) {
        this.setState({ sy: event.target.value });
    }

    async handleSubmitNewSy(event) {
        let school = this.props.school.currentSchool
        event.preventDefault();
        event.stopPropagation();
        let payload = { name: this.state.sy, schoolYearSchoolId: school.id }
        let result = await API.graphql(graphqlOperation(this.mutations.createSchoolYear, { "input": payload }));
        this.setState({ sy: "" });
        this.setState({ newSyDialog: false });
    }

    render() {
        const { classes, school } = this.props;

        const newSyParams = {
            title: "Add New School Year",
            contentText: "Provide a name for this school year e.g. 2018",
            textLabel: "Name of the new school year",
            value: this.state.sy,
            onChange: this.handleChangeSy,
            open: this.state.newSyDialog,
            onClose: this.handleClickNewSyDialogClose,
            onSubmit: this.handleSubmitNewSy
        }

        return (
            <div className={classes.root}>
                <div>Current School is {school.currentSchool.id}</div>
                <Button variant="outlined" color="primary" onClick={this.handleClickNewSyDialogOpen}>
                    New School Year
                </Button>

                <Chip
                    avatar={<Avatar>SY</Avatar>}
                    label="2018"
                    onClick={this.handleClick}
                    className={classes.chip}
                    variant="outlined"
                />

                <FormDialog params={newSyParams}></FormDialog>
            </div>
        )
    }
}


SchoolView.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        school: state.school
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //   onInitSchoolList: schoolList => dispatch({ type: 'INIT_SCHOOL_LIST', schoolList: schoolList }),
        //   onSetSchool: school => dispatch({ type: 'SET_SCHOOL', school: school })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SchoolView))