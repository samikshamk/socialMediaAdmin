import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./Config/routes";

import { Navbar, Container, Nav } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Admin</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/post">Post</Nav.Link>
            <Nav.Link href="/comment">Comment</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </Router>


      <Router>
          <Routes>
            {routes.map(({ path, name, element }, key) => {
              return (
                <Route
                  key={element}
                  exact
                  path={path}
                  name={name}
                  element={element}
                />
              );
            })}
          </Routes>

          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>


    </div>
  );
}

export default App;
