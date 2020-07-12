import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  private apiUri : string = env.apiBaseUri + 'transaction'

  list(){
    return this.http.get(this.apiUri).toPromise()
  }

  delete(id: string){
    return this.http.request('DELETE', this.apiUri, 
      {body: {_id: id}}).toPromise()
  }

  new(body: any){
    return this.http.post(this.apiUri, body).toPromise()
  }

  update(body: any){
    return this.http.put(this.apiUri, body).toPromise()
  }

  getById(id: string){
    return this.http.get(this.apiUri + '/' + id).toPromise()
  }

  getBalance(idUser: string){
    return this.http.get(this.apiUri + '/balance/' + idUser).toPromise()
  }

  getByUser(idUser: string){
    return this.http.get(this.apiUri + '/user/' + idUser).toPromise()
  }
}
