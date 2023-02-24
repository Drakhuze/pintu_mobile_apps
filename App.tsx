import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import Home from './views/Home';
import 'intl';
import 'intl/locale-data/jsonp/id-ID';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
