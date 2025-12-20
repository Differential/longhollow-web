import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function CustomLink({ Component: _Component, href, children, ...props }) {
  if (!_Component) {
    return <Link href={href}>{children}</Link>;
  }

  return (
    <Link href={href}>
      <WrappedComponent Component={_Component} href={href} {...props}>
        {children}
      </WrappedComponent>
    </Link>
  );
}

const WrappedComponent = React.forwardRef(({ Component, ...props }, ref) => (
  <Component ref={ref} {...props} />
));
WrappedComponent.displayName = 'WrappedComponent';

CustomLink.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default CustomLink;
