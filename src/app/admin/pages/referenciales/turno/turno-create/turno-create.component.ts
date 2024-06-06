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
import { TurnoService } from 'src/app/admin/services/turno/turno.service';
import { MessageService } from 'src/app/admin/utils/message.service';


@Component({
  selector: 'app-turno-create',
  templateUrl: './turno-create.component.html',
  styleUrls: ['./turno-create.component.css'],
})
export class TurnoCreateComponent {
  selectedValue = null;
  validateForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder,private turnoService: TurnoService, private messageService:MessageService, private router: Router) {
    this.validateForm = this.fb.group({
      //idturno: [''],
      descripcion: ['', [Validators.required], [this.userNameAsyncValidator]],
      estado: ['',[Validators.required]],
    });
  }

  submitForm(): void {
    this.turnoService.createTurno(this.validateForm.value).subscribe((response) =>{
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
    this.router.navigateByUrl('/turno/list');
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
