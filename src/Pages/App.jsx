import '../Sass/App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import Header from '../Components/Header'
import Home from '../Pages/Home'
import Footer from '../Components/Footer'

// import SignIn from '../Pages/SignIn'


function App() {
  return (
      <>
          <Router>
              <Header />
              <Routes>
                  <Route path="/" element={<Home />} />
                  {/* <Route path="/signIn" element={<SignIn />} />  */}
              </Routes>
              <Footer />
          </Router>
      </>
  )
}

export default App;
