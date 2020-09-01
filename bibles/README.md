### Put yor SQLite databases here.

SQLITE databeses are not stored in this repo. You will need to add yours.

The structure of the DB is only one table named "Bible", with 4 columns:

* Book _(int)_
* Chapter _(int)_
* Verse _(int)_
* Scripture _(text)_

Once placed your databases, consider updating the `consts/bibleVersions.js` array.


### Bible Version

For bibleVersion consider updating this function ``` getBibleVersion(n)``` on ```consts/bibleVersions.js ``` as needed.

```javascript
export function getBibleVersion(n) {
    switch (n) {
      case 146: return { "ruta": "RVC.bblx", "version": "RVC" }
      case 411: return { "ruta": "DHH.bblx", "version": "DHH" }
      case 149: return { "ruta": "RV60.bblx", "version": "RV60" }
      case 176: return { "ruta": "TLA.bblx", "version": "TLA" }
      case 128: return { "ruta": "NVI.bblx", "version": "NVI" }
      case 150: return { "ruta": "RV95.bblx", "version": "RV95" }
      case 197: return { "ruta": "PDT.bblx", "version": "PDT" }
    }
  }
```