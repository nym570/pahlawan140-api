const {link, Sequelize } = require('../models/index');
const {rs, re} = require('./function/rr_function');
const {join} = require('path')
const fs = require('fs');
const filePath = join(__dirname,`../../pahlawan140/public/image/link/`);
const path = join(__dirname,`../../pahlawan140/public/`);

let self = {};

self.save = (req, res) => {
  link.create(req.body).then((data) => {
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
    if(file.mimetype.startsWith('image/')){
      
    }
    const UFileName = `${new Date().getTime()}-${file.name.replaceAll(" ", "-")}`;
    
      link.findOne({
      where:{
        id: req.body.id
      }
    }).then((data) => {
      if(data.gambar!=null&&data.gambar!=`image/link/${UFileName}`){
        fs.rmSync(join(path,data.gambar), {
          force: true,
      });
      }
      file.mv(join(filePath,UFileName), (err) => {
        if (err) {
          re(res, err);
        }
      link.update({gambar: `image/link/${UFileName}`}, {
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
  link.findAll({
    include: [
      'catlinks'
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
      'catlinks'
    ],
    where:{
      id: req.params.linkId
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

self.getSegmen = (req, res) => {
  link.findAll({
    include: [
      'catlinks'
    ],
    where:{
      segmen: req.params.segmenId
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
  link.update(req.body, {
    where:{
      id: req.params.linkId
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
  link.findOne({
    where:{
      id: req.params.linkId
    }
  }).then((data) => {
    fs.rmSync(join(path,data.gambar), {
      force: true,
  });
    link.destroy({
      where:{
        id: req.params.linkId
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