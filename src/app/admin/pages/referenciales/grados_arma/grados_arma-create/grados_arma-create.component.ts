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
import { GradosArmaService } from 'src/app/admin/services/grados_arma/grados_arma.service';
import { MessageService } from 'src/app/admin/utils/message.service';


@Component({
  selector: 'app-grados_arma-create',
  templateUrl: './grados_arma-create.component.html',
  styleUrls: ['./grados_arma-create.component.css'],
})
export class GradosArmaCreateComponent {
  selectedValue = null;
  validateForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder,private grados_armaService: GradosArmaService, private messageService:MessageService, private router: Router) {
    this.validateForm = this.fb.group({
      //idgrados_arma: [''],
      grado: ['', [Validators.required], [this.userNameAsyncValidator]],
      armas: ['',[Validators.required]],
      estado: ['',[Validators.required]],
    });
  }

  submitForm(): void {
    this.grados_armaService.createGradosArma(this.validateForm.value).subscribe((response) =>{
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
    this.router.navigateByUrl('/grados_arma/list');
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
