import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: null, password: null
  };
  loading: boolean = false; loginErr: boolean = false;

  constructor(private server: ServerService, private auth: AngularFireAuth, private rout: Router) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.loading = true;

    this.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
    .then(() => {
      this.loading = false;

        this.server.loginUser(this.user.email).subscribe(data=>{
          if(data.success) {
            this.server.userData = data.message;
            localStorage.setItem('user', this.user.email)
            this.rout.navigate(['home']);
            console.log(data)
          }
        })

      })
    .catch(()=> { this.loading = false; this.loginErr = true });

    
  }

}
