import { Component, OnInit } from '@angular/core';
import { ExpansionComponent } from '../modal/expansion/expansion.component';
import { ServerService } from "../server.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from '../notify/notify.component';

@Component({
  selector: 'app-digitals',
  templateUrl: './digitals.component.html',
  styleUrls: ['./digitals.component.css']
})
export class DigitalsComponent implements OnInit {

  constructor(private server: ServerService, private notify: NotifyComponent, private expansionFunc: ExpansionComponent, private auth: AngularFireAuth, private rout: Router, private _snackBar: MatSnackBar) { }
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
}
