import React from 'react';
import PropTypes from 'prop-types';

import { logOut } from 'actions';
import Logo from 'components/Logo';

export default class Header extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  handleClickLogout = e => {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(logOut());
  };

  render() {
    return (
      <header className="container">
           <div className="row pt-4">
             <div className="col-6"><Logo file="noir"/></div>
             <div className="col-6">
                  <a className="btn btn-primary float-right" href="#logout" onClick={this.handleClickLogout}>
                      <span>logout </span><i className="i-sign-out" />
                 </a>
             </div>
            </div>
      </header>
    );
  }
}
