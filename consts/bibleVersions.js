export const BIBLE_VERSIONS = [
    {
        "id": 146,
        "shortName": "RVC",
        "file": "RVC.bblx",
        "name": "Reina Valera Contemporanea"
    },
    {
        "id": 411,
        "shortName": "DHH",
        "file": "DHH.bblx",
        "name": "Dios Habla Hoy"
    },
    {
        "id": 149,
        "shortName": "RV60",
        "file": "RV60.bblx",
        "name": "Reina Valera 1960"
    },
    {
        "id": 176,
        "shortName": "TLA",
        "file": "TLA.bblx",
        "name": "Traducción  Lenguaje Actual"
    },
    {
        "id": 128,
        "shortName": "NVI",
        "file": "NVI.bblx",
        "name": "Nueva Versión Internacional"
    },
    {
        "id": 150,
        "shortName": "RV95",
        "file": "RV95.bblx",
        "name": "Reina Valera 1995"
    },
    {
        "id": 197,
        "shortName": "PDT",
        "file": "PDT.bblx",
        "name": "Palabra de Dios para todos"
    }
]

export function getBibleVersion(n) {
    switch (n.toUpperCase()) {
        // Ingreso con version
        case 'RVC': return { "ruta": "RVC.bblx", "id": "146", "version": "RVC" }
        case 'DHH': return { "ruta": "DHH.bblx", "id": "411", "version": "DHH" }
        case 'RV60': return { "ruta": "RV60.bblx", "id":"149", "version": "RV60" }
        case 'TLA': return { "ruta": "TLA.bblx", "id": "176", "version": "TLA" }
        case 'NVI': return { "ruta": "NVI.bblx", "id": "128", "version": "NVI" }
        case 'RV95': return { "ruta": "RV95.bblx", "id":"150", "version": "RV95" }
        case 'PDT': return { "ruta": "PDT.bblx", "id": "197", "version": "PDT" }
        
        // Ingreso con id
        case '146': return { "ruta": "RVC.bblx", "id": "146", "version": "RVC" }
        case '411': return { "ruta": "DHH.bblx", "id": "411", "version": "DHH" }
        case '149': return { "ruta": "RV60.bblx", "id":"149",  "version": "RV60" }
        case '176': return { "ruta": "TLA.bblx", "id": "176", "version": "TLA" }
        case '128': return { "ruta": "NVI.bblx", "id": "128", "version": "NVI" }
        case '150': return { "ruta": "RV95.bblx", "id":"150",  "version": "RV95" }
        case '197': return { "ruta": "PDT.bblx", "id": "197", "version": "PDT" }
        
        default: return {'error': true}
        // retornar default cuando no se reconoce la versión para que no falle.
    }
  }