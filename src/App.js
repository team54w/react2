import bg from './img/bg.png'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';
import axios from 'axios'
import Cart from './routes/Cart.js';
import { useQuery } from 'react-query';

function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  let result = useQuery('작명', ()=> {
    return axios.get('https://codingapple1.github.io/userdata.json')
      .then((a) => { return a.data })
  })

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">MAMMOT</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/0') }}>Detail</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && '로딩중'}
            {result.error && '에러'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
        <>
            <div className="main-bg" style={{ backgroundImage: 'url(' + bg + ')' }}></div>
            <div className="container">
              <div className="row">
                {
                  shoes.map((a, i) => {
                    return (
                      <Card shoes={shoes[i]} i={i + 1} />
                    )
                  })
                }
              </div>
            </div>
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json').then((결과) => {
                let copy = [...shoes, ...결과.data]
                setShoes(copy)
              })
                .catch(() => {
                  console.log('실패')
                })
            }}>더보기</button>
        </>
        } />
        <Route path="*" element={<div>404</div>} />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />} >
          <Route path="member" element={<div>멤버들</div>} />
          <Route path="location" element={<div>회사위치</div>} />
        </Route>
        <Route path="/cart" element={<Cart />}> </Route>

        </Routes>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;
