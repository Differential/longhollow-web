import React from 'react';
import PropTypes from 'prop-types';

import { Box, FormLabel, systemPropTypes } from 'ui-kit';
import Styled from './TextInput.styles';

function TextInput(props = {}) {
  return (
    <Styled {...props.containerProps}>
      {props.label ? (
        <FormLabel htmlFor={props.id} {...props.labelProps}>
          {props.label}
          {props.required ? (
            <Box as="span" color="error" fontWeight="bold">
              *
            </Box>
          ) : null}
        </FormLabel>
      ) : null}
      <Styled.Input id={props.id} name={props.id} {...props} />
    </Styled>
  );
}

TextInput.propTypes = {
  ...systemPropTypes,
  containerProps: PropTypes.shape({
    ...systemPropTypes,
  }),
  labelProps: PropTypes.shape({
    ...systemPropTypes,
  }),
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
};

TextInput.defaultProps = {
  type: 'text',
};

export default TextInput;
