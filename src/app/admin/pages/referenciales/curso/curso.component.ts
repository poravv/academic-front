import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/admin/services/curso/curso.service';
import { MessageService } from 'src/app/admin/utils/message.service';

interface ItemData {
  idcurso: string;
  descripcion: string;
  estado: string;
}

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})

export class CursoComponent implements OnInit {

  constructor(private cursoService: CursoService, private messageService: MessageService) { }

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData: ItemData[] = [];

  startEdit(idcurso: string): void {
    this.editCache[idcurso].edit = true;
  }

  cancelEdit(idcurso: string): void {
    const index = this.listOfData.findIndex(item => item.idcurso === idcurso);
    this.editCache[idcurso] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  reset(): void {

    this.searchValue = '';
    this.search();
    //this.descripcion='';
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: ItemData) => item.estado.toUpperCase().indexOf(this.searchValue.toUpperCase()) !== -1);
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
  saveEdit(idcurso: string): void {
    const index = this.listOfData.findIndex(item => item.idcurso === idcurso);
    Object.assign(this.listOfData[index], this.editCache[idcurso].data);
    //console.log(this.listOfData[index]);
    this.cursoService.updateCurso(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });
    this.listOfData[index]
    this.editCache[idcurso].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.idcurso.toString()] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  deleteRow(idcurso: string): void {
    this.listOfData = this.listOfData.filter(d => d.idcurso !== idcurso);
    this.listOfDisplayData = this.listOfData;
    this.cursoService.deleteCurso(idcurso).subscribe((response) => {
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });

  }

  ngOnInit(): void {
    this.getAllcurso();
  }

  getAllcurso() {
    this.cursoService.getCurso().subscribe({
      next: (response) => {
        if (response) {
          response.body.map((data: ItemData) => {
            this.listOfData.push(data);
          });
          this.listOfDisplayData = [...this.listOfData];
          this.updateEditCache();
        }
      },
    });
  }

}
