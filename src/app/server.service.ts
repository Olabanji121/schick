import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  userData; keepMagazineClicked; pdfFileToDisplayOnPdfView;

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

  handleMagazinePurchased(data, id, price) {
    data.magId = id; data.amount = price
    return this.http.post<any>(`${environment.url}/magazine/purchase/${localStorage.getItem('user')}`, data);
  }

  getUserMagazines() {
    return this.http.get<any>(`${environment.url}/magazine/get_my_magazine/${localStorage.getItem('user')}`);
  }

  getSingleMagazine(id) {
    return this.http.get<any>(`${environment.url}/magazine/get_a_magazine/${localStorage.getItem('user')}/${id}`);
  }
}
