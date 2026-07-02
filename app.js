const express = require("express");
const app = express();
const path = require("path");

app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

let secretNumber;
let attempts;
let from;
let to;

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/start", (req, res) => {
    from = Number(req.body.from);
    to = Number(req.body.to);

    secretNumber = Math.floor(Math.random() * (to - from + 1)) + from;
    attempts = 0;

    res.render("game", {
        from,
        to,
        message: "",
        attempts
    });
});

app.post("/check", (req, res) => {
    const guess = Number(req.body.guessedno);
    attempts++;

    let message;

    if (guess < secretNumber) {
        message = "Your guess is too small.";
    } else if (guess > secretNumber) {
        message = "Your guess is too large.";
    } else {
        message = `🎉 Congratulations! You guessed the number in ${attempts} attempts.`;
    }

    res.render("game", {
        from,
        to,
        message,
        attempts
    });
});

app.listen(3000);