import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})

export class TopNavComponent implements OnInit {
  currentRout;
  constructor(private homePageFunc: HomePageComponent, private rout: Router) { }

  ngOnInit(): void {
    this.currentRout = this.rout.url;
  }

  routset(val) {
    this.homePageFunc.rout = val;
  }

}
