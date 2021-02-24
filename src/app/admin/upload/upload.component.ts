import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;
import { DomSanitizer } from "@angular/platform-browser";
import { ServerService } from 'src/app/server.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  formData; feedback = {message: null, success: false}; loader: boolean = false;

  magazine = {
    sanitizedCover: null,
    cover: null,
    issue: null,
    price: null,
    file: null
  };
 
  constructor(private sanitizer: DomSanitizer, private server: ServerService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formData = new FormData();
  }

  uploadCover() {
    $('#cover').trigger('click');
  }

  async onSelectCover(event) {
    this.magazine.sanitizedCover = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
    this.formData.append('cover', event.target.files[0]);
  }
  async onSelectMagazine(event) {
    this.formData.append('file', event.target.files[0]);
  }

  handleSubmit() {
    this.loader = true;
    this.feedback.message = '';
    // append all other input field ro formData
    this.formData.append('issue', this.magazine.issue);
    this.formData.append('price', this.magazine.price);

    this.server.uploadMagazine(this.formData).subscribe(data=>{
      this.loader = false;
      this.feedback = data;
    })
  }

}
