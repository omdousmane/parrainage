let html = `<p>Veillez cliquez sur<a href="http://${req.headers.host}/${api}/validateMail/?token=${stringValidation}"> le liens suivant
                    </a>pour valider votre compte.  </p>
                    <p>Vous avez 30 jours pour valider votre compte </p>
                    <p>http://${req.headers.host}${api}/validateMail?token=${stringValidation} </p>`;
        const msg = {
          to: req.body.email, // Change to your recipient
          from: "omdousmane@gmail.com", // Change to your verified sender
          subject: "Confirm your email",
          text: "Confirm your email address",
          html: html,
        };
        await sgMail
          .send(msg)
          .then(() => {
            const message = `Un mail de confirmation a été envoyé à ${req.body.email}`;
            res.status(202).json({ message, dataUser: user });
          })
          .catch((error) => {
            const message = `Erreur d'envoie du mail`;
            res.status(500).json({ message, error });
          });


            const data = {
              from: "bde-noreply@hetic.net",
              to: req.body.email,
              subject: "Confirm your email",
              text: "Confirm your email address",
            };


const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: 'a45f186015ff81af1aa3f633788c14a9-78651cec-76e52fc2',
});
mg.messages
	.create(sandbox8815a254d5e942118421fefd0d256456.mailgun.org, {
		from: "Mailgun Sandbox <postmaster@sandbox8815a254d5e942118421fefd0d256456.mailgun.org>",
		to: ["omdousmane@yahoo.com"],
		subject: "Hello",
		text: "Testing some Mailgun awesomness!",
	})
	.then(msg => console.log(msg)) // logs response data
	.catch(err => console.log(err)); // logs any error`;


// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.