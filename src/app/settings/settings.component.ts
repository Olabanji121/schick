import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  email = ''; err; loading: boolean = false;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    if(this.email == '') {
      this.err = "Please enter a valid email"
    }
  
    else {
      this.loading = true;
      this.auth.sendPasswordResetEmail(this.email).then(()=>{this.err = 'Email Sent!'; this.loading = false}, err=>{this.err = 'Error reseting your password'; this.loading = false})
    }
  }

}
