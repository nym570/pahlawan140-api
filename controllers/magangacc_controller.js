const {magangacc, magang, Sequelize } = require('../models/index');
const crypto = require("crypto");
const {rs, re} = require('./function/rr_function');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const {join} = require('path')
const fs = require('fs');
const rekomPath = join(__dirname,`../../pahlawan140/public/magang/rekomendasi`);
const ktmPath = join(__dirname,`../../pahlawan140/public/magang/ktm`);
const proposalPath = join(__dirname,`../../pahlawan140/public/magang/proposal`);
const path = join(__dirname,`../../pahlawan140/public/`);



const generateToken = (id) => {
  return jwt.sign({id }, "MagangDi3515");
};

let self = {};
self.upload = (req, res) => {
  
  if(req.files != null){
    
    const files = req.files;
    const errors = [];
      magang.findOne({
      where:{
        id: req.body.id
      }
    }).then((data) => {
      
      Object.entries(files).forEach(([key,value]) => {
        
         const UFileName = `${new Date().getTime()}-${value.name.replaceAll(" ", "-")}`;
         if(key=="rekomendasi"){
  if(data.rekomendasi!=null&&data.rekomendasi!=`magang/rekomendasi/${UFileName}`){
          fs.rmSync(join(path,data.rekomendasi), {
            force: true,
        });
        }
       
        value.mv(join(rekomPath,UFileName), (err) => {
          if (err) {
            errors.push(key)
          }
          console.log(key)
          console.log(value)
        magang.update({rekomendasi: `magang/rekomendasi/${UFileName}`}, {
          where:{
            id: req.body.id
          }
        })
      });
         }
         else if(key=="ktm"){
          if(data.ktm!=null&&data.ktm!=`magang/ktm/${UFileName}`){
            fs.rmSync(join(path,data.ktm), {
              force: true,
          });
          }
          value.mv(join(ktmPath,UFileName), (err) => {
            if (err) {
              errors.push(key)
            }
          magang.update({ktm: `magang/ktm/${UFileName}`}, {
            where:{
              id: req.body.id
            }
          })
        });
         }
         else if(key=="proposal"){
          if(data.proposal!=null&&data.proposal!=`magang/proposal/${UFileName}`){
            fs.rmSync(join(path,data.proposal), {
              force: true,
          });
          }
          value.mv(join(proposalPath,UFileName), (err) => {
            if (err) {
              errors.push(key)
            }
          magang.update({proposal: `magang/proposal/${UFileName}`}, {
            where:{
              id: req.body.id
            }
          })
        });
         }
         else{
          errors.push("tidak ada")
         }
      //   if(data.dokumen!=null&&data.dokumen!=`magang/${UFileName}`){
      //     fs.rmSync(join(path,data.dokumen), {
      //       force: true,
      //   });
      //   }
      //   file.mv(join(filePath,UFileName), (err) => {
      //     if (err) {
      //       re(res, err);
      //     }
      //   magang.update({dokumen: `magang/${UFileName}`}, {
      //     where:{
      //       id: req.body.id
      //     }
      //   })
      // });
      
        
      
      
      
      
    });
    rs(res, data);
    }).catch((err) => {
      re(res, err);
    });
  } 
  else{
    rs(res, "ok");
  }
};
self.regist = (req, res) => {
  bcrypt.hash(req.body.password, 10, function(error, hash) {
    if(error){
      re(res, err);
    }
    req.body.password = hash;
    req.body.verifyToken = crypto.randomBytes(64).toString("hex");
    magangacc.create(req.body).then((data) => {
    if(data){
      rs(res, data);
      const options = {
        from: 'BPS Sidoarjo',
        to: data.email,
        subject: "Verifikasi Akun Magang Pahlawan 140",
        message: data.verifyToken,
        nama: data.nama,
        template: 'verif'
    };
    sendEmail(options);
    }
    else{
      re(res, false, 400, 'create fail');
    }
  }).catch((err) => {
    re(res, err);
  });
});
 
};

self.login = (req, res) => {
  magangacc.findOne({
    where:{
      email: req.body.email
    }
  }).then((data) => {
    if(data){
      if(data.verifyAt==null){
        console.log('hai')
        re(res, "Akun Belum Verifikasi", 400);
      }
      else{
        bcrypt.compare(req.body.password, data.password, (err, status) => {
          if(err){
            re(res, err);
          }
          if(status){
            const token = generateToken(data.id)
            const nama = data.nama;

           rs(res, {token: token,nama:nama});
          }
          else{
            re(res, "password salah", 400);
          }
        })
      }
     
      
    }else{
      re(res, false, 400);
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.verifyEmail = (req, res) => {
  const emailToken = req.body.emailToken;
  if (!emailToken) {
    re(res, "token tidak ada", 400);
  }
  magangacc.findOne({
    where:{
      verifyToken: emailToken
    }
  }).then((data) => {
    if(data){
      magangacc.update({ verifyAt: Date.now()}, {
    
        where:{
          verifyToken: emailToken
        }
      })
    }else{
      re(res, "Data tidak ditemukan", 400);
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.get = (req, res) => {
  magangacc.findOne({
    where:{
      id: req.params.id
    },
    attributes: {exclude: ['password','verifyToken','verifyAt']},
  }).then((data) => {
    // kalau kita berhasil mendapatkan data maka akan menjalankan fungsi rs kalau sebaliknya maka akan menjalankan fungsi re
    if(data){
      rs(res, data);
    }else{
      re(res, 'tidak ditemukan', 404);
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.daftar = (req, res) => {
  magangacc.update({nama: req.body.nama, nim: req.body.nim, sekolah:req.body.sekolah, jurusan:req.body.jurusan, nohp: req.body.nohp}, {
    where:{
      id: req.params.id
    }
  }).then(() =>{
    magang.create({akun:req.params.id, mulai:req.body.mulai, selesai:req.body.selesai, status:req.body.status}).then((data) => {
      if(data){
        rs(res, data);
        const options = {
          from: 'BPS Sidoarjo',
          to: req.body.email,
          subject: "Pendaftaran Magang Berhasil",
          nama: req.body.nama,
          template: 'daftarm'
      };
      sendEmail(options);
      }
      else{
        re(res, 'gagal', 400);
      }
    })
  })
  .catch((err) => {
    re(res, err);
  });
};

self.getAll = (req, res) => {
  magang.findAll({
    order:[['updatedAt', 'DESC'],],
    include: [
      {
        model: magangacc,
        as:'magangaccs',
        attributes: {exclude: ['password','verifyToken','verifyAt']},
      }
      
    ],
    
  }).then((data) => {
    if(data.length > 0){
      rs(res, data);
    }else{
      re(res, 'database kosong', 404);
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.update = (req, res) => {
  
  magangacc.update({nama: req.body.nama, nim: req.body.nim, sekolah:req.body.sekolah, jurusan:req.body.jurusan, nohp: req.body.nohp}, {
    where:{
      id: req.body.akun
    }
  }).then(() =>{
    magang.update({ mulai:req.body.mulai, selesai:req.body.selesai},{where:{id:req.params.magangId}}).then((data) => {
      if(data){
        rs(res, data);
      }
      else{
        re(res, 'gagal', 400);
      }
    })
  })
  .catch((err) => {
    re(res, err);
  });
};

self.delete = (req, res) => {

  magang.findOne({
    where:{
      id: req.params.magangId
    }
  }).then((data) => {
    fs.rmSync(join(path,data.dokumen), {
      force: true,
  });
    magang.destroy({
      where:{
        id: req.params.magangId
      }
    })
    if(data){
      rs(res, data);
    }else{
      re(res, "gagal menghapus", 400);
    }
  }).catch((err) => {
    re(res, err);
  });
  
};

self.status = (req, res) => {
  magang.update({status: req.body.status}, {
    where:{
      id: req.params.magangId
    }
  }).then((data) => {
    if(data){
      rs(res, data);
      const options = {
        from: 'BPS Sidoarjo',
        to: req.body.email,
        subject: "Pendaftaran Magang : "+req.body.status,
        nama: req.body.nama,
        data: {status: req.body.status, mulai:req.body.mulai},
        template: 'status'
    };
    sendEmail(options);
    }else{
      re(res, 'gagal merubah status', 400);
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.getCountStatus = (req, res) => {
  magang.findAll({
    group: ['status'],
    attributes: ['status', [Sequelize.fn('COUNT', 'status'), 'statusCount']],
    
  }).then((data) => {
    if(data.length > 0){
      rs(res, data);
    }else{
      re(res, 'database kosong', 404);
    }
  }).catch((err) => {
    re(res, err);
  });
};

module.exports = self;