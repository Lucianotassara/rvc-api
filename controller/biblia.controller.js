import express from 'express';
const sqlite3 = require('sqlite3').verbose();

const bibliaController = express.Router();

function shortName(n){
  switch(n){
    case 1: return	'GEN';
    case 2: return	'EXO';
    case 3: return	'LEV';
    case 4: return	'NUM';
    case 5: return	'DEU';
    case 6: return	'JOS';
    case 7: return	'JDG';
    case 8: return	'RUT';
    case 9: return	'1SA';
    case 10: return	'2SA';
    case 11: return	'1KI';
    case 12: return	'2KI';
    case 13: return	'1CH';
    case 14: return	'2CH';
    case 15: return	'EZR';
    case 16: return	'NEH';
    case 17: return	'EST';
    case 18: return	'JOB';
    case 19: return	'PSA';
    case 20: return	'PRO';
    case 21: return	'ECC';
    case 22: return	'SNG';
    case 23: return	'ISA';
    case 24: return	'JER';
    case 25: return	'LAM';
    case 26: return	'EZK';
    case 27: return	'DAN';
    case 28: return	'HOS';
    case 29: return	'JOL';
    case 30: return	'AMO';
    case 31: return	'OBA';
    case 32: return	'JON';
    case 33: return	'MIC';
    case 34: return	'NAM';
    case 35: return	'HAB';
    case 36: return	'ZEP';
    case 37: return	'HAG';
    case 38: return	'ZEC';
    case 39: return	'MAL';
    case 40: return	'MAT';
    case 41: return	'MRK';
    case 42: return	'LUK';
    case 43: return	'JHN';
    case 44: return	'ACT';
    case 45: return	'ROM';
    case 46: return	'1CO';
    case 47: return	'2CO';
    case 48: return	'GAL';
    case 49: return	'EPH';
    case 50: return	'PHP';
    case 51: return	'COL';
    case 52: return	'1TH';
    case 53: return	'2TH';
    case 54: return	'1TI';
    case 55: return	'2TI';
    case 56: return	'TIT';
    case 57: return	'PHM';
    case 58: return	'HEB';
    case 59: return	'JAS';
    case 60: return	'1PE';
    case 61: return	'2PE';
    case 62: return	'1JN';
    case 63: return	'2JN';
    case 64: return	'3JN';
    case 65: return	'JUD';
    case 66: return	'REV';
    default: break;
  }
}

function displayName(n){
  switch(n){
    case 1: return	'Génesis';
    case 2: return	'Éxodo';
    case 3: return	'Levítico';
    case 4: return	'Números';
    case 5: return	'Deuteronomio';
    case 6: return	'Josué';
    case 7: return	'Jueces';
    case 8: return	'Rut';
    case 9: return	'1° Samuel';
    case 10: return	'2° Samuel';
    case 11: return	'1° Reyes';
    case 12: return	'2° Reyes';
    case 13: return	'1° Crónicas';
    case 14: return	'2° Crónicas';
    case 15: return	'Esdras';
    case 16: return	'Nehemías';
    case 17: return	'Ester';
    case 18: return	'Job';
    case 19: return	'Salmos';
    case 20: return	'Proverbios';
    case 21: return	'Eclesiastés';
    case 22: return	'Cantares';
    case 23: return	'Isaías';
    case 24: return	'Jeremías';
    case 25: return	'Lamentaciones';
    case 26: return	'Ezequiel';
    case 27: return	'Daniel';
    case 28: return	'Oseas';
    case 29: return	'Joel';
    case 30: return	'Amós';
    case 31: return	'Abdías';
    case 32: return	'Jonás';
    case 33: return	'Miqueas';
    case 34: return	'Nahúm';
    case 35: return	'Habacuc';
    case 36: return	'Sofonías';
    case 37: return	'Hageo';
    case 38: return	'Zacarías';
    case 39: return	'Malaquías';
    case 40: return	'Mateo';
    case 41: return	'Marcos';
    case 42: return	'Lucas';
    case 43: return	'Juan';
    case 44: return	'Hechos';
    case 45: return	'Romanos';
    case 46: return	'1° Corintios';
    case 47: return	'2° Corintios';
    case 48: return	'Gálatas';
    case 49: return	'Efesios';
    case 50: return	'Filipenses';
    case 51: return	'Colosenses';
    case 52: return	'1° Tesalonicenses';
    case 53: return	'2° Tesalonicenses';
    case 54: return	'1° Timoteo';
    case 55: return	'2° Timoteo';
    case 56: return	'Tito';
    case 57: return	'Filemón';
    case 58: return	'Hebreos';
    case 59: return	'Santiago';
    case 60: return	'1° Pedro';
    case 61: return	'2° Pedro';
    case 62: return	'1° Juan';
    case 63: return	'2° Juan';
    case 64: return	'3° Juan';
    case 65: return	'Judas';
    case 66: return	'Apocalipsis';
    default: break;
  }
}


bibliaController.route('/').get(
  (req, res) => {
    res.json({ message: 'Hello / !'})
  }
);

bibliaController.route('/rvc/:book/:chapter/:verse*?').get((req, res, next) => {
  let params = {
    "book": req.params.book,
    "chapter": req.params.chapter,
    "verse": req.params.verse//.replace('a','2')
  };


  // TODO: Hacer que funcione con rurta relativa.
  let db = new sqlite3.Database('/home/lucho/repo/rvc-api/bibles/RVC.bblx');

      db.get(
        `select * from Bible b where b.Book = ? and b.Chapter = ? and b.Verse in (?)`, 
      [params.book, params.chapter, params.verse], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        res.status(200).json({ 
                'book': rows.Book,
                'bookShortName': shortName(rows.Book),
                'bookDisplayName': displayName(rows.Book),
                'chapter': rows.Chapter,
                'verse': rows.Verse,
                'scripture': rows.Scripture,
                'version': 'RVC'
              });
    });

  db.close();
});




export default bibliaController;