import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  isExtend: boolean = false; rout; isProfileExtend: boolean = false;
  constructor(private route: Router, private fire: AngularFireAuth) { }

  ngOnInit(): void {
    this.rout = this.route.url;
  }

 openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
 closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  extend() {
    this.isExtend = !this.isExtend
  }
  logout() {
    this.fire.signOut().then(()=>{
      this.route.navigate(['login'])
    })
  }
  navigate(x) {
    this.route.navigate([x])
  } 
  extendProfile() {
    this.isProfileExtend = !this.isProfileExtend
  }
}
