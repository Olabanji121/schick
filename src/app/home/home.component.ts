import { Component, OnInit } from '@angular/core';
import { ExpansionComponent } from '../modal/expansion/expansion.component';
import { ServerService } from "../server.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from '../notify/notify.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private server: ServerService, private notify: NotifyComponent, private expansionFunc: ExpansionComponent, private auth: AngularFireAuth, private rout: Router, private _snackBar: MatSnackBar) { }
  loader: boolean = false; expansionData; data:any = []; msg = {msg: null, success: null}
  ngOnInit(): void {
    this.getAllMag();
    localStorage.getItem('reference')!== (null && 'null') ? this.checkIfTransactionDone() : null
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
      if(data!==null) {
        this.openSnackBar(`Please wait while we initialize your transaction. Please do not leave this page`)
        this.server.handlePayment(id, price).subscribe(data=>{
          if(data.status){
            this.openSnackBar(`You will be redirect to our payment platform soon`)
            setTimeout(() => {          
              window.location.href = data.data.authorization_url;
            }, 3000);
          }
        });
      } 
      else {
        this.rout.navigate(['login'])
      }
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

  checkIfTransactionDone() {
    if(this.server.userData!==undefined) {
      this.msg = {msg:'Please wait while we confirm your transaction', success: true };
      this.notify.show();
      this.server.checkTransactionStatus().subscribe(dat=>{console.log(dat)
        if(dat.status) {
          this.server.handleMagazinePurchased(dat.data).subscribe(data=>{
            if(data.success) {
              localStorage.setItem('reference', null);
              // after goin to d bE
              this.rout.navigate(['downloads']);
              this.notify.hide()
              this.openSnackBar(`Magazine Purchase successful`)
            }
            else {
              this.notify.hide()
              this.openSnackBar(`Error verifying your payment, please close the App and open again.`)
            }
          }, (err) => {this.openSnackBar(`Error verifying your payment, please close the App and open again.`); this.notify.hide()})
        }
        else {
          this.notify.hide()
          this.openSnackBar(`Error verifying your payment, please close the App and open again.`)
        }
  
      }, (err) => {this.openSnackBar(`Error verifying your payment, please close the App and open again.`); this.notify.hide()})
    }

    else {
      setTimeout(() => {
        this.checkIfTransactionDone()
      }, 2000);
    }
  }

}
