const service = require("./theaters.service");

async function list(req, res) {
	const theaters = await service.list();
// For each theater, fetch the list of movies and add it to the theater object
	for(let theater of theaters) {
		const movies = await service.listMovies(theater.theater_id);
		theater["movies"] = movies;
	}
	res.json({ data: theaters });
}

// Middleware function to list theaters showing a specific movie
async function listSpecificMovie(req, res, next) {
	if (res.locals.movie) { // Check if the movie data is available in res.locals
		const theaters = await service.listTheaters(res.locals.movie.movie_id); 
		return res.json({ data: theaters }); 
	}
	next(); 
}

module.exports = {
	list: [listSpecificMovie, list],
}