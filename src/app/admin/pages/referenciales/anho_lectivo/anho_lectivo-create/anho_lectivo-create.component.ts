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
import { AnhoLectivoService } from 'src/app/admin/services/anho_lectivo/anho_lectivo.service';
import { MessageService } from 'src/app/admin/utils/message.service';


@Component({
  selector: 'app-anho_lectivo-create',
  templateUrl: './anho_lectivo-create.component.html',
  styleUrls: ['./anho_lectivo-create.component.css'],
})
export class AnhoLectivoCreateComponent {
  selectedValue = null;
  validateForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder,private anho_lectivoService: AnhoLectivoService, private messageService:MessageService, private router: Router) {
    this.validateForm = this.fb.group({
      //idanho_lectivo: [''],
      anho: ['', [Validators.required], [this.userNameAsyncValidator]],
      estado: ['',[Validators.required]],
    });
  }

  submitForm(): void {
    this.anho_lectivoService.createAnhoLectivo(this.validateForm.value).subscribe((response) =>{
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
    this.router.navigateByUrl('/anho_lectivo/list');
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
