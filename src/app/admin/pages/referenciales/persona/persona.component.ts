import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/admin/services/persona/persona.service';
import { MessageService } from 'src/app/admin/utils/message.service';
import { GradosArmasModel } from '../grados_arma/grados_arma.component';
import { CiudadModel } from '../ciudad/ciudad.component';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer, Subscription } from 'rxjs';

export interface ImagenBuffer{
  type:string,
  data:number[]
}

interface PersonaModel {
  idpersona: string;
  nombre: string;
  apellido: string;
  fnacimiento: string;
  sexo: string;
  documento: string;
  direccion: string;
  photo: ImagenBuffer;
  tipo_doc: string;
  nacionalidad: string;
  correo: string;
  telefono: string;
  registro: string;
  idgrados_arma: string;
  idciudad: string;
  grados_arma: GradosArmasModel,
  ciudad: CiudadModel,
  estado: string;
}

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})

export class PersonaComponent implements OnInit {
  loading = false;
  avatarUrl?: string;
  file?: string;
  image?:any;

  constructor(private personaService: PersonaService, private messageService: MessageService, private msg: NzMessageService) { }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  customUploadReq = (item: NzUploadXHRArgs) => {
    const file = item.file as NzUploadFile;
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      // Aquí puedes manejar la cadena base64 como necesites
      //console.log('Base64 Image:', base64);
      this.image=base64;
      if (item.onSuccess) {
        item.onSuccess({}, item.file, {});
      }

    };

    reader.readAsDataURL(file as unknown as Blob);

    return new Subscription();
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);

  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      default:
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
    }
  }

  editCache: { [key: string]: { edit: boolean; data: PersonaModel } } = {};
  listOfData: PersonaModel[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData: PersonaModel[] = [];

  startEdit(idpersona: string): void {
    this.editCache[idpersona].edit = true;
  }

  cancelEdit(idpersona: string): void {
    const index = this.listOfData.findIndex(item => item.idpersona === idpersona);
    this.editCache[idpersona] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: PersonaModel) => item.estado.toUpperCase().indexOf(this.searchValue.toUpperCase()) !== -1);
  }

  searchTotal(search: string) {
    const targetValue: any[] = [];
    this.listOfData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (value[keys[i]] && value[keys[i]].toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
          targetValue.push(value);
          break;
        }
      }
    });
    this.listOfDisplayData = targetValue;
  }

  /*Ajustar para que el save viaje a la api de persistencia*/
  saveEdit(idpersona: string): void {
    const index = this.listOfData.findIndex(item => item.idpersona === idpersona);

    Object.assign(this.listOfData[index], this.editCache[idpersona].data);
    
    this.listOfData[index].photo=this.image;
    console.log(this.listOfData[index]);
    this.personaService.updatePersona(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });
    this.listOfData[index]
    this.editCache[idpersona].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.idpersona.toString()] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  deleteRow(idpersona: string): void {
    this.listOfData = this.listOfData.filter(d => d.idpersona !== idpersona);
    this.listOfDisplayData = this.listOfData;
    this.personaService.deletePersona(idpersona).subscribe((response) => {
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });

  }

  ngOnInit(): void {
    this.getAllpersona();
  }

  getAllpersona() {
    this.personaService.getPersona().subscribe({
      next: (response) => {
        if (response) {
          response.body.map((data: PersonaModel) => {
            //console.log(data.photo);
            this.listOfData.push(data);
          });
          this.listOfDisplayData = [...this.listOfData];
          this.updateEditCache();
        }
      },
    });
  }

}
