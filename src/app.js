if (process.env.USER) require("dotenv").config();
const port = process.env.PORT || 5001;
const express = require("express");
const app = express();
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

app.use(express.json());
app.use(cors());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use((req, res, next) => {
	next({
		status: 404,
		message: "Page does not exist"
	});
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Something went wrong" } = err;
	res.status(status).json({ error: message });
});

module.exports = app;
