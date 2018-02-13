import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;

  constructor() {
    this.Woocommerce = WC({
      url: "http://sutte.techcraftz.com",
      verifySsl:false, 
      consumerKey: "ck_c5a56b7f429167776557be12bbba4045c364f929",
      consumerSecret: "cs_21a42e77364a8a834de90cb68f79f64d5c32ff2a",
      // wpAPI: true,
      // version: 'wc/v1'
    });
  }

  init(){
    return this.Woocommerce;
  }

}
