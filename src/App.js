import AiPage from './Pages/AiPage/AiPage';
import LandingPage from './Pages/LandingPage/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = '/' element = {<LandingPage/>} />
          <Route path = '/speak' element = {<AiPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
