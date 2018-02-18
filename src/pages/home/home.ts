import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, ToastController,Events } from 'ionic-angular';
// import { ProductDetails } from '../product-details/product-details';

import * as WC from 'woocommerce-api';
// import { SearchPage } from "../search/search";
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { setTimeout } from 'timers';

@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;
  searchQuery: string = "";
  loader:boolean;

  @ViewChild('productSlides') productSlides: Slides;

  constructor(public events:Events,public navCtrl: NavController, public toastCtrl: ToastController, private WP: WoocommerceProvider) {
   
    console.log("Fetching data");
    this.loader=true;
    this.page = 2;
    this.searchQuery="";
    this.WooCommerce = WP.init();

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then( (data) => {

      console.log("Fetching products")
      this.loader=false;
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })
  }

  ionViewDidLoad(){
    setInterval(()=> {

      if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();
    }, 3000)

    this.events.unsubscribe('close:search');  
    this.events.subscribe('close:search',search=>{
      console.log("close searh call");
      this.searchQuery="";
    })
  }

  loadMoreProducts(event){
    console.log(event);
    if(event == null)
    {
      this.page = 2;
      this.moreProducts = [];
    }
    else
      this.page++;

    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event != null)
      {
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 10){
        event.enable(false);

        this.toastCtrl.create({
          message: "No more products!",
          duration: 5000
        }).present();

      }


    }, (err) => {
      console.log(err)
    })
  }

  openProductPage(product){
    this.navCtrl.push('ProductDetails', {"product": product} );
  }

  onSearch(){
    if(this.navCtrl.getActive().name=='HomePage')
    {
      if(this.searchQuery.length > 0){
        console.log("Call psuh");
        this.navCtrl.push('SearchPage', {"searchQuery": this.searchQuery}); 
        console.log("current page==="+this.navCtrl.getActive().name);
      }
    }  
  }

}
