import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  userData;

  constructor(public http: HttpClient) { }

  getAllMagData() {
    return this.http.get<any>(`${environment.url}/magazine`);
  }

  uploadMagazine(data) {
    return this.http.post<any>(`${environment.url}/magazine`, data);
  }

  newUser(data) {
    return this.http.post<any>(`${environment.url}/user`, data);
  }

  loginUser(email) {
    return this.http.get<any>(`${environment.url}/user/${email}`);
  }

  handlePayment(magazineId, price) {
    const reference = new Date().getTime().toString() +'_'+ magazineId.toString();
    localStorage.setItem('reference', reference);
    const header = {
        'Authorization': 'Bearer sk_test_7f306c91771ff4bf01cc7c8163e685cd21fa2939',
        'Content-Type': 'application/json'
    }
   
    return this.http.post<any>(`https://api.paystack.co:443/transaction/initialize`, JSON.stringify({
      "email": "habeebmustapha312@gmail.com",
      "amount": price, "reference": reference
    }), {headers: header});
  }

  checkTransactionStatus() {
    const header = {
      'Authorization': 'Bearer sk_test_7f306c91771ff4bf01cc7c8163e685cd21fa2939'
    }
    return this.http.get<any>(`https://api.paystack.co:443/transaction/verify/${localStorage.getItem('reference')}`,{headers: header} );
  }
  
  handleMagazinePurchased(data) {
    return this.http.post<any>(`${environment.url}/magazine/purchased/${this.userData.email}`, data);
  }

  getUserMagazines() {
    return this.http.get<any>(`${environment.url}/magazine/get_my_magazine/${this.userData.email}`);
  }
}
