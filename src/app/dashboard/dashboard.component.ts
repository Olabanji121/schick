import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public data;
  constructor(private fire: AngularFireAuth, private rout: Router, private server: ServerService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.data = this.server.userData[0];
    }, 1000);
  }

  logout() {
    this.fire.signOut().then(()=>{
      this.rout.navigate(['login'])
    })
  }

}
