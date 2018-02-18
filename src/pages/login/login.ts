import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { error } from 'util';
import { SessionServiceProvider } from '../../providers/session-service/session-service';

@IonicPage({})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  username: string;
  password: string;
  WooCommerce: any;
  loader:boolean;
  constructor(public service:SessionServiceProvider,public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController, public events: Events,public wp:WoocommerceProvider) {

    this.username = "";
    this.password = "";
    this.WooCommerce=wp.init();
  }

  login()
  {

    if(!this.username)
    {
      this.toastCtrl.create({
        message:"Please Enter Username",
        duration: 2000
      }).present();
      return;
    }
    if(!this.password)
    {
      this.toastCtrl.create({
        message:"Please Enter Password",
        duration: 2000
      }).present();
      return;
    }

    this.username=this.username.replace(/\s/g, "");
    this.loader=true;
    this.http.get("http://sutte.techcraftz.com/api/auth/generate_auth_cookie/?insecure=cool&username="+this.username+"&password="+this.password)
    .subscribe( (res) => {
        console.log(res.json());
        let response = res.json();
        this.service.setUser(response);
        if(response.error){
          this.loader=false; 
          this.toastCtrl.create({
            message: response.error,
            duration: 5000
          }).present();
          return;
        }
        this.storage.set("userLoginInfo", response.user).then( (data) =>{
          this.loader=false; 
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
        this.loader=false; 
        console.log("Error in login======"+err);
        this.toastCtrl.create({
          message:"Something went wrong please try again",
          duration: 5000
        }).present();
        return;
      // alert("Errorrrr=="+err);
      
    })   
  }

}
