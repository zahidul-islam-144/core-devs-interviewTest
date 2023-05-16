/**
 * !! ATTENTION PLEASE !!
 * Please refer to the documentation at https://developer.bka.sh for information on bKash.
 */
import { createPayment, executePayment, status, testZahidRouter } from './bkash.entity';
import Bkash from './bkash.functions';
// import bkash from './services/bkash/bkash';

export default async function bkash() {
  console.log('🚀🚀 ~ file: bkash.js:9 ~ bkash ~ bkash: ');



  const config  = {
    'bkash': {
      'username': 'sandboxTokenizedUser02',
      'password': 'sandboxTokenizedUser02@12345',
      'appKey': '4f6o0cjiki2rfm34kfdadl1eqq',
      'appSecret': '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b',
      'isSandbox': true
    }
  };
  // const { username, password, appKey, appSecret, isSandbox } = this.config.bkash;
  const { username, password, appKey, appSecret, isSandbox } = config.bkash;

  const bkash = await Bkash.init(username, password, appKey, appSecret, isSandbox);
  // console.log('🚀 ~ file: bkash.js:27 ~ bkash ~ bkash: ', await bkash);
  console.log('🚀  ');
  console.log('🚀  ');
  // console.log('🚀  ',{ ...this, bkash });



  // Routes
  // this.route.post('/bkash/createPayment'), createPayment({ ...this, bkash }); //😡
  this.route.post('/bkash/createPayment', createPayment({ ...this, bkash }));

  this.route.post('/bkash/execute', executePayment({ ...this, bkash }));
  this.route.get('/bkash/status', status({ ...this, bkash }));
  this.route.get('/bkash/testZahidRouter', testZahidRouter({ ...this, bkash }));

}

