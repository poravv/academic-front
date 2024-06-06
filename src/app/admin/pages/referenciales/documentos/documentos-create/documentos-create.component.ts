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
import { DocumentosService } from 'src/app/admin/services/documentos/documentos.service';
import { MessageService } from 'src/app/admin/utils/message.service';


@Component({
  selector: 'app-documentos-create',
  templateUrl: './documentos-create.component.html',
  styleUrls: ['./documentos-create.component.css'],
})
export class DocumentosCreateComponent {
  selectedValue = null;
  validateForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder,private documentosService: DocumentosService, private messageService:MessageService, private router: Router) {
    this.validateForm = this.fb.group({
      //iddocumentos: [''],
      descripcion: ['', [Validators.required], [this.userNameAsyncValidator]],
      estado: ['',[Validators.required]],
    });
  }

  submitForm(): void {
    this.documentosService.createDocumentos(this.validateForm.value).subscribe((response) =>{
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
    this.router.navigateByUrl('/documentos/list');
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

}