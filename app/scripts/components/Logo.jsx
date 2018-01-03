import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import config from 'config';

const Logo = ({ file }) => (
    <img height="55" src={require(`assets/media/brand/${file}.png`)} alt={config.title} />
);

Logo.propTypes = {
  file: PropTypes.string,
};

Logo.defaultProps = {
  file: 'icon',
};

export default Logo;
