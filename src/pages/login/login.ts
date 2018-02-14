import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { error } from 'util';

@IonicPage({})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  username: string;
  password: string;
  WooCommerce: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController, public events: Events,public wp:WoocommerceProvider) {

    this.username = "";
    this.password = "";
    this.WooCommerce=wp.init();
  }

  login()
  {
    
    this.http.get("http://sutte.techcraftz.com/api/auth/generate_auth_cookie/?insecure=cool&username="+this.username+"&password="+this.password)
    .subscribe( (res) => {
        console.log(res.json());
        let response = res.json();
        if(response.error){
          this.toastCtrl.create({
            message: response.error,
            duration: 5000
          }).present();
          return;
        }
        this.storage.set("userLoginInfo", response.user).then( (data) =>{
          this.alertCtrl.create({
            title: "Login Successful",
            message: "You have been logged in successfully.",
            buttons: [{
              text: "OK",
              handler: () => {

                this.events.publish("updateMenu");

                if(this.navParams.get("next")){
                  this.navCtrl.push(this.navParams.get("next"));
                } else {
                  this.navCtrl.pop();
                }             
              }
            }]
          }).present();
        })
        console.log("Data===="+JSON.stringify(response));
      },(err)=>{
      alert("Errorrrr=="+err);
      console.log("Error in login======"+err);
    })   
  }

}
