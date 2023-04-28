import './App.css';
import Nav from "./Components/Nav";
import Routes from "./Components/Routes";
import { GlobalProvider } from './Components/Global';

function App() {
  return (
    <GlobalProvider>
      <Nav />
      <Routes />
    </GlobalProvider>
  );
}

export default App;
