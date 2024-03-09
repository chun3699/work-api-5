import express from "express";
import {conn} from "../dbconnect";

export const router = express.Router();

router.get("/m", (req, res) => {
  conn.query('select * from movie', (err, result, fields)=>{
    res.json(result);
  });
});

router.get("/p", (req, res) => {
  conn.query('select * from person', (err, result, fields)=>{
    res.json(result);
  });
});

// router.get("/", (req, res) => {
//   if (req.query.id) {
//     res.send("Get in trip.ts Query id: " + req.query.id);
//   } else {
//     res.send("Get in trip.ts");
//   }
// });

// router.get("/:id", (req, res) => {
//   res.send("Get in trip.ts id: " + req.params.id);
// });

// router.post("/", (req, res) => {
//   let body = req.body; 
//   res.send("Get in trip.ts body: " + body);
// });

// router.post("/", (req, res) => {
//   let body = req.body; 
//   res.send("Get in trip.ts body: " + JSON.stringify(body));
// });

// router.get("/", (req, res) => {
//   conn.query('select * from movie', (err, result, fields)=>{
//     res.json(result);
//   });
// });