const getQueryName = query => {
  const definition = query?.definitions?.find(
    item => item?.kind === 'OperationDefinition'
  );
  return definition?.name?.value || 'unknown';
};

const safeQuery = async (client, options = {}) => {
  try {
    return await client.query(options);
  } catch (error) {
    console.error('[ApolloQueryError]', {
      query: getQueryName(options.query),
      variables: options.variables || {},
      error: error?.message || String(error),
    });
    return null;
  }
};

export default safeQuery;
