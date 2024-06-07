import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environments'; 

const baseURL = environment.serverUrl+'/anho_lectivo';

@Injectable({
  providedIn: 'root'
})

export class AnhoLectivoService {
  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }
  getAnhoLectivo():Observable<any> {
    //console.log(this.oauthService.getAccessToken());
    return this.httpClient.get(`${baseURL}/get`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
      }
    });
  }

  createAnhoLectivo(newData:[]):Observable<any> {
    return this.httpClient.post(`${baseURL}/post`,newData, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  updateAnhoLectivo(newData:any):Observable<any> {
    //console.log(newData)
    return this.httpClient.put(`${baseURL}/put/${newData.idanho_lectivo}`,newData, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  deleteAnhoLectivo(idanho_lectivo:string):Observable<any> {
    //console.log(newData)
    return this.httpClient.delete(`${baseURL}/del/${idanho_lectivo}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
