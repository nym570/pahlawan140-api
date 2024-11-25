const {submenu, Sequelize } = require('../models/index');
const {rs, re} = require('./function/rr_function');


let self = {};

self.save = (req, res) => {
  submenu.create(req.body).then((data) => {
    if(data){
      rs(res, data);
    }
    else{
      re(res, false, 400, 'create fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};


self.getAll = (req, res) => {
  submenu.findAll({
    include: [
      'menus'
    ]
  }).then((data) => {
    if(data.length > 0){
      rs(res, data);
    }else{
      re(res, false, 404, 'database empty');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.get = (req, res) => {
  link.findOne({
    include: [
      'menus'
    ],
    where:{
      id: req.params.subId
    }
  }).then((data) => {
    // kalau kita berhasil mendapatkan data maka akan menjalankan fungsi rs kalau sebaliknya maka akan menjalankan fungsi re
    if(data){
      rs(res, data);
    }else{
      re(res, false, 404, 'id doesnt exist');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.getMenu = (req, res) => {
  submenu.findAll({
    include: [
      'menus'
    ],
    where:{
      segmen: req.params.subId
    }
  }).then((data) => {
    if(data){
      rs(res, data);
    }else{
      re(res, false, 404, 'id doesnt exist');
    }
  }).catch((err) => {
    re(res, err);
  });
};


self.update = (req, res) => {
  submenu.update(req.body, {
    where:{
      id: req.params.subId
    }
  }).then((data) => {
    if(data){
      rs(res, data);
    }else{
      re(res, false, 400, 'update fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.delete = (req, res) => {
  submenu.destroy({
     where:{
       id: req.params.subId
     }
   }).then((data) => {
     if(data){
       rs(res, data);
     }else{
       re(res, false, 400, 'delete fail');
     }
   }).catch((err) => {
     re(res, err);
   });
 };

module.exports = self;