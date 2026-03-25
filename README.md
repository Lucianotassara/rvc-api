# rvc-api

API REST en Node.js para consultar versículos de la Biblia en español desde bases de datos SQLite. Soporta múltiples versiones bíblicas y formatos de cita flexibles.

## Versiones disponibles

| ID  | Código | Nombre completo                  |
|-----|--------|----------------------------------|
| 146 | RVC    | Reina Valera Contemporánea       |
| 411 | DHH    | Dios Habla Hoy                   |
| 149 | RV60   | Reina Valera 1960                |
| 176 | TLA    | Traducción Lenguaje Actual       |
| 128 | NVI    | Nueva Versión Internacional      |
| 150 | RV95   | Reina Valera 1995                |
| 197 | PDT    | Palabra de Dios para Todos       |

## Requisitos

- Node.js >= 24
- Archivos de base de datos SQLite `.bblx` (no incluidos en el repo)

## Instalación

```bash
npm install
cp .env.sample .env
# Editar .env con los valores correctos
```

### Variables de entorno

| Variable         | Descripción                                        | Default |
|------------------|----------------------------------------------------|---------|
| `BIBLE_API_PORT` | Puerto en el que escucha el servidor               | `3002`  |
| `SQLITE_DB_PATH` | Ruta absoluta al directorio con los archivos .bblx | —       |

Ejemplo de `.env`:
```
BIBLE_API_PORT=3002
SQLITE_DB_PATH=/home/user/rvc-api/bibles/
```

### Bases de datos

Colocar los archivos `.bblx` en el directorio indicado por `SQLITE_DB_PATH`. Cada archivo corresponde a una versión bíblica (ej: `RVC.bblx`, `NVI.bblx`).

La estructura esperada de cada base de datos es una tabla `Bible` con las columnas:

| Columna     | Tipo |
|-------------|------|
| `Book`      | int  |
| `Chapter`   | int  |
| `Verse`     | int  |
| `Scripture` | text |

Ver `bibles/README.md` para más detalles.

## Uso

```bash
npm start       # Producción
npm run dev     # Desarrollo con auto-recarga (nodemon)
```

## Endpoints

### `GET /`
Redirige a `https://encuentrovida.com.ar`.

### `GET /help`
Devuelve un JSON con las versiones disponibles y las abreviaturas de los libros.

### `GET /:version/:cita`
Consulta principal de versículos.

**Parámetros:**
- `version` — Código o ID numérico de la versión (ej: `RVC`, `146`)
- `cita` — Referencia en formato `LIBRO.CAPITULO`, `LIBRO.CAPITULO.VERSICULO` o `LIBRO.CAPITULO.INICIO-FIN`

**Ejemplos:**

| URL                    | Resultado                        |
|------------------------|----------------------------------|
| `/RVC/JHN.3`           | Juan capítulo 3 completo (RVC)   |
| `/RVC/JHN.3.16`        | Juan 3:16 (RVC)                  |
| `/146/JHN.3.16-18`     | Juan 3:16-18 (RVC, por ID)       |
| `/NVI/ROM.8.28`        | Romanos 8:28 (NVI)               |

**Respuesta exitosa (200):**
```json
{
  "book": 43,
  "bookShortName": "JHN",
  "bookDisplayName": "Juan",
  "chapter": "3",
  "verse": "16-18",
  "scripture": "Porque de tal manera amó Dios al mundo...",
  "cita": "Juan 3:16-18 (RVC)",
  "version": "RVC"
}
```

**Errores:**

| Código | Motivo                                        |
|--------|-----------------------------------------------|
| `402`  | Versión bíblica no reconocida                 |
| `404`  | Cita no encontrada en la base de datos        |
| `400`  | Error de base de datos                        |

## Abreviaturas de libros

<details>
<summary>Antiguo Testamento</summary>

| Libro          | Abreviatura |
|----------------|-------------|
| Génesis        | GEN         |
| Éxodo          | EXO         |
| Levítico       | LEV         |
| Números        | NUM         |
| Deuteronomio   | DEU         |
| Josué          | JOS         |
| Jueces         | JDG         |
| Rut            | RUT         |
| 1° Samuel      | 1SA         |
| 2° Samuel      | 2SA         |
| 1° Reyes       | 1KI         |
| 2° Reyes       | 2KI         |
| 1° Crónicas    | 1CH         |
| 2° Crónicas    | 2CH         |
| Esdras         | EZR         |
| Nehemías       | NEH         |
| Ester          | EST         |
| Job            | JOB         |
| Salmos         | PSA         |
| Proverbios     | PRO         |
| Eclesiastés    | ECC         |
| Cantares       | SNG         |
| Isaías         | ISA         |
| Jeremías       | JER         |
| Lamentaciones  | LAM         |
| Ezequiel       | EZK         |
| Daniel         | DAN         |
| Oseas          | HOS         |
| Joel           | JOL         |
| Amós           | AMO         |
| Abdías         | OBA         |
| Jonás          | JON         |
| Miqueas        | MIC         |
| Nahúm          | NAM         |
| Habacuc        | HAB         |
| Sofonías       | ZEP         |
| Hageo          | HAG         |
| Zacarías       | ZEC         |
| Malaquías      | MAL         |

</details>

<details>
<summary>Nuevo Testamento</summary>

| Libro              | Abreviatura |
|--------------------|-------------|
| Mateo              | MAT         |
| Marcos             | MRK         |
| Lucas              | LUK         |
| Juan               | JHN         |
| Hechos             | ACT         |
| Romanos            | ROM         |
| 1° Corintios       | 1CO         |
| 2° Corintios       | 2CO         |
| Gálatas            | GAL         |
| Efesios            | EPH         |
| Filipenses         | PHP         |
| Colosenses         | COL         |
| 1° Tesalonicenses  | 1TH         |
| 2° Tesalonicenses  | 2TH         |
| 1° Timoteo         | 1TI         |
| 2° Timoteo         | 2TI         |
| Tito               | TIT         |
| Filemón            | PHM         |
| Hebreos            | HEB         |
| Santiago           | JAS         |
| 1° Pedro           | 1PE         |
| 2° Pedro           | 2PE         |
| 1° Juan            | 1JN         |
| 2° Juan            | 2JN         |
| 3° Juan            | 3JN         |
| Judas              | JUD         |
| Apocalipsis        | REV         |

</details>

## Deployment

El proyecto usa **PM2** para gestión de procesos y un **git hook** para despliegue automático.

```bash
pm2 start ecosystem.config.cjs --env prod   # Producción
pm2 start ecosystem.config.cjs --env desa   # Desarrollo
```

El hook `post-receive` automatiza el deploy al hacer push al servidor: hace checkout de `master`, ejecuta `npm install` y reinicia el proceso PM2.
