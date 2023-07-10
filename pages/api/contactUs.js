import axios from "axios";
import qs from 'qs';

const verifyRecaptcha = async (token) => {

  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  const verificationUrl =
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  // const encodedData = new URLSearchParams();
  // encodedData.append('secret', secretKey);
  // encodedData.append('response', token);

  return axios.post(
    verificationUrl, {
    },{
    headers: {
      'Content-Type': "application/x-www-form-urlencoded"
    }
  });
};

export default async function handler(req, res) {
  try {
    const gRecaptchaToken = req.body.gRecaptchaToken;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    // Recaptcha response
    const response = await verifyRecaptcha(gRecaptchaToken);

    // Checking if the response sent by reCaptcha success or not and if the score is above 0.5
    // In ReCaptcha v3, a score sent which tells if the data sent from front end is from Human or from Bots. If score above 0.5 then it is human otherwise it is bot
    // For more info check, https://developers.google.com/recaptcha/docs/v3
    // ReCaptcha v3 response, {
    //     "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
    //     "score": number             // the score for this request (0.0 - 1.0)
    //     "action": string            // the action name for this request (important to verify)
    //     "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    //     "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
    //     "error-codes": [...]        // optional
    //   }

    if (!response.data.success) {
      // axios
      //   .post("https://getform.io/f/c9a0111b-5cf1-4a2a-a27d-fb7beb55420f", {
      //       data: {email: email, subject: subject, message: message},
      //     },
      //     {
      //       // headers: {
      //       //   Accept: "application/json",
      //       //   "Content-Type": "application/json",
      //       //   "Access-Control-Allow-Origin": process.env.NEXTAUTH_URL,
      //       // }
      //     })
      //   .then(res => console.log(res))
      //   .catch(error => console.log(error));

    // if (req) {
      return res.json({
        req: response.data,
        email: req.body.email
      });
    } else {
      return res.json({
        status: "error",
        message: "ReCaptcha went wrong, please try again",
        // response: response,
        // email: email
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: "Something went wrong, please try again"
    });
  }
};
