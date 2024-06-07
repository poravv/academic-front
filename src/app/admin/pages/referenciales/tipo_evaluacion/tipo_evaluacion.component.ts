import { Component, OnInit } from '@angular/core';
import { TipoEvaluacionService } from 'src/app/admin/services/tipo_evaluacion/tipo_evaluacion.service';
import { MessageService } from 'src/app/admin/utils/message.service';

interface ItemData {
  idtipo_evaluacion: string;
  descripcion: string;
  estado: string;
}

@Component({
  selector: 'app-tipo_evaluacion',
  templateUrl: './tipo_evaluacion.component.html',
  styleUrls: ['./tipo_evaluacion.component.css']
})

export class TipoEvaluacionComponent implements OnInit {

  constructor(private tipo_evaluacionService: TipoEvaluacionService, private messageService: MessageService) { }

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData: ItemData[] = [];

  startEdit(idtipo_evaluacion: string): void {
    this.editCache[idtipo_evaluacion].edit = true;
  }

  cancelEdit(idtipo_evaluacion: string): void {
    const index = this.listOfData.findIndex(item => item.idtipo_evaluacion === idtipo_evaluacion);
    this.editCache[idtipo_evaluacion] = {
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
  saveEdit(idtipo_evaluacion: string): void {
    const index = this.listOfData.findIndex(item => item.idtipo_evaluacion === idtipo_evaluacion);
    Object.assign(this.listOfData[index], this.editCache[idtipo_evaluacion].data);
    //console.log(this.listOfData[index]);
    this.tipo_evaluacionService.updateTipoEvaluacion(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });
    this.listOfData[index]
    this.editCache[idtipo_evaluacion].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.idtipo_evaluacion.toString()] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  deleteRow(idtipo_evaluacion: string): void {
    this.listOfData = this.listOfData.filter(d => d.idtipo_evaluacion !== idtipo_evaluacion);
    this.listOfDisplayData = this.listOfData;
    this.tipo_evaluacionService.deleteTipoEvaluacion(idtipo_evaluacion).subscribe((response) => {
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });

  }

  ngOnInit(): void {
    this.getAlltipo_evaluacion();
  }

  getAlltipo_evaluacion() {
    this.tipo_evaluacionService.getTipoEvaluacion().subscribe({
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
