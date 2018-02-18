import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;

  constructor() {
    this.Woocommerce = WC({
      url: "http://sutte.techcraftz.com",
      verifySsl:false, 
      consumerKey: "ck_ec3169ff56f6f9b62605b63d9ebd0e78c6391de2",
      consumerSecret: "cs_3052b1757119a6a5fd29916f105ee3a42637ce5a",
      // wpAPI: true,
      // version: 'wc/v1'
    });
  }

  init(){
    return this.Woocommerce;
  }

}
