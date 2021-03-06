import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { SessionServiceProvider } from '../../providers/session-service/session-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the OrderDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  order:any={};
  WooCommerce:any;
  loader:boolean;
  constructor(public alertCtrl:AlertController,public service:SessionServiceProvider, public Wp:WoocommerceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.order = this.navParams.get("order");
    this.WooCommerce = this.Wp.init();
    console.log("Order info===="+JSON.stringify(this.order));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }


  cancelOrder()
  {
    

    this.alertCtrl.create({
      title: "Cancel Confirmation",
      message: "Are You Sure You Want To Cancel Order?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },  
        {
        text: "OK",
        role:'cancel',
        handler: () => {
          this.confirmCancelOrder();
        } 
      }]
    }).present();
  }

  confirmCancelOrder()
  {
    this.loader=true;
    this.order.status="cancelled";
  //   return new Promise((resolve, reject) => {
  //     this.WooCommerce.putAsync("orders", data1)
  //       .then((data: any) => {
  //         console.log("put success");
  //         resolve((JSON.parse(data.toJSON().body)));
  //       }, error => {
  //         console.log("Error69----"+error);
  //         reject(error)
  //       }).catch((error: Error) => {
  //         console.log("Error72----"+error);
  //       reject(error);
  //     });
  //   });
  // }
   
 const data = {"order":{"status":"cancelled"}}

      
    this.WooCommerce.putAsync("orders/"+this.order.id, data).then( (data) => {
      this.loader=false;
      console.log("order info after update====="+JSON.stringify(data));
      this.service.showToast("Successfully Cancel Order");
      // console.log("Order get Successfully===="+JSON.stringify(this.orders));
    }, (err) => {
      console.log("Failed to get Orders right now!!!!!!"+err);

      this.service.showToast("Something Went Wrong Please Try Again");
      this.loader=false;
      console.log("Error==="+err)
    })
  }

}
