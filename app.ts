import express from "express";
import { router as index } from "./api/index";
import { router as get } from "./api/get";
import { router as search } from "./api/search";
import { router as insert } from "./api/insert";
import { router as del } from "./api/delete";
import bodyParser from "body-parser";


export const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());

app.use("/", index);
app.use("/get", get);
app.use("/s", search);
app.use("/i", insert);
app.use("/d", del);

app.use((req,res)=>{
    res.status(404);
    res.send("Seviec not found");
});
