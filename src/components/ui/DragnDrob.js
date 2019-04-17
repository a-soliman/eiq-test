import React, { Component } from "react";
import { connect } from "react-redux";
import { sendFile } from "../../actions/files";

class DragnDrob extends Component {
  state = {
    dragover: false,
    error: ""
  };

  mapErrorToState = type => {
    const errors = {
      fileCount: "Only one file is allowed at a time.",
      type: "File must be .csv formated."
    };

    if (!errors[type]) return;
    const error = errors[type];
    this.setState({ error });
  };

  clearErrors = () => {
    this.setState({ error: "" });
  };

  toggleDragoverClass = () => {
    let dragover = !this.state.dragover;
    this.setState({ dragover }, () => {
      return false;
    });
  };

  handleDropFile = event => {
    event.preventDefault();
    event.stopPropagation();
    this.toggleDragoverClass();

    /* VALIDATE FILES LENGTH */
    if (event.dataTransfer.files.length > 1) {
      return this.mapErrorToState("fileCount");
    }
    const file = event.dataTransfer.files[0];
    let extension = file.name.split(".");
    extension = extension[extension.length - 1];

    /* VALIDATE FILE extension  */
    if (extension.toLowerCase() != "csv") {
      return this.mapErrorToState("type");
    }

    const formData = new FormData();
    formData.append("file", file);

    this.props.sendFile(formData);
  };

  render() {
    let error = this.state.error;
    let classes = "drag-platform dropzone";
    if (this.state.dragover) classes += " dragover";

    return (
      <div style={{ width: "100%" }}>
        <div
          className={classes}
          onDrop={this.handleDropFile}
          onDragOver={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragEnter={() => {
            this.clearErrors();
            this.toggleDragoverClass();
          }}
          onDragLeave={this.toggleDragoverClass}
        >
          Drag and Drop
        </div>

        {error && <div className="errors">{error}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  sendFile: formData => dispatch(sendFile(formData))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragnDrob);
