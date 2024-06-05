import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environments'; 

@Injectable({
  providedIn: 'root'
})

export class DeleteMasivoService {
  
  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  delete(idciudad:string,entidad:string):Observable<any> {
    const baseURL = environment.serverUrl+'/'+entidad;
    return this.httpClient.delete(`${baseURL}/del/${idciudad}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }
  
}