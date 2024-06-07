import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AptitudMilitarService } from 'src/app/admin/services/aptitud_militar/aptitud_militar.service';
import { MessageService } from 'src/app/admin/utils/message.service';

@Component({
  selector: 'app-aptitud_militar-create',
  templateUrl: './aptitud_militar-create.component.html',
  styleUrls: ['./aptitud_militar-create.component.css'],
})
export class 
AptitudMilitarCreateComponent {
  selectedValue = null;
  validateForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder,private aptitud_militarService: AptitudMilitarService, private messageService:MessageService, private router: Router) {
    this.validateForm = this.fb.group({
      //idaptitud_militar: [''],
      descripcion: ['', [Validators.required], [this.userNameAsyncValidator]],
      punto: ['', [Validators.required], [this.userPuntoValidator]],
      estado: ['',[Validators.required]],
    });
  }

  submitForm(): void {
    this.aptitud_militarService.createAptitudMilitar(this.validateForm.value).subscribe((response) =>{
      //console.log(response);
      if(response.mensaje=='error'){
        this.messageService.createMessage('error',response.detmensaje);
      }else{
        this.messageService.createMessage('success',response.detmensaje);
        this.validateForm.reset();
      }
    });
    //console.log('submit', this.validateForm.value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  volver(e: MouseEvent): void {
    e.preventDefault();
    this.router.navigateByUrl('/aptitud_militar/list');
  }

  userNameAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value.length <=2) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

    userPuntoValidator: AsyncValidatorFn = (control: AbstractControl) =>
      new Observable((observer: Observer<ValidationErrors | null>) => {
        setTimeout(() => {
          //Verifica si posee una coma para emitir valor incorrecto
          const verifica = /\,/.test(control.value);
          if (verifica) {
            observer.next({ error: true});
          } else {
            observer.next(null);
          }
          observer.complete();
        }, 1000);
      });

}
