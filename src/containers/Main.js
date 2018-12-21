import React, { Component } from 'react';
import { connect } from 'react-redux';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import aws_exports from '../aws-exports';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import FormDialog from '../components/FormDialog'

import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'

Amplify.configure(aws_exports);

const styles = {
  main: {
    margin: 15
  },
  card: {
    maxWidth: 345,
    margin: 20
  },
  media: {
    height: 140,
  },
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      schools: [],
      value: "",
      open: false,
      openRename: false
    };

    this.mutations = mutations
    this.queries = queries

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async componentDidMount() {
    const schools = await API.graphql(graphqlOperation(this.queries.listSchools));
    this.props.onInitSchoolList(schools.data.listSchools.items)
    // this.setState({ schools: schools.data.listSchools.items });
  }

  handleClickOpen = () => {
    this.setState({ open: true, value: '' });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpenRename = (id) => {
    this.setState({ openRename: true });
  };

  handleCloseRename = () => {
    this.setState({ openRename: false });
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const school = { "name": this.state.value }
    await API.graphql(graphqlOperation(this.mutations.createSchool, { "input": school }));
    this.listSchools();
    this.setState({ value: "" });
    this.setState({ open: false });
  }

  async handleDelete(id) {
    const schoolId = { "id": id };
    await API.graphql(graphqlOperation(this.mutations.deleteSchool, { "input": schoolId }));
    this.listSchools();
  }

  async handleRename(school) {
    this.selectSchool(school)
    this.setState({ openRename: true });
  }

  async handleUpdate(event) {
    event.preventDefault();
    event.stopPropagation();
    const school = { "id": this.state.id, "name": this.state.value };
    await API.graphql(graphqlOperation(this.mutations.updateSchool, { "input": school }));
    this.listSchools();
    this.setState({ value: "" });
    this.setState({ openRename: false });
    this.selectSchool(school)
  }

  selectSchool(school) {
    this.props.onSetSchool({ id: school.id, name: school.name })
    this.setState({ id: school.id, value: school.name});
  }

  async listSchools() {
    const schools = await API.graphql(graphqlOperation(this.queries.listSchools));
    this.props.onInitSchoolList(schools.data.listSchools.items)
  }

  render() {
    const { classes } = this.props;

    const newParams = {
      title: "Add New School",
      contentText: "Provide a name for this school that is easy to recognize",
      textLabel: "Name of the new school",
      value: this.state.value,
      onChange: this.handleChange,
      open: this.state.open,
      onClose: this.handleClose,
      onSubmit: this.handleSubmit
    }

    const renameParams = {
      title: "Rename School",
      contentText: "Provide a name for this school that is easy to recognize",
      textLabel: "New name of the school",
      value: this.state.value,
      onChange: this.handleChange,
      open: this.state.openRename,
      onClose: this.handleCloseRename,
      onSubmit: this.handleUpdate
    }

    const data = [].concat(this.props.school.schoolList)
      .map((item, i) =>
        <Card className={classes.card} key={i}>
          <CardActionArea onClick={this.selectSchool.bind(this, item)}>
            <CardMedia
              className={classes.media}
              image="/static/images/logo.jpg"
              title="School Logo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography component="p">
                This is a description
          </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={this.handleDelete.bind(this, item.id)}>
              Delete
        </Button>
            <Button size="small" color="primary" onClick={this.handleRename.bind(this, item)}>
              Rename
        </Button>
          </CardActions>
        </Card>
      )
    return (
      <div className={classes.main}>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          New School
        </Button>      
        <FormDialog params={newParams}></FormDialog>
        <FormDialog params={renameParams}></FormDialog>
        <div >
          {data}
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    school: state.school
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitSchoolList: schoolList => dispatch({ type: 'INIT_SCHOOL_LIST', schoolList: schoolList }),
    onSetSchool: school => dispatch({ type: 'SET_SCHOOL', school: school })
  };
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Main))