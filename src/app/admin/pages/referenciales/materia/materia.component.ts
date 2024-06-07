import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'src/app/admin/services/materia/materia.service';
import { MessageService } from 'src/app/admin/utils/message.service';

interface ItemData {
  idmateria: string;
  descripcion: string;
  observacion: string;
  estado: string;
}

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})

export class MateriaComponent implements OnInit {

  constructor(private materiaService: MateriaService, private messageService: MessageService) { }

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData: ItemData[] = [];

  startEdit(idmateria: string): void {
    this.editCache[idmateria].edit = true;
  }

  cancelEdit(idmateria: string): void {
    const index = this.listOfData.findIndex(item => item.idmateria === idmateria);
    this.editCache[idmateria] = {
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
  saveEdit(idmateria: string): void {
    const index = this.listOfData.findIndex(item => item.idmateria === idmateria);
    Object.assign(this.listOfData[index], this.editCache[idmateria].data);
    //console.log(this.listOfData[index]);
    this.materiaService.updateMateria(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });
    this.listOfData[index]
    this.editCache[idmateria].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.idmateria.toString()] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  deleteRow(idmateria: string): void {
    this.listOfData = this.listOfData.filter(d => d.idmateria !== idmateria);
    this.listOfDisplayData = this.listOfData;
    this.materiaService.deleteMateria(idmateria).subscribe((response) => {
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });

  }

  ngOnInit(): void {
    this.getAllmateria();
  }

  getAllmateria() {
    this.materiaService.getMateria().subscribe({
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
