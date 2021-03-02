import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  slideNo = 1;
  constructor(private rout: Router) { }

  ngOnInit(): void {

    this.next();
  }
  
  getStarted() {
    this.rout.navigate(['home'])
  }

  slide(x) {
    this.slideNo = x;
  }

  next() {
    setInterval(() => {
      if(this.slideNo==1) {
        this.slideNo = 2;
      }
      else {
        this.slideNo = 1;
      }   
    }, 5000);
  }

}
