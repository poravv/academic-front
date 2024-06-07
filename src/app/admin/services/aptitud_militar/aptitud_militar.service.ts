import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environments'; 

const baseURL = environment.serverUrl+'/aptitud';

@Injectable({
  providedIn: 'root'
})

export class AptitudMilitarService {
  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }
  getAptitudMilitar():Observable<any> {
    //console.log(this.oauthService.getAccessToken());
    return this.httpClient.get(`${baseURL}/get`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
      }
    });
  }

  createAptitudMilitar(newData:[]):Observable<any> {
    return this.httpClient.post(`${baseURL}/post`,newData, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  updateAptitudMilitar(newData:any):Observable<any> {
    //console.log(newData)
    return this.httpClient.put(`${baseURL}/put/${newData.idaptitud_militar}`,newData, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  deleteAptitudMilitar(idaptitud_militar:string):Observable<any> {
    //console.log(newData)
    return this.httpClient.delete(`${baseURL}/del/${idaptitud_militar}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
