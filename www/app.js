const express = require("express");
const app = express();

app.use(express.static("dist")); //serves the index.html
// app.use(require("prerender-node").set('prerenderToken', 'YctDpxgruNmFlVMjgICZ')); // prerender.io
app.listen(3018);
console.log("Listening...");
