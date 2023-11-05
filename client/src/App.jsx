import './App.css';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

// import { client } from './utils/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/saved" element={<SavedBooks />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="*" element={<Home />} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
