const {layanan, Sequelize } = require('../models/index');
const {rs, re} = require('./function/rr_function');
const {join} = require('path')
const fs = require('fs');

let self = {};

self.save = (req, res) => {
  layanan.create(req.body).then((data) => {
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
  layanan.findAll().then((data) => {
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
  layanan.findOne({
    where:{
      id: req.params.layananId
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

self.update = (req, res) => {
  layanan.update(req.body, {
    where:{
      id: req.params.layananId
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
  layanan.destroy({
    where:{
      id: req.params.layananId
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