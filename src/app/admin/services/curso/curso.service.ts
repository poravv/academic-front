import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environments'; 

const baseURL = environment.serverUrl+'/curso';

@Injectable({
  providedIn: 'root'
})

export class CursoService {
  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }
  getCurso():Observable<any> {
    //console.log(this.oauthService.getAccessToken());
    return this.httpClient.get(`${baseURL}/get`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
      }
    });
  }

  createCurso(newData:[]):Observable<any> {
    return this.httpClient.post(`${baseURL}/post`,newData, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  updateCurso(newData:any):Observable<any> {
    //console.log(newData)
    return this.httpClient.put(`${baseURL}/put/${newData.idciudad}`,newData, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  deleteCurso(idciudad:string):Observable<any> {
    //console.log(newData)
    return this.httpClient.delete(`${baseURL}/del/${idciudad}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
