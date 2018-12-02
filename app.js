const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const request = require("request");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    request("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&key=AIzaSyCAO49V3neY14ZsWYRw6hCEhxj3LM0l1iY", (err, response, bdy) => {
        let parsed = JSON.parse(bdy);
        request("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCq-Fj5jknLsUf-MWSy4_brA&key=AIzaSyCAO49V3neY14ZsWYRw6hCEhxj3LM0l1iY", (err, response, bdy) => {
            let x = JSON.parse(bdy);
            res.render(`${__dirname}/views/index`, {t_count:x.items[0].statistics.subscriberCount,subcount:parsed.items[0].statistics.subscriberCount});
        });
    });
});

http.listen(8080, () => {
    console.log("listening...");
})