import { Component, OnInit } from '@angular/core';
import { ExpansionComponent } from '../modal/expansion/expansion.component';
import { ServerService } from "../server.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from '../notify/notify.component';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private server: ServerService, private notify: NotifyComponent, private expansionFunc: ExpansionComponent, private auth: AngularFireAuth, private rout: Router, private _snackBar: MatSnackBar, private payPal: PayPal) { }
  loader: boolean = false; expansionData; data:any = []; msg = {msg: null, success: null}
  ngOnInit(): void {
    this.getAllMag();
    // localStorage.getItem('reference')!== (null && 'null') ? this.checkIfTransactionDone() : null
  }

  getAllMag(){
    this.loader = true;
    this.server.getAllMagData().subscribe(data=>{
      this.loader = false;
      this.data = data.reverse();
    })
  }

  handleSelection(id, price) {
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

  handleExpansion(data) {
    this.expansionData = data;
    this.expansionFunc.show();
  }

  openSnackBar(msg) {
    this._snackBar.open(msg, '', {
      duration: 3000,
    });
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

}
