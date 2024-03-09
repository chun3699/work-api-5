import express from "express";
import {conn} from "../dbconnect";

export const router = express.Router();

router.get("/:tt", (req, res) => {
    let tt = '%' + req.params.tt + '%';
    conn.query("SELECT * FROM movie WHERE title LIKE ?", [tt], (err, movies: any[], fields) => {
        if (err) {
            throw err;
        }
        
        // เตรียม array สำหรับเก็บข้อมูลที่แยกออกเป็น star และ creators
        let results: { movie: any, stars: any[], creators: any[] }[] = [];
        
        // วน loop ทุกเรื่องหนังที่ค้นพบ
        for (let movie of movies) {
            let mid = movie.mid; // ดึงค่า mid ของหนัง
            conn.query("SELECT * FROM person WHERE mid = ? AND status = 'stars'", [mid], (err, stars: any[], fields) => {
                if (err) {
                    throw err;
                }
                
                // Query สำหรับดึง creators
                conn.query("SELECT * FROM person WHERE mid = ? AND status = 'creators'", [mid], (err, creators: any[], fields) => {
                    if (err) {
                        throw err;
                    }
                    
                     // Convert birthdate to ISO date string without time
                     for (let star of stars) {
                        star.birthdate = new Date(star.birthdate).toISOString().split('T')[0];
                    }
                    
                    // Convert birthdate to ISO date string without time
                    for (let creator of creators) {
                        creator.birthdate = new Date(creator.birthdate).toISOString().split('T')[0];
                    }

                    // เพิ่มข้อมูลหนัง และ star และ creators เข้าไปใน array
                    results.push({ movie: movie, stars: stars, creators: creators });
                    
                    // ถ้าข้อมูลทั้งหมดถูกดึงมาแล้ว
                    if (results.length === movies.length) {
                        // ส่งการตอบกลับเมื่อเสร็จสิ้นการประมวลผลทั้งหมด
                        res.json(results);
                    }
                });
            });
        }
    });
});
