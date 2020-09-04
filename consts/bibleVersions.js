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
    switch (n) {
        // Ingreso con codigo letras
        case 'RVC': return { "ruta": "RVC.bblx", "version": "RVC" , "id": "146"}
        case 'DHH': return { "ruta": "DHH.bblx", "version": "DHH" , "id": "411"}
        case 'RV60': return { "ruta": "RV60.bblx",  "version": "RV60" , "id":"149"}
        case 'TLA': return { "ruta": "TLA.bblx", "version": "TLA" , "id": "176"}
        case 'NVI': return { "ruta": "NVI.bblx", "version": "NVI" , "id": "128"}
        case 'RV95': return { "ruta": "RV95.bblx",  "version": "RV95" , "id":"150"}
        case 'PDT': return { "ruta": "PDT.bblx", "version": "PDT" , "id": "197"}
        
        // Ingreso con codigo numeros
        case '146': return { "ruta": "RVC.bblx", "version": "RVC" }
        case '411': return { "ruta": "DHH.bblx", "version": "DHH" }
        case '149': return { "ruta": "RV60.bblx", "version": "RV60" }
        case '176': return { "ruta": "TLA.bblx", "version": "TLA" }
        case '128': return { "ruta": "NVI.bblx", "version": "NVI" }
        case '150': return { "ruta": "RV95.bblx", "version": "RV95" }
        case '197': return { "ruta": "PDT.bblx", "version": "PDT" }
        
    }
  }