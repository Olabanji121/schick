import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.css']
})
export class PdfViewComponent implements OnInit {
  pdf; perc = 0;
  constructor(private server: ServerService, private rout: Router, private _snackBar: MatSnackBar) { } 

  ngOnInit(): void {
    this.pdf = this.server.pdfFileToDisplayOnPdfView;
    if(this.pdf==undefined) {
      this.rout.navigate(['downloads'])
    }
    else {
        this.openSnackBar('Please wait while we load your magazine...')
    }
  }

  onProgress(ev) {
    // convert to percenatge
    this.perc = (ev.loaded/ev.total)*100;
    if(this.perc > 99) {
      this.openSnackBar('Your magazine is ready!')
    }
  }

  openSnackBar(msg) {
    this._snackBar.open(msg, '', {
      duration: 2500,
    });
  }

}
