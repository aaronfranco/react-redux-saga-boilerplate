import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import config from 'config';

import Logo from 'components/Logo';
import { login } from 'actions/index';

export class Home extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  handleClickLogin = (e) => {
    e.preventDefault();

    this.props.dispatch(login());
  };

  render() {
    const { user } = this.props;
    console.log(config)
    return (
      <div key="Home" className="h-100 w-100">
        <div className="row justify-content-center align-items-center vertical-align-content">
            <div className="app__home__header">
              <Logo file="noir"/>
            </div>
            <h1 className="mb-5">{config.description}</h1>
            <a
              href="#login"
              onClick={this.handleClickLogin}
              className={cx('btn btn-lg btn-primary btn-icon', {
                'btn-loading': user.isRunning,
              })}
            >
              <i className="i-sign-in" />
              <span>Start</span>
            </a>
          </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
