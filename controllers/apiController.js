function index(req, res) {
  res.json({
    message: "Welcome to Sam's project 1!",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
