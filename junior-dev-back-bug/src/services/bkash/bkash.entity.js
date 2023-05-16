/**
 * !! ATTENTION PLEASE !!
 * Please refer to the documentation at https://developer.bka.sh for information on bKash.
 */
import fs from 'fs';
import path from 'path';

export const createPayment = ({ bkash }) => async (req, res) => {
  console.log('💛req:', req?.body?.email);
  try {
    const createAgreement = await bkash.createAgreement({
      payerReference: req.body.phone,
      email: req.body.email,
      totalPrice: req.body.totalPrice,
      // custom mode
      mode : '0011',
    });
    console.log('🚀 ~ file: bkash.entity.js:16 ~ createPayment ~ createAgreement: ',await  createAgreement);

    if(createAgreement?.statusMessage==='Successful'){
      res.status(200).send(createAgreement?.bkashURL);

    }
    else
      res.status(500).send(createAgreement?.bkashURL);
  } catch (error) {
    console.log('🚀 ~ file: bkash.entity.js:20 ~ createPayment ~ error: ', error);

    res.status(500).send('something went wrong');
  }


  // res.json({
  //   test: ' hello'
  // });
};

export const executePayment = ({ bkash, mail, config }) => async (req, res) => {
  let email = req.query.email;
  const execute = await bkash.executeAgreement();
  console.log('🚀 ~ file: bkash.entity.js:38 ~ executePayment ~ execute: ', execute);

  if (Number(execute.statusCode) !== 2054) {
    const crtPayment = await bkash.createPayment({
      mode: '0001', merchantAssociationInfo: 'MI05MID54RF09123456One',
      merchantInvoiceNumber: 'Inv0121', amount: '6000', agreementID: execute?.agreementID,
      baseURL: config.api + '/api/bkash/status?email=' + email
    });
    let createPay = await bkash.executePayment({ paymentID: crtPayment.paymentID });
    // Send a Confirmation Email
    if (createPay.statusCode === '0000') {
      await mail({
        receiver: req.query.email,
        subject: 'Coding test',
        body: fs.readFileSync(path.resolve(__dirname, 'templates', 'emailTemplate.html')),
        type: 'html'
      });
    }
    // Redirect to webpage to show a modal
    return await res.redirect(crtPayment.bkashURL);
  }
  await res.redirect(config.base);
  // res.json({
  //   test: ' hello execute'
  // });
};

export const status = ({ config }) => async (req, res) => {
  let email = req.query.email;
  res.redirect(config.base + '?buy=success?email=' + email);
};


export const testZahidRouter = ({ test }) => async (req, res) => {
  // let email = req.query.email;
  res.send('trigered');
};
