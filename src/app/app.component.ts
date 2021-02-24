import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ServerService } from './server.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'schick-app';
  constructor(private auth: AngularFireAuth, private server: ServerService, private splashScreen: SplashScreen) {}
  ngOnInit(): void {
    this.splashScreen.show()
    this.auth.authState.subscribe(data=>{
      if(data!==null) {
        this.server.loginUser(data.email).subscribe(data=>{
          if(data.success) {
            this.server.userData = data.message;
          }
        })
      }
    })
  }
}
