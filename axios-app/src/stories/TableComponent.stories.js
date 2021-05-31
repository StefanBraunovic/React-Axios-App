import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import TableData from '../components/table/Table';

export default {
	title: 'Example/Table',
	component: TableData,
};

const Template = (args) => <TableData {...args} />;

export const Table = Template.bind({});
Table.args = {
	headers: ['name', 'genre', 'publishedDate', 'writerName', 'directorName'],
	rows: [
		{
			isbn: 'The Lord of the Rings: The Fellowship of the Ring',
			genre: 'Action, Adventure, Drama',
			publishedDate: '2001',
			writerName: 'J.R.R. Tolkien',
			directorName: 'Peter Jackson',
		},
	],
};
