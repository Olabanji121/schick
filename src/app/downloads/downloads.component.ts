import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.server.getUserMagazines().subscribe(data=>{
      console.log(data)
    })
  }

}
