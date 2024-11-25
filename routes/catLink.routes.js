// const express = require('express');
// const router = express.Router();
// const { body, validationResult } = require('express-validator');

// const connection = require('../config/database');

// router.get('/',  (req, res) => {

//     connection.query('SELECT * FROM cat_links ORDER BY id asc',(err, rows) => {
//         if (err) {
//             return res.status(500).json({
//                 status: false,
//                 message: 'Internal Server Error',
//             })
//         } else {
//             return res.status(200).json({
//                 status: true,
//                 message: 'List Data Kategori Links',
//                 data: rows
//             })
//         }
//     });
// });


// router.post('/store', [

//     body('judul').notEmpty(),
//     body('deskripsi').notEmpty(),

// ], (req, res) => {

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(422).json({
//             errors: errors.array()
//         });
//     }

//     let formData = {
//         judul: req.body.judul,
//         deskripsi: req.body.deskripsi,
//     }

//     connection.query('INSERT INTO cat_links SET ?', formData, (err, rows) => {
//         if (err) {
//             return res.status(500).json({
//                 status: false,
//                 message: 'Internal Server Error',
//             })
//         } else {
//             return res.status(201).json({
//                 status: true,
//                 message: 'Insert Data Successfully',
//                 data: rows[0]
//             })
//         }
//     })

// });


// router.get('/:id', (req, res) => {

//     const {id} = req.params;

//     connection.query(`SELECT * FROM cat_links WHERE id = ${id}`, function (err, rows) {

//         if (err) {
//             return res.status(500).json({
//                 status: false,
//                 message: 'Internal Server Error',
//             })
//         }

//         if (rows.length <= 0) {
//             return res.status(404).json({
//                 status: false,
//                 message: 'Data Kategori Links Not Found!',
//             })
//         }

//         else {
//             return res.status(200).json({
//                 status: true,
//                 message: 'Detail Data Kategori Link',
//                 data: rows[0]
//             })
//         }
//     })
// });


// router.patch('/update/:id', [

//     body('judul').notEmpty(),
//     body('deskripsi').notEmpty()

// ], (req, res) => {

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(422).json({
//             errors: errors.array()
//         });
//     }

//     let id = req.params.id;

//     let formData = {
//         judul: req.body.judul,
//         deskripsi: req.body.deskripsi,
//     }

//     connection.query(`UPDATE cat_links SET ? WHERE id = ${id}`, formData, function (err, rows) {
//         if (err) {
//             return res.status(500).json({
//                 status: false,
//                 message: 'Internal Server Error',
//             })
//         } else {
//             return res.status(200).json({
//                 status: true,
//                 message: 'Update Data Successfully!'
//             })
//         }
//     })

// });

//  router.delete('/delete/(:id)', function(req, res) {

//     let id = req.params.id;
     
//     connection.query(`DELETE FROM cat_links WHERE id = ${id}`, function(err, rows) {
//         if (err) {
//             return res.status(500).json({
//                 status: false,
//                 message: 'Internal Server Error',
//             })
//         } else {
//             return res.status(200).json({
//                 status: true,
//                 message: 'Delete Data Successfully!',
//             })
//         }
//     })
// });

// module.exports = router;

module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/catLink_controller');
    const verifyUser = require('../middleware/adminMiddleware');
    router.get('/', controller.getAll);
    router.post('/',verifyUser, controller.save);
    router.get('/get/:catLinkId', controller.get);
    router.put('/update/:catLinkId',verifyUser, controller.update);
    router.delete('/delete/:catLinkId',verifyUser, controller.delete);
  
    app.use('/api/segmen-link/', router);
  }
