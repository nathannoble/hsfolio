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

    handleClick(sy) {
        this.props.onSetSchoolYear(sy)
    }

    handleDelete(sy) {
        this.props.onSetSchoolYear(sy)
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
        this.listSchools()
    }

    async listSchools() {
        let s =  await API.graphql(graphqlOperation(this.queries.getSchool, {id: this.props.school.currentSchool.id}));
        this.props.onSetSchool(s.data.getSchool)
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

        let data = <div></div>
        if(school.currentSchool.schoolYears){
            data = [].concat(school.currentSchool.schoolYears.items)
            .map((item, i) =>
                <Chip key={i}
                    avatar={<Avatar>SY</Avatar>}
                    label={item.name}
                    onClick={this.handleClick.bind(this, item)}
                    onDelete={this.handleDelete.bind(this, item)}
                    className={classes.chip}
                    variant="outlined"
                />
            )
        }

        return (
            <div className={classes.root}>
                <Button variant="outlined" color="primary" onClick={this.handleClickNewSyDialogOpen}>
                    New School Year
                </Button>

                <div>{data}</div>
                
                <FormDialog params={newSyParams}></FormDialog>

                {
                    school.currentSchoolYear.name ?               
                    <div>
                        <div>School Year {school.currentSchoolYear.name}</div>
                        <Button variant="outlined" color="primary" onClick={this.handleClickNewSyDialogOpen}>
                            Enroll Student
                        </Button>
                    </div>
                    : <div></div>
                }

                
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
        onSetSchoolYear: schoolYear => dispatch({ type: 'SET_SCHOOL_YEAR', schoolYear: schoolYear }),
        onInitSchoolList: schoolList => dispatch({ type: 'INIT_SCHOOL_LIST', schoolList: schoolList }),
        onSetSchool: school => dispatch({ type: 'SET_SCHOOL', school: school })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SchoolView))