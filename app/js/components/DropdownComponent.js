import React from 'react'

import DropdownMenu from 'react-dd-menu'

import 'react-dd-menu/dist/react-dd-menu.css'
import '../../css/drop-down.css'

class DropdownComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  close() {
    this.setState({
      isOpen: false
    })
  }

  click() {
    console.log("you clicked me")
  }

  render() {
    let menuOptions = {
      isOpen: this.state.isOpen,
      close: this.close.bind(this),
      toggle: <button type="button" className="mdl-button mdl-js-button select-dropdown-toggle"
        onClick={this.toggle.bind(this)}>
        <span className="select-dropdown-toggle-text">{this.props.language}</span>
        <i className="fa fa-caret-down dropdown-icon"></i></button>,
      align: 'center',
      className: 'select-dropdown',
    }

    return (
      <DropdownMenu {...menuOptions}>
        {
          this.props.languages.map((language) => {
            return (
              <li key={this.props.languages.indexOf(language)}>
                <button type="button">{language}</button>
              </li>
            )
          })
        }
      </DropdownMenu>
    )
  }
}

export default DropdownComponent
