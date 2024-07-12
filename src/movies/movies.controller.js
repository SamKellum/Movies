const service = require("./movies.service");

// Controller function to list movies
async function list(req, res) {
	const { is_showing = false } = req.query; 
	const movies = await service.list(Boolean(is_showing)); // Fetch movies based on is_showing flag
	res.json({ data: movies }); 
}


async function read(req, res) {
	res.json({ data: res.locals.movie });
}

async function validateMovieId(req, res, next) {
	const { movieId } = req.params;
	const movie = await service.read(Number(movieId));

	if(movie) {
		res.locals.movie = movie;// Store the movie in res.locals for later use
		return next();
	}
	next({
		status: 404,
		message: "Movie cannot be found."
	});
}

module.exports = {
	list,
	read: [validateMovieId, read],
	validateMovieId,
};