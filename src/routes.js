const handlers = require('./handlers');

const routes = [
	{
		path: '/notes',
		method: 'POST',
		handler: handlers.handleAddNote,
	},
	{
		path: '/notes',
		method: 'GET',
		handler: handlers.handleGetAllNotes,
	},
	{
		path: '/notes/{id}',
		method: 'GET',
		handler: handlers.handleGetNoteById,
	},
	{
		path: '/notes/{id}',
		method: 'PUT',
		handler: handlers.handleUpdateNote,
	},
	{
		path: '/notes/{id}',
		method: 'DELETE',
		handler: handlers.handleDeleteNoteById,
	},
];

module.exports = routes;
