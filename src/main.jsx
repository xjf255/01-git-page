import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
)
