import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Topnav = () => {
    const expand = 'sm';

    return (
        <Navbar key={expand} bg='light' expand={expand} className='mb-3'>
            <Container fluid>
                <Navbar.Brand href='/'>📗 책-it-out</Navbar.Brand>

                <Navbar.Toggle
                    aria-controls={`offcanvasNavbar-expand-${expand}`}
                />

                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href='/book'>책 관리</Nav.Link>
                        <Nav.Link href='/'>Pricing</Nav.Link>
                    </Nav>

                    <Nav>
                        <Form className='d-flex'>
                            <Form.Control
                                type='search'
                                placeholder='책 검색'
                                className='me-2'
                                aria-label='Search'
                            />
                            <Button variant='outline-success'>🔍</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Topnav;
