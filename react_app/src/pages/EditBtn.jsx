import React from "react";

class EditBtn extends React.Component {
    constructor(props) {
      super(props);
      this.EditBtnClickedHandler = this.EditBtnClickedHandler.bind(this);
    }
    EditBtnClickedHandler() {
     this.props.clicked(this.props.value);
    }
    render() {
      return (
        <button onClick={this.EditBtnClickedHandler} className='edit-btn' id='editRenderer'>Edit</button>
      )
    }
  }
  export default EditBtn