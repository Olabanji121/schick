import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public data;
  constructor(private server: ServerService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.data = this.server.userData[0];
    }, 1000);
  }

}
