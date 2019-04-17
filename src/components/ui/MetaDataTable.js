import React, { Component } from "react";

class MetaDataTable extends Component {
  state = {
    items: []
  };

  buildRows = (file, i) => (
    <tr key={i}>
      <td>{file.name}</td>
      <td>{file.size}</td>
      <td>{file.rowsCount}</td>
      <td>{file.colCount}</td>
      <td>{file.itemsCount}</td>
      <td>{file.idealItemsCount}</td>
      <td>{file.isValid ? "true" : "false"}</td>
      <td>{!file.errorRows.length ? "-" : file.errorRows.join(", ")}</td>
      <td>
        <a href={file.fileURL} style={{ color: "#212529" }}>
          <i className="fas fa-file-download" />
        </a>
      </td>
    </tr>
  );

  render() {
    let files = this.props.files || [];
    if (files.length == 0) return null;

    return (
      <div className="mt-5">
        <table className="table table-striped metadata-table">
          <thead className="thead-dark">
            <tr>
              <th>filename</th>
              <th>size</th>
              <th>Row count</th>
              <th>Col count</th>
              <th>Items count</th>
              <th>Ideal</th>
              <th>Valid</th>
              <th>
                Issues <small>(rows)</small>
              </th>
              <th>
                <i className="fas fa-file-download" />
              </th>
            </tr>
          </thead>
          <tbody>{files.map((file, i) => this.buildRows(file, i))}</tbody>
        </table>
      </div>
    );
  }
}

export default MetaDataTable;
