import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { SessionServiceProvider } from '../../providers/session-service/session-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the OrdersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  WooCommerce:any;
  orders:any=[];
  loader:boolean;
  // userInfo:any;
  constructor(public storage:Storage,public service:SessionServiceProvider, public wp:WoocommerceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loader=true;
    console.log('ionViewDidLoad OrdersPage');
    this.WooCommerce = this.wp.init();


    this.storage.get("userLoginInfo").then((userLoginInfo) => {

      console.log("User info=="+JSON.stringify(userLoginInfo));
      this.WooCommerce.getAsync("orders?customer="+userLoginInfo.id).then( (data) => {
        this.orders = JSON.parse(data.body).orders;
        this.loader=false;
        console.log("Order get Successfully===="+JSON.stringify(this.orders));
      }, (err) => {
        console.log("Failed to get Orders right now!!!!!!"+err);

        this.service.showToast("Something Went Wrong Please Try Again");
        this.loader=false;
        console.log("Error==="+err)
      })
    })
    
    
  }


  openOrderPage(order)
  {
    this.navCtrl.push('OrderDetailPage', {"order": order} );

    
  }

  

}
