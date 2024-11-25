'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('catLinks', [{
         judul: 'Kepegawaian',
         deskripsi: 'Solusi digital yang dirancang untuk mengoptimalkan berbagai aspek pengelolaan sumber daya manusia dalam organisasi BPS Sidoarjo.'
       },
      {
        judul: 'Keuangan',
        deskripsi: 'Membantu organisasi dalam mengelola keuangan secara efektif dan efisien. Mencakup berbagai fitur yang memungkinkan pengguna untuk melakukan berbagai laporan keuangan' 
      },
      {
        judul: 'Administrasi',
        deskripsi: 'Sistem informasi yang membantu organisasi dalam mengelola berbagai tugas administratif menjadi lebih efisien dan terorganisir.' 
      }
    ], {});
    //   await queryInterface.bulkInsert('links', [{
    //     judul: 'Lapor SPT',
    //     deskripsi: 'abcde',
    //     segmen: 1,
    //     link: 'Lapor SPT',
    //     gambar: '/image/smart.png'
    //   },
    //  {
    //   judul: 'BAST',
    //   deskripsi: 'hahahaha',
    //   segmen: 1,
    //   link: 'BAST',
    //   gambar: '/image/bast.png'
    //  },
    //  {
    //   judul: 'BOS',
    //   deskripsi: 'yey',
    //   segmen: 2,
    //   link: 'BOS',
    //   gambar: '/image/bos.png'
    //  }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('catLinks', null, {});
    await queryInterface.bulkDelete('links', null, {});
  }
};
