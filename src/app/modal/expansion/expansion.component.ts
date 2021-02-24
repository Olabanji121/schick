import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
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
  constructor( private auth: AngularFireAuth, private server: ServerService, private rout: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.hide()
  }

  show() {
    $('#notify').modal('show');
  }

  hide() {
    $('#notify').modal('hide');
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

  openSnackBar(msg) {
    this._snackBar.open(msg, '', {
      duration: 3000,
    });
  }

}
