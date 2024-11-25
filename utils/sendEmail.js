const nodeMailer = require("nodemailer")
const hbs = require('nodemailer-express-handlebars');
const path = require('path')
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "941617712501-1mpd079mmmg6ol2nfto3cabine0aksgv.apps.googleusercontent.com",
    "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",
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token:
      "1//04Dpflw_HbmbsCgYIARAAGAQSNwF-L9Ir26iHCbRVOHybCG9TaCPVXHW9tuuRlpGpWCJd_RWYeMV071BvkWdTbbXyKGOxaZFDszk"
  });
  
  const accessToken = oauth2Client.getAccessToken();

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: "pahlawan140.bps@gmail.com",
            clientId:
              "941617712501-1mpd079mmmg6ol2nfto3cabine0aksgv.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//04Dpflw_HbmbsCgYIARAAGAQSNwF-L9Ir26iHCbRVOHybCG9TaCPVXHW9tuuRlpGpWCJd_RWYeMV071BvkWdTbbXyKGOxaZFDszk",
            accessToken,
          },
        // auth: {
        //   user: "pahlawan140.bps@gmail.com",
        //   pass: "bexfcuoxskzllxnx",
        // },
    });
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    };
    transporter.use('compile', hbs(handlebarOptions))
    const mailOptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        template: options.template,
        context: {
            nama: options.nama,
            link: 'http://localhost:5173/konfirmasi?emailToken='+options.message,
            data: options.data,
        },
    };


    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
