import Container from 'react-bootstrap/Container';
import "./Nav_Bar.css";
import Navbar from 'react-bootstrap/Navbar';

function Nav_bar() {
    return (
        <Container className = "Broad_nav">
            <Navbar className = "bg-body-tertiary">
                <Container>
                    <Navbar.Brand className = "navi" href = "#home"> Homepage </Navbar.Brand>
                </Container>
            </Navbar>

            <Navbar className = "bg-body-tertiary">
                <Container>
                    <Navbar.Brand className = "navi" href = "#about"> About </Navbar.Brand>
                </Container>
            </Navbar>

            <Navbar className = "bg-body-tertiary">
                <Container>
                    <Navbar.Brand className = "navi" href = "#login"> Login </Navbar.Brand>
                </Container>
            </Navbar>

            <Navbar className = "bg-body-tertiary">
                <Container>
                    <Navbar.Brand className = "navi" href = "#register"> Register </Navbar.Brand>
                </Container>
            </Navbar>
        </Container>
    );
}

export default Nav_bar