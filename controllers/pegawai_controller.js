const {pegawai, Sequelize } = require('../models/index');
const {rs, re} = require('./function/rr_function');
const {join} = require('path')
const fs = require('fs');
const filePath = join(__dirname,`../../pahlawan140/public/image/Pegawai/`);
const path = join(__dirname,`../../pahlawan140/public/`);

let self = {};

self.save = (req, res) => {
  pegawai.create(req.body).then((data) => {
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

self.upload = (req, res) => {
  if(req.files != null){
    const file = req.files.gambar;
    const UFileName = `${new Date().getTime()}-${file.name.replaceAll(" ", "-")}`;
    
      pegawai.findOne({
      where:{
        id: req.body.id
      }
    }).then((data) => {
      if(data.gambar!=null&&data.gambar!=`image/Pegawai/${UFileName}`){
        fs.rmSync(join(path,data.gambar), {
          force: true,
      });
      }
      file.mv(join(filePath,UFileName), (err) => {
        if (err) {
          re(res, err);
        }
      pegawai.update({gambar: `image/Pegawai/${UFileName}`}, {
        where:{
          id: req.body.id
        }
      })
      rs(res, data);
      
    });
    }).catch((err) => {
      re(res, err);
    });
  } 
  else{
    rs(res, "ok");
  }
 
  
};

self.getAll = (req, res) => {
  pegawai.findAll({order: ['urutan']}).then((data) => {
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
  pegawai.findOne({
    where:{
      id: req.params.pegawaiId
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
  pegawai.update(req.body, {
    where:{
      id: req.params.pegawaiId
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
  pegawai.findOne({
    where:{
      id: req.params.pegawaiId
    }
  }).then((data) => {
    fs.rmSync(join(path,data.gambar), {
      force: true,
  });
    pegawai.destroy({
      where:{
        id: req.params.pegawaiId
      }
    })
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