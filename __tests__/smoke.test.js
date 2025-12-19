import React from 'react';
import { render } from '@testing-library/react';

import App from '../pages/index';

jest.mock('components', () => ({
  HomeFeed: () => <div>watch online</div>,
  Layout: ({ children }) => <div>{children}</div>,
}));

jest.mock('providers', () => ({
  FeedFeaturesProvider: ({ Component, ...props }) => (
    <Component {...props} />
  ),
}));

describe('App', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText(/watch online/i)).toBeInTheDocument();
  });
});
