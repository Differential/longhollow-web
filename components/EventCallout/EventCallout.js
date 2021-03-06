import React from 'react';
import { Box, Image, Text } from 'ui-kit';
import PropTypes from 'prop-types';

function EventCallout({ title, description, imageSrc, ...props } = {}) {
  return (
    <Box mt="s" display="flex" alignItems="center">
      <Image
        mr="s"
        height="80px"
        width="80px"
        src={imageSrc}
        rounded
        bg="neutrals.300"
        style={{ objectFit: 'cover' }}
      />
      <Box display="flex" flexDirection="column">
        <Text color="neutrals.900" variant="h4" fontWeight="700">
          {title}
        </Text>
        <Text color="neutrals.900" variant="h4" fontWeight="400">
          {description}
        </Text>
      </Box>
    </Box>
  );
}

EventCallout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
};

export default EventCallout;
