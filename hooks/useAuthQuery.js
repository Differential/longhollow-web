import { useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';

import { useAuth, logout } from 'providers/AuthProvider';

const useAuthQuery = (query, options = {}) => {
  const [state, dispatch] = useAuth();
  const { token, authenticated } = state;
  const { data, error, loading, refetch: _refetch } =
    useQuery(query, {
      skip: !authenticated,
      fetchPolicy: 'network-only',
      ...options,
    }) || {};

  // There's a bug where the query from `useQuery` is `undefined`
  // and will throw an error in the `useEffect` down below.
  // https://github.com/apollographql/react-apollo/issues/3862
  const refetch = useCallback(() => {
    if (_refetch) return;
    setTimeout(() => _refetch(), 0);
  }, [_refetch]);

  useEffect(() => {
    if (authenticated) {
      refetch()?.catch(() => console.error('Authentication error'));
    }
  }, [authenticated, token, refetch]);

  useEffect(() => {
    if (!error) return;
    console.error('Authentication error: logging out...');
    dispatch(logout());
  }, [error, dispatch]);

  return {
    data,
    loading,
    error,
    authenticated,
  };
};

export default useAuthQuery;
