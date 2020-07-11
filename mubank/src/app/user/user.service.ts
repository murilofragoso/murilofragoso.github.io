import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUri : string = env.apiBaseUri + 'user'

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

  login(body: any){
    return this.http.post(this.apiUri + '/login', body).toPromise()
  }

}
