import React from 'react';
import ReactDOM from 'react-dom'; // to access React Portal API

class Portal extends React.Component {
  constructor(){
    super();
    this.container = document.createElement('div');
  }

  componentDidMount = () => {
    document.body.appendChild(this.container);
  }

  componentWillUnmount = () => {
    document.body.removeChild(this.container);
  }

  render() {
    const { children } = this.props;
    console.log(children)
    return ReactDOM.createPortal(children, this.container);
  }
}

export default Portal
