import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { ThemeService } from 'src/app/admin/services/theme/theme.service';
import { MessageService } from 'src/app/admin/utils/message.service';


@Component({
  selector: 'app-theme-create',
  templateUrl: './theme-create.component.html',
  styleUrls: ['./theme-create.component.css'],
  styles: [
    `
      
    `
  ]
})
export class ThemeCreateComponent {
  
  validateForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder,private themeService: ThemeService, private messageService:MessageService) {
    this.validateForm = this.fb.group({
      header_color: ['', [Validators.required], [this.userNameAsyncValidator]],
      header_color2: ['',[Validators.required]],
      header_title_color: ['',[Validators.required]],
      content_background_color: ['',[Validators.required]],
      footer_background_color1: ['',[Validators.required]],
      footer_background_color2: ['',[Validators.required]],
      footer_title_color: ['',[Validators.required]],
      footer_icon_color: ['',[Validators.required]],
      state: ['',[Validators.required]],
      content_title_color: ['',[Validators.required]],
      content_subtitle_color: ['',[Validators.required]],
      content_description_color: ['',[Validators.required]],
      content_button_color: ['',[Validators.required]],
      button_text_color: ['',[Validators.required]]

    });
  }

  submitForm(): void {
    
    this.themeService.createTheme(this.validateForm.value).subscribe((response) =>{
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

  userNameAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value.length <=5) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

}
