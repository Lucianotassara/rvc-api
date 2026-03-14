# CLAUDE.md — AI Assistant Guide for rvc-api

## Project Overview

`rvc-api` is a lightweight Node.js REST API for querying Spanish Bible translations from SQLite databases. It provides verse lookup endpoints supporting multiple Bible versions (RVC, DHH, RV60, TLA, NVI, RV95, PDT) and flexible citation formats (single verse, verse range, entire chapter).

---

## Repository Structure

```
rvc-api/
├── rvcApi.js                    # Main entry point — Express server setup
├── ecosystem.config.js          # PM2 process management config (dev/prod)
├── post-receive                 # Git hook for automated deployment
├── .env.sample                  # Environment variable template
├── package.json                 # Dependencies and scripts
├── controller/
│   ├── index.js                 # Controller exports
│   └── biblia.controller.js     # Core route logic and DB queries
├── consts/
│   ├── bibleVersions.js         # Bible version definitions + lookup function
│   └── libros.js                # All 66 Bible books + abbreviation lookup
└── bibles/
    └── README.md                # Instructions for adding .bblx DB files
```

---

## Development Setup

### Prerequisites
- Node.js (tested with the version compatible with `esm` ^3.2.25)
- SQLite `.bblx` database files (not included in repo — must be provided separately)

### Installation

```bash
npm install
cp .env.sample .env
# Edit .env with correct values
```

### Environment Variables

| Variable          | Description                                | Default  |
|-------------------|--------------------------------------------|----------|
| `BIBLE_API_PORT`  | Port the server listens on                 | `3002`   |
| `SQLITE_DB_PATH`  | Absolute path to directory with .bblx files| required |

**Note:** The `.env.sample` uses `portBibleApi` but the code reads `BIBLE_API_PORT`. Stick to `BIBLE_API_PORT` in your `.env`.

### Running the Server

```bash
npm start       # Production
npm run dev     # Development with nodemon auto-reload
```

Both commands use `node -r esm` to enable ES6 module syntax.

---

## API Endpoints

### `GET /`
Redirects to `https://encuentrovida.com.ar`.

### `GET /help`
Returns a JSON usage guide listing available Bible versions and book abbreviations.

### `GET /:version/:cita`
Main query endpoint.

**Parameters:**
- `version` — Bible version code or numeric ID
  - By short name: `RVC`, `DHH`, `RV60`, `TLA`, `NVI`, `RV95`, `PDT`
  - By numeric ID: `146` (RVC), `411` (DHH), `157` (RV60), `167` (TLA), `114` (NVI), `185` (RV95), `195` (PDT)
- `cita` — Citation reference in format `BOOK.CHAPTER` or `BOOK.CHAPTER.VERSE` or `BOOK.CHAPTER.START-END`

**Citation Examples:**
| Format                    | Example        | Description         |
|---------------------------|----------------|---------------------|
| `{BOOK}.{CHAPTER}`        | `JHN.3`        | Entire chapter      |
| `{BOOK}.{CHAPTER}.{VERSE}`| `JHN.3.16`     | Single verse        |
| `{BOOK}.{CHAPTER}.{S}-{E}`| `JHN.3.16-18`  | Verse range         |

**Success Response (200):**
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

**Error Responses:**
- `402` — Invalid or unrecognized Bible version
- `404` — No verses found for citation
- `400` — Database error

---

## Codebase Conventions

### Module System
The project uses **ES6 `import`/`export` syntax** throughout, enabled at runtime via the `esm` package. Do not mix in CommonJS `require()` calls in new code.

### Code Style
- No linting or formatting tools configured — follow the existing style
- Async database calls use **callbacks** (sqlite3 style), not `async/await`
- Keep route logic in `controller/biblia.controller.js`
- Keep constants/lookups in `consts/`

### Error Handling
- Return JSON error objects, never plain text
- Use appropriate HTTP status codes (see above)
- Database errors go to the Express error middleware via `next(err)`

### Data Flow
1. Request hits route `/:version/:cita`
2. `getBibleVersion()` maps the version param to a `.bblx` filename
3. Citation string is parsed into book short name, chapter, and verse range
4. `bookNumber()` maps book abbreviation to numeric book ID
5. SQLite query runs against the correct `.bblx` file
6. RTF-formatted scripture text is stripped to plain text
7. JSON response is assembled and returned

### RTF Stripping
Scripture text from the database contains RTF markup. The controller strips it using regex before returning responses. If adding new endpoints, apply the same stripping logic.

---

## Database

### Format
- SQLite files with `.bblx` extension
- Single table: `Bible`
- Columns: `Book` (int), `Chapter` (int), `Verse` (int), `Scripture` (text)

### Adding a New Bible Version
1. Place the `.bblx` file in the directory specified by `SQLITE_DB_PATH`
2. Add an entry to `BIBLE_VERSIONS` in `consts/bibleVersions.js`
3. Update the `getBibleVersion(n)` function to handle the new version's shortName and numeric ID

---

## Deployment

The project uses **PM2** for process management and a **git post-receive hook** for deployment.

### PM2
Configuration is in `ecosystem.config.js`. The app runs as `rvc-api` with a 1GB memory limit.

```bash
pm2 start ecosystem.config.js --env prod   # Production
pm2 start ecosystem.config.js --env desa   # Development
```

### Git Hook
`post-receive` automates deployment on push to the server:
1. Checks out `master`
2. Runs `npm install`
3. Restarts the PM2 process

---

## Testing

**There is no test suite.** No testing framework is currently configured. When adding tests:
- Recommended: Jest or Mocha + Chai
- Test files should go in a `test/` or `__tests__/` directory
- Add a `test` script to `package.json`
- Key areas to cover: citation parsing, book/version lookup functions, endpoint responses

---

## Key Files Quick Reference

| File | Purpose |
|------|---------|
| `rvcApi.js` | Server init, middleware setup, route mounting, error handler |
| `controller/biblia.controller.js` | Route handlers, DB queries, response assembly |
| `consts/bibleVersions.js` | `BIBLE_VERSIONS` array, `getBibleVersion(n)` lookup |
| `consts/libros.js` | `BIBLE_BOOKS` array, `bookNumber(shortName)` lookup |
| `ecosystem.config.js` | PM2 config for dev/prod environments |
| `.env.sample` | Environment variable template |
| `bibles/README.md` | Instructions for adding SQLite database files |

---

## Common Tasks

### Add a New Endpoint
1. Define the route in `controller/biblia.controller.js`
2. Export via `controller/index.js` if needed
3. Mount in `rvcApi.js` if using a new router

### Add a New Bible Book Abbreviation
Edit `consts/libros.js` — add to the `BIBLE_BOOKS` array and ensure `bookNumber()` covers it.

### Change the Default Port
Set `BIBLE_API_PORT` in your `.env` file.

### Debug Database Issues
Check that `SQLITE_DB_PATH` points to the correct directory and that the `.bblx` files exist and are readable. The controller opens a new SQLite connection per request — connection errors are returned as `400` responses.
