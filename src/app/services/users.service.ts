import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  baseApiUrl : string = 'https://localhost:7050';

  GetUsers():Observable<any>{
    return this.http.get<any>(this.baseApiUrl + '/api/Users');
  }

  GetUserByGroup(groupId:number):Observable<any>{
    return this.http.get<any>(this.baseApiUrl + '/api/Users/GroupId?groupId=' + groupId);
  }
}
