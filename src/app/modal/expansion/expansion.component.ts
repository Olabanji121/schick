import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.css']
})

@Injectable({
  providedIn: "root"
})

export class ExpansionComponent implements OnInit {
  @Input() data;
  constructor( private auth: AngularFireAuth, private server: ServerService, private rout: Router, private _snackBar: MatSnackBar, private payPal: PayPal) { }

  ngOnInit(): void {
    this.hide()
  }

  show() {
    $('#expansion').modal('show');
  }

  hide() {
    $('#expansion').modal('hide');
  }

  handleSelection(id, price) {
    this.hide()
    this.auth.authState.subscribe(data=>{
      this.server.getSingleMagazine(id).subscribe(dat=>{
        if(dat.length == 0) {
          if(data!==null) {
            this.openSnackBar(`Please wait while we initialize your payment`);
            setTimeout(() => {
              this.handlePayment(id, price)     
            }, 1500);
          } 
          else {
            this.rout.navigate(['login'])
          }
        }

        else {
          this.server.keepMagazineClicked = dat;
          this.rout.navigate(['downloads'])
        }

      })
    }, err=>console.log(err))
  }


  handlePayment(id, price) {

    this.payPal.init({
      PayPalEnvironmentProduction: `${environment.pay_pal_client_key}`,
      PayPalEnvironmentSandbox: `${environment.sand_box_id}`
    }).then(() => {
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({}))
      .then(() => {
        let payment = new PayPalPayment(price, 'USD', 'Magazine Purchase', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((dat) => {
          this.openSnackBar(`Payment made successfully, magazine download in progress...`);
          this.server.handleMagazinePurchased(dat, id, price).subscribe(data=>{
            // do next
            if(data.success) {
              this.openSnackBar(`Magazine Downloaded Successfully`);
              this.rout.navigate(['downloads'])
            }
            else {
              this.openSnackBar(`Error while downloading magazine, please contact our support!`)
            }
          }, err =>  this.openSnackBar(`Error while downloading magazine, please contact our support!`))
        }, () => {
          this.openSnackBar(`Error while processing your payment!`)
        });
      }, () => {
        this.openSnackBar(`Error while processing your payment!`)
      });
    }, () => {
      this.openSnackBar(`We experienced an error while processing your payment!`)
    }); 

  }


  openSnackBar(msg) {
    this._snackBar.open(msg, '', {
      duration: 3000,
    });
  }

}
