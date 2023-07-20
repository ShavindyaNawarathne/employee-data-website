import React from 'react'

class DeleteBtn extends React.Component {
    constructor(props) {
      super(props);
      this.DeleteBtnClickedHandler = this.DeleteBtnClickedHandler.bind(this);
      
    }
    DeleteBtnClickedHandler() {
     this.props.clicked(this.props.value);
    }
    
    render() {
      return (
        <button onClick={this.DeleteBtnClickedHandler} className='delete-btn' >Delete</button>
        
      )
    }
  }
  export default DeleteBtn