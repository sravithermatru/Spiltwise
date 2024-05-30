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

  GetUsers():Observable<Users>{
    return this.http.get<Users>(this.baseApiUrl + '/api/Users');
  }

  GetUserByGroup(groupId:number):Observable<Users>{
    return this.http.get<Users>(this.baseApiUrl + '/api/Users/GroupId?groupId=' + groupId);
  }
}
