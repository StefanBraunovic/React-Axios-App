import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {useHistory} from "react-router-dom";

const Forbidden = () => {
    const history = useHistory();
    return<Container>
        <Row style={{marginTop:"40vh"}}>
            <Col>
        This page is forbidden! Please log in!
        <button onClick={() => history.push('/login')}>Log in</button>
            </Col>
        </Row>

    </Container>
}

export default Forbidden;