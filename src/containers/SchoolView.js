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
import FaceIcon from '@material-ui/icons/Face';

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
            newSyDialog: false,
            enrollStudentDialog: false,
        }

        this.mutations = mutations
        this.queries = queries

        this.handleChangeSy = this.handleChangeSy.bind(this);
        this.handleSubmitNewSy = this.handleSubmitNewSy.bind(this)

        this.handleChangeStudent = this.handleChangeStudent.bind(this);
        this.handleSubmitEnrollStudent = this.handleSubmitEnrollStudent.bind(this)
        this.handleClickBackToSchool = this.handleClickBackToSchool.bind(this)
        this.handleClickBackToSchoolYear = this.handleClickBackToSchoolYear.bind(this)
    }

    handleClick(sy) {
        this.setSchoolYear(sy)
    }

    handleClickBackToSchool() {
        this.props.onSetSchoolYear(null)
    }

    handleClickBackToSchoolYear() {
        this.props.onSetStudent(null)
    }

    handleClickStudent(student) {
        this.setStudent(student)
    }

    async handleDeleteStudent(student) {
        const input = { "id": student.id };
        await API.graphql(graphqlOperation(this.mutations.deleteStudent, { "input": input }));
        let sy = this.props.school.currentSchoolYear
        this.setSchoolYear(sy)
    }

    async handleDelete(sy) {
        const input = { "id": sy.id };
        await API.graphql(graphqlOperation(this.mutations.deleteSchoolYear, { "input": input }));
        this.refreshSchool();
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
        this.refreshSchool()
    }

    async refreshSchool() {
        let s = await API.graphql(graphqlOperation(this.queries.getSchool, { id: this.props.school.currentSchool.id }));
        this.props.onSetSchool(s.data.getSchool)
    }

    /////////////////
    // Enroll Student
    /////////////
    handleClickEnrollStudentDialogOpen = () => {
        this.setState({ enrollStudentDialog: true, value: '' });
    };

    handleClickEnrollStudentDialogClose = () => {
        this.setState({ enrollStudentDialog: false });
    };

    async handleSubmitEnrollStudent(event) {
        let sy = this.props.school.currentSchoolYear
        event.preventDefault();
        event.stopPropagation();
        let payload = { name: this.state.student, studentSchoolYearId: sy.id }
        let result = await API.graphql(graphqlOperation(this.mutations.createStudent, { "input": payload }));
        this.setState({ student: "" });
        this.setState({ enrollStudentDialog: false });
        this.setSchoolYear(sy)
    }

    handleChangeStudent(event) {
        this.setState({ student: event.target.value });
    }

    async setSchoolYear(sy) {
        let s = await API.graphql(graphqlOperation(this.queries.getSchoolYear, { id: sy.id }));
        this.props.onSetSchoolYear(s.data.getSchoolYear)
    }

    async setStudent(student) {
        let s = await API.graphql(graphqlOperation(this.queries.getStudent, { id: student.id }));
        this.props.onSetStudent(s.data.getStudent)
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

        const enrollStudentParams = {
            title: "Enroll a Student",
            contentText: "Provide a name for this Student",
            textLabel: "Name of the Student",
            value: this.state.student,
            onChange: this.handleChangeStudent,
            open: this.state.enrollStudentDialog,
            onClose: this.handleClickEnrollStudentDialogClose,
            onSubmit: this.handleSubmitEnrollStudent
        }

        let schoolYears = <div></div>
        if (school.currentSchool.schoolYears) {
            schoolYears = [].concat(school.currentSchool.schoolYears.items)
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

        let students = <div></div>
        if (school.currentSchoolYear && school.currentSchoolYear.students) {
            students = [].concat(school.currentSchoolYear.students.items)
                .map((item, i) =>
                    <Chip key={i}
                        avatar={<Avatar><FaceIcon /></Avatar>}
                        label={item.name}
                        onClick={this.handleClickStudent.bind(this, item)}
                        onDelete={this.handleDeleteStudent.bind(this, item)}
                        className={classes.chip}
                        variant="outlined"
                    />
                )
        }

        let studentText = ''
        if (school.currentStudent) {
            studentText = ' > ' + school.currentStudent.name
        }

        return (
            <div className={classes.root}>

                {
                    school.currentSchoolYear && school.currentSchoolYear.name ?
                        <div>
                            
                            <div>School Year {school.currentSchoolYear.name} {studentText}</div>

                            {school.currentStudent ?
                                <Button variant="outlined" onClick={this.handleClickBackToSchoolYear}>
                                    Back
                                </Button>
                                :
                                <div>
                                    <Button variant="outlined" onClick={this.handleClickBackToSchool}>
                                        Back
                                    </Button>
                                    <div>{students}</div>
                                    <Button variant="outlined" color="primary" onClick={this.handleClickEnrollStudentDialogOpen}>
                                        Enroll Student
                                    </Button>
                                </div>
                            }

                        </div>
                        : <div>
                            <div>{schoolYears}</div>
                            <Button variant="outlined" color="primary" onClick={this.handleClickNewSyDialogOpen}>
                                New School Year
                            </Button>
                        </div>
                }

                <FormDialog params={newSyParams}></FormDialog>
                <FormDialog params={enrollStudentParams}></FormDialog>

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
        onSetSchool: school => dispatch({ type: 'SET_SCHOOL', school: school }),
        onSetStudent: student => dispatch({ type: 'SET_STUDENT', student: student })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SchoolView))