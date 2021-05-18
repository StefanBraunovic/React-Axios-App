import React from 'react';
import {useHistory} from "react-router-dom";

const Forbidden = () => {
    const history = useHistory();
    return <div>
        This page is forbidden! Please log in!
        <button onClick={() => history.push('/login')}>Log in</button>
    </div>
}

export default Forbidden;