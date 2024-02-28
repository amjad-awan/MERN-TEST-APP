import './App.css';
import AppRoutes from "./AppRoutes"
import { AuthProvider } from './context/auth';
function App() {
  return (
    <div className="App bg-[#E9ECF1]">
        <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
    
    </div>
  );
}

export default App;
