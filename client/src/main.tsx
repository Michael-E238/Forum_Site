import ReactDOM from'react-dom/client';
import { createBrowserRouter, RouterProvider } from'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Home from './pages/Home';
import ActionAdventurePage from './pages/ActionAdventurePage';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/action-adventure',
    element: <ActionAdventurePage />,
  },
]);

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}