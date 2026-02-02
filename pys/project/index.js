const express = require("express");
const app = express();
const PORT = 3000;
const users = require("./data.json");
app.get("/", (req, res) => {
  res.send("hello world from express");
});

app
  .route("/api/users/:id")
  .get( (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .put( (req, res) => {
    res.json({ status: "pending" });
  })
  .patch( (req, res) => {
    res.json({ status: "pending" });
  })
  .delete( (req, res) => {
    res.json({ status: "pending" });
  });

app.get("/api/users", (req, res) => {
  return res.json(users);
});
app.get("/api/user", (req, res) => {
  const html = `
    <ul>
    ${users
      .map(
        (user) => `<li>
        ${user.first_name}      
        </li>`,
      )
      .join("")}
    </ul>
    `;
  res.send(html);
});

app.post("/api/users", (req, res) => {
  res.json({ status: "pending" });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
