import React, { Component } from "react";
import { connect } from "react-redux";
import DragnDrop from "../ui/DragnDrop";
import MetaDataTable from "../ui/MetaDataTable";
import { getFiles } from "../../actions/files";

class Dashboard extends Component {
  state = {
    files: []
  };

  componentDidMount = () => {
    this.props.getFiles();
  };

  componentWillReceiveProps = newProps => {
    if (newProps.files) {
      const files = newProps.files.files;
      this.setState({ files });
    }
  };
  render() {
    const { files } = this.state;
    return (
      <div className="full-height d-flex ">
        <h1 className="display-2 mb-5">Dashboard</h1>
        <h4>
          hey <strong>{this.props.auth.user.name}</strong>,
        </h4>
        <p className="lead">
          This is a private route, Can only be displayed and visited by logged
          in users.
        </p>

        <DragnDrop />

        <MetaDataTable files={files} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  files: state.files
});
const mapDispatchToProps = dispatch => ({
  getFiles: () => dispatch(getFiles())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
