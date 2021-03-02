import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private route: Router, private fire: AngularFireAuth) { }

  ngOnInit(): void {
  }

  navigate(x) {  
    this.route.navigate([x]);
  }

  logout() {
    this.fire.signOut().then(()=>{
      this.route.navigate(['login'])
    })
  }

}
