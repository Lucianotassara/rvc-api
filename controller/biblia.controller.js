import express from 'express';
const sqlite3 = require('sqlite3').verbose();

const bibliaController = express.Router();


bibliaController.route('/biblias').get(
  (req, res) => {

    let db = new sqlite3.Database('/home/lucho/repo/rvc-api/bibles/RVC.bblx');

    let sql = `select b.Book, MAX(b.Chapter) as CantCapitulos, count(b.verse) as CantVers 
    from Bible b 
    group by b.Book `;

    db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.Book, row.CantCapitulos, row.CantVers);
    });
  });
  db.close();

    res.json({ message: 'Hello biblias!'})
  }
);

bibliaController.route('/').get(
  (req, res) => {
    res.json({ message: 'Hello / !'})
  }
);

bibliaController.route('/rvc/:book/:chapter/:verse*?').get(
  (req, res) => {
    //  var  verse;
    var data = {
      "cita": {
          "book": req.params.book,
          "chapter": req.params.chapter,
          "verse": req.params.verse
      }
    };

    let db = new sqlite3.Database('/home/lucho/repo/rvc-api/bibles/RVC.bblx');

    let sql =  `select Scripture 
                from Bible b 
                where 1 = 1
                  and b.Book = ${data.cita.book} 
                  and b.chapter = ${data.cita.chapter}
                  and b.verse = ${data.cita.verse}`;
    let verse;
    
    db.all(sql, [], async (err, rows) => {
    if (err) {
      throw err;
    }
    await rows.forEach( (row) => {
      console.log('0: ' + row.Scripture);
      this.verse =  row.Scripture;
    });
  });
  
  // console.log('1: ' + this.verse);
    res.json({ 
      'book': data.cita.book,
      'bookShortName': 'JHN',
      'bookDisplayName': 'Juan',
      'chapter': data.cita.chapter,
      'verse': data.cita.verse,
      'scripture': this.verse,
      'version': 'RVC'
    });
    db.close();
  }
);

export default bibliaController;