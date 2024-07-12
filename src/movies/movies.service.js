const knex = require("../db/connection");

// Function to list movies, optionally filtering by showing status
function list(isShowing) {
	if(isShowing) {
      // If isShowing is true, fetch only movies that are currently showing
		return knex("movies as m")
			.join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
			.distinct("mt.movie_id")
			.select("m.*")
			.where({ is_showing: true });
	}
	return knex("movies")
		.select("*");
}

// Function to read a specific movie by its ID
function read(movieId) {
	return knex("movies")
		.select("*")
		.where({ movie_id: movieId })
		.first();
}

module.exports = {
	list,
	read,
};