import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotifyComponent } from '../notify/notify.component';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 user = {
    name: null,
    mobile: null,
    email: null,
    password: null
  };
  msg = { msg: null, success: null }; loading: boolean = false;

  constructor(private server: ServerService, private auth: AngularFireAuth, private notifier: NotifyComponent, private rout: Router) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.loading = true;
    this.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
    .then(() => {

      this.server.newUser(this.user).subscribe(data=>{
        // this.loading = false;
        if(data.success) {
            this.msg = { msg: "Registration Successful!", success: true };
            this.notifier.show();
            setTimeout(() => {
              this.notifier.hide();
              this.rout.navigate(['home'])
            }, 2500);   
        }
      })

    })
    .catch((err) => {
      this.loading = false;
      if(err.code == 'auth/email-already-in-use') {
        this.msg = { msg: "Email already exists!", success: false };
      }
      else if(err.code == 'auth/weak-password') {
        this.msg = { msg: "Your password is too weak!", success: false };
      }
      else {
        this.msg = { msg: "Registration Unsuccessful!", success: false };
      }
      this.notifier.show()
      setTimeout(() => {
        this.notifier.hide();
      }, 2500);   
    })  

  }

}
