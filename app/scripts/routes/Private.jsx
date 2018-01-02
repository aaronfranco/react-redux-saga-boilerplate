import React from 'react';

import Music from 'containers/Music';

export default class Private extends React.PureComponent {
  render() {
    return (
      <div key="Private" className="app__private app__route">
        <div className="app__container">
          <div className="app__private__content">
            <Music />
          </div>
        </div>
      </div>
    );
  }
}
