import '../Sass/App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import Header from '../Components/Header'
import Home from '../Pages/Home'
import Footer from '../Components/Footer'
import SignIn from '../Pages/SignIn'
import User from '../Pages/User'

function App() {
  return (
      <>
          <Router>
              <Header />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signIn" element={<SignIn />} />
                  <Route path="/user" element={<User />} />
              </Routes>
              <Footer />
          </Router>
      </>
  )
}

export default App;
