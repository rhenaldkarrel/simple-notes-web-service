const { nanoid } = require('nanoid');
const notes = require('./notes');

module.exports = {
	handleAddNote(request, h) {
		const { title, tags, body } = request.payload;
		const id = nanoid(16);
		const createdAt = new Date().toISOString();
		const updatedAt = createdAt;

		const newNote = {
			id,
			title,
			tags,
			body,
			createdAt,
			updatedAt,
		};

		notes.push(newNote);

		const isSuccess = notes.filter((note) => note.id === id).length > 0;
		if (isSuccess) {
			const response = h.response({
				status: 'success',
				message: 'Note added successfully',
				data: {
					noteId: id,
				},
			});
			response.code(201);
			return response;
		}

		const response = h.response({
			status: 'error',
			message: 'Note could not be added',
		});
		response.code(500);
		return response;
	},

	handleGetAllNotes() {
		return {
			status: 'success',
			data: {
				notes,
			},
		};
	},

	handleGetNoteById(request, h) {
		const { id } = request.params;
		const note = notes.filter((n) => n.id === id)[0];
		console.log(note);

		if (note !== undefined) {
			return {
				status: 'success',
				data: {
					note,
				},
			};
		}

		const response = h.response({
			status: 'fail',
			message: 'Note not found',
		});
		response.code(404);
		return response;
	},

	handleUpdateNote(request, h) {
		const { id } = request.params;
		const { title, tags, body } = request.payload;
		const updatedAt = new Date().toISOString();

		const note = notes.find((n) => n.id === id);
		if (note !== undefined) {
			note.title = title;
			note.tags = tags;
			note.body = body;
			note.updatedAt = updatedAt;

			const response = h.response({
				status: 'success',
				message: 'Note updated successfully',
			});
			response.code(200);
			return response;
		}

		const response = h.response({
			status: 'fail',
			message: 'Failed to update note. Note not found',
		});
		response.code(404);
		return response;
	},

	handleDeleteNoteById(request, h) {
		const { id } = request.params;

		const note = notes.find((n) => n.id === id);
		if (note !== undefined) {
			notes.splice(notes.indexOf(note), 1);

			const response = h.response({
				status: 'success',
				message: 'Note deleted successfully',
			});
			response.code(200);
			return response;
		}

		const response = h.response({
			status: 'fail',
			message: 'Failed to delete note. Note not found',
		});
		response.code(404);
		return response;
	},
};
