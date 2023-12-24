import React from 'react';
import './Home3.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
function Home3 ()  {

  

  return (
    <div className='main-con-hom3'>
        <div className='hom3-con1'>
          <h1 className='h3con1-head'>How can we help you harness the future of commercial real estate?</h1>
          <Button variant="outline-dark" className='h3-btn'>SPEAK WITH US</Button>
          <img src='home3_1.svg' className='h3-img1'/>
        </div>
        <div className='hom3-con2'>
          <h1 className='h3con2-head'>
            Featured Properties
          </h1>
          <div className='hom3-con2-1'>
           
        {/* <div className='row'>
          <div className='col1'>
           
          </div>
          <div className='col2'>

          </div>
          <div className='col3'>

          </div>
        </div> */}

          {/* <CardGroup>
      <Card>
        <Card.Img variant="top" src="f1img1.webp" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="f1img2.webp" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="f1img3.webp" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup> */}
          </div>
        </div>
    </div>
  )
}

export default Home3