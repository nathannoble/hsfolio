import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import aws_exports from '../aws-exports'; 

import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'

Amplify.configure(aws_exports);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      schools: [],
      value: "",
      displayAdd: true,
      displayUpdate: false
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
  }

  async handleDelete(id) {
    const schoolId = { "id": id };
    await API.graphql(graphqlOperation(this.mutations.deleteSchool, { "input": schoolId }));
    this.listSchools();
  }

  async handleUpdate(event) {
    event.preventDefault();
    event.stopPropagation();
    const school = { "id": this.state.id, "name": this.state.value };
    await API.graphql(graphqlOperation(this.mutations.updateSchool, { "input": school }));
    this.listSchools();
    this.setState({ displayAdd: true, displayUpdate: false, value: "" });
  }

  selectSchool(school) {
    this.props.onSetSchool({ id: school.id, name: school.name})
    this.setState({ id: school.id, value: school.name, displayAdd: false, displayUpdate: true });
  }

  async listSchools() {
    const schools = await API.graphql(graphqlOperation(this.queries.listSchools));
    this.props.onInitSchoolList(schools)
    // this.setState({ schools: schools.data.listSchools.items });
  }

  render() {
    const data = [].concat(this.props.school.schoolList)
      .map((item, i) =>
        <div key={i} className="alert alert-primary alert-dismissible show" role="alert">
          <span key={"spn_" + i} onClick={this.selectSchool.bind(this, item)}>{item.name}</span>
          <button key={"btn_" + i} type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleDelete.bind(this, item.id)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )
    return (
      <div className="Main">
        <div className="container">
          {this.state.displayAdd ?
            <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <input type="text" className="form-control form-control-lg" placeholder="New School" aria-label="School" aria-describedby="basic-addon2" value={this.state.value} onChange={this.handleChange} />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">Add School</button>
                </div>
              </div>
            </form>
            : null}
          {this.state.displayUpdate ?
            <form onSubmit={this.handleUpdate}>
              <div className="input-group mb-3">
                <input type="text" className="form-control form-control-lg" placeholder="Update School" aria-label="School" aria-describedby="basic-addon2" value={this.state.value} onChange={this.handleChange} />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">Update School</button>
                </div>
              </div>
            </form>
            : null}
        </div>
        <br />
        <div className="container">
          {data}
        </div>
      </div>
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
      onSetSchool: school => dispatch({type: 'SET_SCHOOL', school: school})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)