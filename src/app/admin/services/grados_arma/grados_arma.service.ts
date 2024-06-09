import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environments'; 

const baseURL = environment.serverUrl+'/grados_arma';

@Injectable({
  providedIn: 'root'
})

export class GradosArmaService {
  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }
  getGradosArma():Observable<any> {
    //console.log(this.oauthService.getAccessToken());
    return this.httpClient.get(`${baseURL}/get`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
      }
    });
  }

  createGradosArma(newData:[]):Observable<any> {
    return this.httpClient.post(`${baseURL}/post`,newData, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  updateGradosArma(newData:any):Observable<any> {
    //console.log(newData)
    return this.httpClient.put(`${baseURL}/put/${newData.idgrados_arma}`,newData, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  deleteGradosArma(idgrados_arma:string):Observable<any> {
    //console.log(newData)
    return this.httpClient.delete(`${baseURL}/del/${idgrados_arma}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
