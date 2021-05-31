import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from '../pages/login/Login';

export default {
	title: 'Example/Login',
	component: Login,
};

const Template = (args) => <Login {...args} />;

export const LoginPrew = Template.bind({});
// LoginPrew.args = [];
