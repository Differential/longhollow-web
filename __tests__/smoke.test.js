import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  Observable,
} from '@apollo/client';

import { AuthProvider, ModalProvider } from 'providers';
import { ThemeProvider } from 'ui-kit';
import App from '../pages/index';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    };
  },
}));

function createMockClient() {
  const link = new ApolloLink(operation => {
    return new Observable(observer => {
      let data = {};

      switch (operation.operationName) {
        case 'getContentChannel':
          data = {
            node: {
              childContentItemsConnection: {
                edges: [],
              },
            },
          };
          break;
        case 'getLiveStreams':
          data = {
            liveStreams: [],
          };
          break;
        case 'PersonaFeed':
          data = {
            node: {
              actions: [],
            },
          };
          break;
        case 'getUniversalContentItem':
          data = {
            node: null,
          };
          break;
        default:
          data = {};
      }

      observer.next({ data });
      observer.complete();
    });
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}

describe('App', () => {
  it('renders without crashing', () => {
    const client = createMockClient();
    let getByText;

    act(() => {
      ({ getByText } = render(
        <ApolloProvider client={client}>
          <ThemeProvider>
            <AuthProvider>
              <ModalProvider>
                <App />
              </ModalProvider>
            </AuthProvider>
          </ThemeProvider>
        </ApolloProvider>
      ));
    });

    expect(getByText(/take your next step/i)).toBeInTheDocument();
  });
});
