const accountSid = 'ACdab5e7cff17da7e2cbd4caddf782ea31'; //
const authToken = '3429993f575f25d528d16af64855643f'; //08ac6601b9797b4d4d6f4688f4a84c05
const client = require('twilio')(accountSid, authToken);
var Consent = require('../model/constant.js');

module.exports = {



    sendOtp: (req, res) => {
        var FirstName = req.body.FirstName;
        var LastName = req.body.LastName;
        var UserNumber = req.body.UserNumber;

        var generateOTP = Math.floor(100000 + Math.random() * 900000);
        console.log("otp", generateOTP);
        var obj = {
            otp: generateOTP,
            mobileNumber: UserNumber,
            FirstName: FirstName,
            LastName: LastName,
            createdAt: Date.now()
        }
        Consent.create(obj,(err,result) => {
          console.log(err,result)
            if (err) {
                return res.json({
                    status: 400,
                    message: "something went wrong from db"
                })
            } else if (result) {
                client.messages.create({
                    body: 'Your otp to verify:' + generateOTP,
                    from: '+14053584187',
                    to: UserNumber
                }, function(error, send) {
                    console.log('Send::', send);
                    if (err) return res.send({
                        status: 400,
                        message: "failed to send otp!",
                        error: error
                    });
                    else {
                        return res.send({
                            status: 200,
                            message: "Please Verify your OTP!.",generateOTP,
                            data: result
                        });
                    }
                });
            } else {
                return res.json({
                    status: 401,
                    message: "something went wrong"
                })
            }
        })
    },

    sent: (req, res) => {
        Consent.find({}, (err, result) => {
            if (err) {
                return res.json({
                    status: 400,
                    message: "unable to fetch data"
                })
            } else {
                if (result) {
                    var data = result.reverse();
                    console.log("data----", data);
                    return res.json({
                        status: 200,
                        data: data
                    })
                }
            }
        })
    },

    userProfile: (req, res) => {
        var obj = {
            FirstName: req.body.firstName,
            LastName: req.body.lastName
        }
        Consent.findOne(obj, (err, result) => {
            console.log("data--------", err, result);
            if (err) {
                return res.json({
                    status: 400,
                    message: "unable to fetch data"
                })
            } else {
                if (result) {
                    return res.json({
                        status: 200,
                        data: result
                    })
                }
            }
        })
    },

}
