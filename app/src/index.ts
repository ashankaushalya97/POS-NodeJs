import express = require("express");
import router from "./main-dispatcher";

const app  = express();

app.listen(5050,()=>("Server has been started!"));

app.use(router);
