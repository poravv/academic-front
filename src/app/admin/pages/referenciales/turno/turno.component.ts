import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/admin/services/turno/turno.service';
import { MessageService } from 'src/app/admin/utils/message.service';

interface ItemData {
  idturno: string;
  descripcion: string;
  estado: string;
}

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})

export class TurnoComponent implements OnInit {

  constructor(private turnoService: TurnoService, private messageService: MessageService) { }

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData: ItemData[] = [];

  startEdit(idturno: string): void {
    this.editCache[idturno].edit = true;
  }

  cancelEdit(idturno: string): void {
    const index = this.listOfData.findIndex(item => item.idturno === idturno);
    this.editCache[idturno] = {
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
  saveEdit(idturno: string): void {
    const index = this.listOfData.findIndex(item => item.idturno === idturno);
    Object.assign(this.listOfData[index], this.editCache[idturno].data);
    //console.log(this.listOfData[index]);
    this.turnoService.updateTurno(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });
    this.listOfData[index]
    this.editCache[idturno].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.idturno.toString()] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  deleteRow(idturno: string): void {
    this.listOfData = this.listOfData.filter(d => d.idturno !== idturno);
    this.listOfDisplayData = this.listOfData;
    this.turnoService.deleteTurno(idturno).subscribe((response) => {
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });

  }

  ngOnInit(): void {
    this.getAllturno();
  }

  getAllturno() {
    this.turnoService.getTurno().subscribe({
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
