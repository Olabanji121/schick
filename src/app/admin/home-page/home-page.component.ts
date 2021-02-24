import { Component, OnInit, Injectable } from '@angular/core';
import { TopNavComponent } from '../top-nav/top-nav.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
@Injectable({
  providedIn: "root"
})
export class HomePageComponent implements OnInit {
  public rout = 'upload';
  constructor() { }

  ngOnInit(): void {
  }

}
