import "./styles.css";
import Routes from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { DadosProvider } from './contexts/contextDados';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
      <ToastContainer autoClose={3000} />
      <DadosProvider>
        <Routes />
      </DadosProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
