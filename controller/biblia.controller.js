import express from 'express';
const sqlite3 = require('sqlite3').verbose();
import { BIBLE_VERSIONS, getBibleVersion} from '../consts/bibleVersions'
import {BIBLE_BOOKS, bookNumber} from '../consts/libros'

const bibliaController = express.Router();

bibliaController.route('/').get(
  (req, res) => {
    res.json({help: "You can make your request providing your own SQlite databases, make sure your database is correctly placed, check your .env file",
              message: `So.. Everything ready? Try this url-> http://{{host}}:${process.env.BIBLE_API_PORT}/146/JHN.3.16-18 - You can make your queries using the data listed below` ,
              books: BIBLE_BOOKS,
              versions: BIBLE_VERSIONS
            })
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

  if (chars[2] == undefined) {
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

  if (q.chapter == undefined) {
    res.status(402).json({ 'Error': 'Bad Request. No se reconoce el capitulo.' })
  } else {

    (q.finalVerse == undefined) ? q.finalVerse = q.initialVerse : "";

    db.all(`select * from Bible b where b.Book = ? and b.Chapter = ? 
              and b.Verse between ${q.initialVerse} and ${q.finalVerse}`,
      [q.book, q.chapter], (err, rows) => {

        if (err) {
          res.status(400).json({ "error": err.message });
          return;
        }

        if (rows.length == 0) {
          res.status(404).json({ 'message': 'No hay resultados, la cita que está buscando no existe' });
        } else {

          let arrayScriptures = [];
          rows.forEach(l => arrayScriptures.push(l.Scripture + ' '));

          let arrayVers = [];
          rows.forEach(v => arrayVers.push(v.Verse));

          let versCita = (arrayVers.length == 1) ? `${arrayVers[0]}` : `${arrayVers[0]}-${arrayVers[arrayVers.length - 1]}`;
          let displayCita = `${BIBLE_BOOKS[rows[0].Book - 1].displayName} ${rows[0].Chapter}:${versCita} (${vers.version})`;

          res.status(200).json({
            'book': rows[0].Book,
            'bookShortName': BIBLE_BOOKS[rows[0].Book - 1].shortName,
            'bookDisplayName': BIBLE_BOOKS[rows[0].Book - 1].displayName,
            'chapter': rows[0].Chapter,
            'verse': versCita,
            'scripture': arrayScriptures.join(''),
            'cita': displayCita,
            'version': vers.version
          });
        }
      });
    db.close();
}
});


export default bibliaController;