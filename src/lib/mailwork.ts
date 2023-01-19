import nodemailer from "nodemailer";

const credentials = {
  type: "service_account",
  project_id: "psychic-binder-372807",
  private_key_id: "bc76b215fd3fc381353888ec1cfedb078f466f4f",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCfUoKhlgAb02zJ\nPt1YmKBlKCpmNpxZeROF5VyNjiQMiZWss0I5/JQxc2GHU8Xv/tO6f9LluwfKLLBZ\nRbKmRx5tWkGlQCEFTc0pV0AX2knnq9L6qM1eFCzYcOMviXHjh6m/h1GDXgfoxcZV\nHEwO2FUzVQy2b4H9We3BlpqWvGdvy5/BfHn+6N63YZ6bw05Ox1ZgtEooAOR3yKf8\nKxEZnKd6en7m15YORezAAp91W0XwpwGww+kQp1K70U014dsaqcEuvMnMFJo0FEBw\nX0nanDaEBq1V9jtM14nUs/HQupf7aPN8UqKBDIbvTtGfu/+Jggo4Ib3JAvxq2q2m\nurjmVsGjAgMBAAECggEAJuz11Zzcce/6CEE/u0GvDof9s/Nrx8B5MKGVN1CfJiEH\nXKZ/a8N2QY67KWEiXzyXZl2MnWxQvuikPWt19oIxwO3oVAOTDcSwd4VFt44xuFSW\nu386jd3IBymtmBOwq7KdmpnpJHt42zpW9rxvKMFaL6x76qbbz5aFLGMraeCmNP3c\nM0ocWVM54f0bdAYdMj0j2XClg6oJAVPFD0ykbGJt3vUKkbEwWwi/e0xtaLfJ7guk\nSOBWPHUxD8He8Tv+oTIlbk0XfMKD//vWsdl4LqyQDM4Syms0vA1AtZQCOOSCrygt\ntkiXkSzbzj5yGj+/J2c6TepASdhB86aCTBlrHCjDYQKBgQDWK0E1/DA3difKMuwb\nF9DGwJHoD2JWYoVlrY0HU7EpA5pupnvXAuB7kvn3I9ERp5e7peE0du2J5KcXsuRR\nlvChqz4cDapoDSQybHcCQwopaeMZPFVG4UXWVcn+b5FoFlOSeQBfSZ3HehVmKXSt\nM36d7ZqcJdMSpUgifXjdlnoK/wKBgQC+cNi4qwzDT3B8VFnVpbDR5wyXnnppUiH3\nPgbLyYUBvFg0d+/DMqUpfCTZWfZeZoQ0YiuPn55TJ1BYYT2eiSWLM6RyHGRtlmig\nHmGADzZ+BQA4MXNvOE/Rggk599omLfFsjIaLtbsnpm5uM2tN33jgJ2jIbD5enRVb\nuyLqop49XQKBgQCgwvM+PMFMwGp5wuOsKqJSrrZXRUUBpw6PFkkoWNBBAy1nJZ0L\n9mLfH6J2uvHymKSy/H8hzKvduD8c8PGltPGHyWzjzfY+CK9FEln63qvADnWjucAh\nZnPvwZHQZZr2UNwGtMFsxWukEqYBe9jTMjY3AeXulA3ujxaonRqe6pdNrQKBgHbo\nTuk/JADvIPUAVfcoNXdaJGqm8RfByKNvfx7O/NVQnGJmYLYocSet8/QiT8oxiGqM\nwVYz+88/xNLqJGdQiriXzh3RzIMAXuNbFNW4qfWVecWcWs8fAfd2kfw33WXpWczF\nEV06Y1kmed0lDeLZnceX070QmQDKZAOanPqT/umhAoGAfvz7xv6HaiyERdeFpb4h\nzJYLEtj4XJFxBd3ukHy38V7fdsmQ14U2QA5oQa2ybL5llpapvkkt9g1x+2TPV1qt\nU6culzfafcXyNus83OMLhZuK2exonqtow7t83ZVijA0nmCzwJyFdOQUm2nlibNSy\nHNhPrOKMtozF7WPMmtM6dAA=\n-----END PRIVATE KEY-----\n",
  client_email: "mailing-service@psychic-binder-372807.iam.gserviceaccount.com",
  client_id: "105957543191790263723",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/mailing-service%40psychic-binder-372807.iam.gserviceaccount.com",
};

const mailWork = async (to: string, name: string, UPI: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "esummit@snu.edu.in",
      pass: "oayzcjekigkicdjd",
    },
  });

  const mailOptions = {
    from: "esummit@snu.edu.in",
    to,
    subject: "E-Summit, Shiv Nadar University | Payment Processing",
    html: `<html>
		<head>
			<style>
				body {
					font-family: Arial, sans-serif;
					background-color: #f4f4f4;
				}
				h3 {
					color: #333333;
				}
				a {
					color: #3498db;
				}
			</style>
		</head>
		<body>
			<h3>Congratulations!✨</h3>
      <p>
      Hey ${name},
      <br />
      We have received payment from the UPI ID: ${UPI}
      <br />
      You’ll receive a confirmation mail for your delegation within 24 hours, after your request has been processed.
      <br />
      Thank you for your patience. We look forward to hosting you at one of the largest events on this campus.
      <br />
      Stay curious. Keep building.
      <br />
      Regards,
      <br />
      --
      <br />
      Core Committee
      <br />
      Entrepreneurship Cell, SNU
      
      </p>
		</body>
	</html>`,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) console.log(error);
    else console.log("Email sent: " + info.response);
  });
};

export default mailWork;
