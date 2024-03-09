import express from "express";
import {conn} from "../dbconnect";
import mysql from "mysql";
import {movie} from "../model/movie";
import {person} from "../model/person";

export const router = express.Router();

router.post("/movie", (req, res) => {
    let movie: movie = req.body;
    let sql =
      "INSERT INTO `movie`(`title`, `year`, `genre`) VALUES (?,?,?)";
    sql = mysql.format(sql, [
      movie.title,
      movie.year,
      movie.genre,
    ]);

    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
  });

  router.post("/person", (req, res) => {
    let person: person = req.body;
    let sql =
      "INSERT INTO `person`(`name`, `birthdate`, `status`, `mid`) VALUES (?,?,?,?)";
    sql = mysql.format(sql, [
      person.name,
      person.birthdate,
      person.status,
      person.mid
    ]);

    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
  });