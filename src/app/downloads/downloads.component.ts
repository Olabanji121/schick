import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  data; magazineClicked; loader: boolean = false; magExist: boolean = false; 

  constructor(private server: ServerService, private rout: Router) { }

  ngOnInit(): void {
    this.magazineClicked = this.server.keepMagazineClicked;
    this.loader = true;
    this.server.getUserMagazines().subscribe(data=>{

      this.magExist = (data.length > 0)? true : false;
      this.loader = false
      if(this.magazineClicked!==undefined) {
        for (let i = 0; i < data.length; i++) {
            if(data[i].mag_id==this.magazineClicked[0].mag_id) {
              this.magazineClicked = data[i];
              data.splice(i, 1);
              this.data = data;
            }
        }
      }
      else {
        this.data = data;
        this.magazineClicked = { mag_id: 0 }
      }
    }, err => this.loader = false)
  }

  explore(mag) {
    this.server.pdfFileToDisplayOnPdfView = mag.file;
    this.rout.navigate(['pdf'])
  }
}
