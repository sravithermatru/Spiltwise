import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Groups } from '../models/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  baseApiUrl: string = 'https://localhost:7050';


  GetAllGroup():Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/api/Group');
  }

  GetByIdAsync(id : number):Observable<any>{
    return this.http.get<any>(this.baseApiUrl + '/api/Group/id?id=' + id);
  }

  CreateGroup(groups: Groups):Observable<Groups>{
    return this.http.post<Groups>(this.baseApiUrl+ '/api/Group',groups);
  }
}
