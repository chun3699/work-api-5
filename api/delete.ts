import express from "express";
import {conn} from "../dbconnect";
import mysql from "mysql";
import {movie} from "../model/movie";
import {person} from "../model/person";

export const router = express.Router();

router.delete("/movie/:id", (req, res) => {
    let id = +req.params.id;
   // ลบข้อมูล person ที่เชื่อมโยงกับหนังด้วย mid
   conn.query("DELETE FROM person WHERE mid = ?", [id], (err, personResult) => {
        if (err) throw err;

        // ตรวจสอบว่ามี person ถูกลบไปหรือไม่
        if (personResult.affectedRows > 0) {
            // ถ้ามีข้อมูล person ถูกลบไป ให้ลบข้อมูลหนังด้วย id ที่รับมา
            conn.query("DELETE FROM movie WHERE mid = ?", [id], (err, movieResult) => {
                if (err) throw err;
                res.status(200).json({ affected_row: movieResult.affectedRows });
            });
        } else {
            // ถ้าไม่มีข้อมูล person ถูกลบไป ให้แค่ลบข้อมูลหนังด้วย id ที่รับมา
            conn.query("DELETE FROM movie WHERE mid = ?", [id], (err, movieResult) => {
                if (err) throw err;
                res.status(200).json({ affected_row: movieResult.affectedRows  });
            });
        }
    });
  });

  router.delete("/person/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from person where pid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });