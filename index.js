const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const fileUpload = require("express-fileupload")
const helpers = require('handlebars-helpers')();

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(fileUpload());


require('./routes/catLink.routes')(app, express);
require('./routes/link.routes')(app, express);
require('./routes/baca.routes')(app, express);
require('./routes/luki.routes')(app, express);
require('./routes/zirb.routes')(app, express);
require('./routes/layanan.routes')(app, express);
require('./routes/aplikasi.routes')(app, express);
require('./routes/sertifikat.routes')(app, express);
require('./routes/pegawai.routes')(app, express);
require('./routes/banner.routes')(app, express);
require('./routes/magangacc.routes')(app, express);
require('./routes/login.routes')(app, express);
require('./routes/video.routes')(app, express);
require('./routes/menu.routes')(app, express);
require('./routes/submenu.routes')(app, express);


module.exports = app;
app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})