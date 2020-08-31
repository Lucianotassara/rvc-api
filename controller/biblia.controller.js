import express from 'express';
import { DB_PATH } from '../config';
const sqlite3 = require('sqlite3').verbose();

const bibliaController = express.Router();

function bookNumber(shortName){
  switch(shortName){
    case 'GEN': return 1;
    case 'EXO': return 2;
    case 'LEV': return 3;
    case 'NUM': return 4;
    case 'DEU': return 5;
    case 'JOS': return 6;
    case 'JDG': return 7;
    case 'RUT': return 8;
    case '1SA': return 9;
    case '2SA': return 10;
    case '1KI': return 11;
    case '2KI': return 12;
    case '1CH': return 13;
    case '2CH': return 14;
    case 'EZR': return 15;
    case 'NEH': return 16;
    case 'EST': return 17;
    case 'JOB': return 18;
    case 'PSA': return 19;
    case 'PRO': return 20;
    case 'ECC': return 21;
    case 'SNG': return 22;
    case 'ISA': return 23;
    case 'JER': return 24;
    case 'LAM': return 25;
    case 'EZK': return 26;
    case 'DAN': return 27;
    case 'HOS': return 28;
    case 'JOL': return 29;
    case 'AMO': return 30;
    case 'OBA': return 31;
    case 'JON': return 32;
    case 'MIC': return 33;
    case 'NAM': return 34;
    case 'HAB': return 35;
    case 'ZEP': return 36;
    case 'HAG': return 37;
    case 'ZEC': return 38;
    case 'MAL': return 39;
    case 'MAT': return 40;
    case 'MRK': return 41;
    case 'LUK': return 42;
    case 'JHN': return 43;
    case 'ACT': return 44;
    case 'ROM': return 45;
    case '1CO': return 46;
    case '2CO': return 47;
    case 'GAL': return 48;
    case 'EPH': return 49;
    case 'PHP': return 50;
    case 'COL': return 51;
    case '1TH': return 52;
    case '2TH': return 53;
    case '1TI': return 54;
    case '2TI': return 55;
    case 'TIT': return 56;
    case 'PHM': return 57;
    case 'HEB': return 58;
    case 'JAS': return 59;
    case '1PE': return 60;
    case '2PE': return 61;
    case '1JN': return 62;
    case '2JN': return 63;
    case '3JN': return 64;
    case 'JUD': return 65;
    case 'REV': return 66;
    default: break;
  }
}

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

function getBibleVersion(n){
  switch(n){
    case 146: return { "ruta":"RVC.bblx", "version":"RVC"}
    case 411: return { "ruta":"DHH.bblx", "version":"DHH"}
    case 149: return { "ruta":"RV60.bblx", "version":"RV60"}
    case 176: return { "ruta":"TLA.bblx", "version":"TLA"}
    case 128: return { "ruta":"NVI.bblx", "version":"NVI"}
    case 150: return { "ruta":"RV95.bblx", "version":"RV95"}
    case 197: return { "ruta":"PDT.bblx", "version":"PDT"}
  }
}

bibliaController.route('/').get(
  (req, res) => {
    res.json({ message: 'Hello / !'})
  }
);


bibliaController.route('/:version/:cita').get((req, res, next) => {
  // Tomar el codigo de versión del primer parametro
  let vers = getBibleVersion(parseInt(req.params.version));
  // Elegir que BD SQLITE abrir en base a codigo versión
  let db = new sqlite3.Database(process.env.SQLITE_DB_PATH + vers.ruta);

  // Tomar segundo parametro, hacer split por punto. Luego hacer split por guión.
  // JHN.3.16-18
  let chars = req.params.cita.split('.'); // chars  -> ['JHN', '3', '16-18']
  
  let intervalo;
  let capituloCompleto;

  if(chars[2] == undefined){
    capituloCompleto = true 
  } else {
    capituloCompleto = false;
    intervalo = chars[2].split('-'); // intervalo -> ['16', '18']
  }

  let q = {
    "book": bookNumber(chars[0].toUpperCase()),
    "chapter": chars[1],
    "initialVerse": (capituloCompleto) ? 1 : intervalo[0],
    "finalVerse": (capituloCompleto) ? 200 : intervalo[1]

  };

  (q.finalVerse == undefined ) ? q.finalVerse = q.initialVerse : "";

      db.all(
          `select * from Bible b where b.Book = ? and b.Chapter = ? 
            and b.Verse between ${q.initialVerse} and ${q.finalVerse}`, 
      [q.book, q.chapter], (err, rows) => {
        
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        let arrayScriptures = []; 
        rows.forEach(l => arrayScriptures.push(l.Scripture + ' ')); 

        let arrayVers = []; 
        rows.forEach(v => arrayVers.push(v.Verse)); 
        
        let versCita = (arrayVers.length == 1) ? `${arrayVers[0]}`  : `${arrayVers[0]}-${arrayVers[arrayVers.length-1]}`;
        let displayCita = `${displayName(rows[0].Book)} ${rows[0].Chapter}:${versCita} (${vers.version})`;
        
        res.status(200).json({ 
                'book': rows[0].Book,
                'bookShortName': shortName(rows[0].Book),
                'bookDisplayName': displayName(rows[0].Book),
                'chapter': rows[0].Chapter,
                'verse': versCita,
                'scripture': arrayScriptures.join(''),
                'cita': displayCita,
                'version': vers.version
              });
    });

  db.close();
});


export default bibliaController;