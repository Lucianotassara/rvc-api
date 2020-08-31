# rvc-api

NodeJs API that queries a SQlite database of bible verses.

## Setup

rename .env.sample to .env and modify as needed.

`BIBLE_API_PORT={{port}}    SQLITE_DB_PATH={{path_to_sqlite_databases}}`

SQLITE databeses are not stored in this repo. You will need to add yours.

The structure of the DB is only one table named "Bible", with 4 columns:

* Book _(int)_
* Chapter _(int)_
* Verse _(int)_
* Scripture _(text)_

## Run project

`$ npm install`
`$ node -r esm rvc-api.js`

## Endpoint

**`http://{host}:{port}/{bibleVersion}/{query}`**

## Query params

### Bible Version

For bibleVersion consider this JSON dataset example to modify ```getBibleVersion(n)``` function as needed.

```JSON
[
    {
        "codigo": "146",
        "shortName": "RVC",
        "file": "RVC.bblx",
        "name": "Reina Valera Contemporanea"
    },
    {
        "codigo": "411",
        "shortName": "DHH",
        "file": "DHH.bblx",
        "name": "Dios Habla Hoy"
    },
    {
        "codigo": "149",
        "shortName": "RV60",
        "file": "RV60.bblx",
        "name": "Reina Valera 1960"
    },
    {
        "codigo": "176",
        "shortName": "TLA",
        "file": "TLA.bblx",
        "name": "Traducción  Lenguaje Actual"
    },
    {
        "codigo": "128",
        "shortName": "NVI",
        "file": "NVI.bblx",
        "name": "Nueva Versión Internacional"
    },
    {
        "codigo": "150",
        "shortName": "RV95",
        "file": "RV95.bblx",
        "name": "Reina Valera 1995"
    },
    {
        "codigo": "197",
        "shortName": "PDT",
        "file": "PDT.bblx",
        "name": "Palabra de Dios para todos"
    }
]
```

### Verses

To query bible verses you could use one of the following sintaxes

* `{BookKey}.{Chapter}`
* `{BookKey}.{Chapter}.{verse}`
* `{BookKey}.{Chapter}.{initialVerse}-{finalVerse}`

For book Reference refer to the table below:
BookKey|BookName
---|:-------------:
GEN |Génesis
EXO |Éxodo
LEV |Levítico
NUM |Números
DEU |Deuteronomio
JOS |Josué
JDG |Jueces
RUT |Rut
1SA |1° Samuel
2SA |2° Samuel
1KI |1° Reyes
2KI |2° Reyes
1CH |1° Crónicas
2CH |2° Crónicas
EZR |Esdras
NEH |Nehemías
EST |Ester
JOB |Job
PSA |Salmos
PRO |Proverbios
ECC |Eclesiastés
SNG |Cantares
ISA |Isaías
JER |Jeremías
LAM |Lamentaciones
EZK |Ezequiel
DAN |Daniel
HOS |Oseas
JOL |Joel
AMO |Amós
OBA |Abdías
JON |Jonás
MIC |Miqueas
NAM |Nahúm
HAB |Habacuc
ZEP |Sofonías
HAG |Hageo
ZEC |Zacarías
MAL |Malaquías
MAT |Mateo
MRK |Marcos
LUK |Lucas
JHN |Juan
ACT |Hechos
ROM |Romanos
1CO |1° Corintios
2CO |2° Corintios
GAL |Gálatas
EPH |Efesios
PHP |Filipenses
COL |Colosenses
1TH |1° Tesalonicenses
2TH |2° Tesalonicenses
1TI |1° Timoteo
2TI |2° Timoteo
TIT |Tito
PHM |Filemón
HEB |Hebreos
JAS |Santiago
1PE |1° Pedro
2PE |2° Pedro
1JN |1° Juan
2JN |2° Juan
3JN |3° Juan
JUD |Judas
REV |Apocalipsis
