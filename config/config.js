module.exports = {
	development: {
		dialect: "sqlite",
		storage: "./db.ipps.sqlite"
	},
	test: {
		dialect: "sqlite",
		storage: ":memory:"
	},
	production: {
		dialect: "sqlite",
		storage: "./db.ipps.sqlite"
	}
};
