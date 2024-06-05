import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ThemeComponent } from './admin/pages/theme/theme.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { environment } from './environment/environments';
import { TitleButtonComponent } from './admin/utils/title-button/title-button.component';
import { ContentHeaderComponent } from './admin/utils/content-header/content-header.component';
import { TurnoComponent } from './admin/pages/referenciales/turno/turno.component';
import { CursoComponent } from './admin/pages/referenciales/curso/curso.component';
import { PersonaComponent } from './admin/pages/referenciales/persona/persona.component';
import { homeComponent } from './admin/pages/home/home.component';
import { CiudadCreateComponent } from './admin/pages/referenciales/ciudad/ciudad-create/ciudad-create.component';
import { CiudadComponent } from './admin/pages/referenciales/ciudad/ciudad.component';
import { ThemeCreateComponent } from './admin/pages/theme/theme-create/theme-create.component';
import { CreateMasivoComponent } from './admin/pages/create-masivo/create-masivo.component';
import { DeleteMasivoComponent } from './admin/pages/delete-masivo/delete-masivo.component';

registerLocaleData(en);

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.keycloakConfig.issuer,
  tokenEndpoint: environment.keycloakConfig.tokenEndpoint,
  redirectUri: window.location.origin,
  clientId: environment.keycloakConfig.clientId,
  responseType: environment.keycloakConfig.responseType,
  scope: environment.keycloakConfig.scope,
  showDebugInformation: environment.keycloakConfig.showDebugInformation,
  //dummyClientSecret:environment.keycloakConfig.clave
};

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => resolve());
  });
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    homeComponent,
    ThemeComponent,
    ThemeCreateComponent,
    CiudadComponent,
    CiudadCreateComponent,
    TitleButtonComponent,
    ContentHeaderComponent,
    TurnoComponent,
    CursoComponent,
    PersonaComponent,
    CreateMasivoComponent,
    DeleteMasivoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideHttpClient(),
    provideOAuthClient(),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {
          initializeOAuth(oauthService);
        }
      },
      multi: true,
      deps: [
        OAuthService
      ]
      
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }