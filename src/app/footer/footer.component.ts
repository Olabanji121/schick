import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
@Injectable({
  providedIn: "root"
})
export class FooterComponent implements OnInit {

  public opacity = {
    home: false, dashboard: false, download: false
  }
  
  constructor(private route: Router) { }
  
  ngOnInit(): void { 
   this.checkRoute()
  }

  checkRoute() {
    if(this.route.url == '/home') {
      this.opacity = {
        home: true,
        dashboard: false,
        download: false
      }
    }
   else if(this.route.url == '/dashboard') {
      this.opacity = {
        home: false,
        dashboard: true,
        download: false
      }
    }
    else if(this.route.url == '/downloads') {
      this.opacity = {
        home: false,
        dashboard: false,
        download: true
      }
    }
  }

  navigator(x) {  
    this.route.navigate([x]);
  }


}
