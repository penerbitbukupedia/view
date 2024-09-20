# view
PDF Viewer dengan inputan hash berupa url get dengan token login

```js
let urlspi=backend.project.downloadspi+btoa(pathURLDoc);
let urllampiran=backend.project.downloaddraft+btoa(pathURLDoc);
let hashview=urlspi+"&&"+urllampiran;
window.open("https://naskah.bukupedia.co.id/view/#"+btoa(hashview));
```
