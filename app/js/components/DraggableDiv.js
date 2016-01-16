import React from 'react'
import ReactDOM from 'react-dom'

/**
* Having issues implementing the draggable div,
* will implement later.
*/

class DraggableDiv extends React.Component {

  constructor(props) {
    super(props);
    this.x_pos = 0
    // this.initializeDrag = this.initializeDrag.bind(this)
    // this.handleMouseMove = this.handleMouseMove.bind(this)
    // this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  // componentDidMount() {
  //   this.draggableDiv = ReactDOM.findDOMNode(this.refs.draggable)
  //   document.onmousedown = this.handleMouseMove
  //   document.onmouseup = this.handleMouseUp
  //   console.log(this.draggableDiv.offsetLeft)
  // }

  // initializeDrag() {
  //   this.x_elem = this.draggableDiv.offsetLeft
  // }

  // handleMouseMove(e) {
  //   this.x_pos = document.all ? window.event.clientX : e.pageX
  //   if (this.draggableDiv !== null) {
  //       this.draggableDiv.style.left = (this.x_pos - this.x_elem) + 'px'
  //   }
  // }

  // handleMouseUp() {
  //   this.draggableDiv = null
  // }

  render() {
    return (
      <div
        className="draggable-div"
        ref='draggable'>
      </div>
    )
  }
}

export default DraggableDiv
