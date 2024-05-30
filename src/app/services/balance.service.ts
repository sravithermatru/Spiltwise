import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http :HttpClient) { }

  baseApiUrl: string = 'https://localhost:7050';

  GetBalanceByUser(userId:number):Observable<any>{
    return this.http.get<any>(this.baseApiUrl+ '/api/Balance/UserID?userId=' + userId)
  }
}
