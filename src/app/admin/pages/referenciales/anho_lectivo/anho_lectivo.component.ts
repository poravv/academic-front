import { Component, OnInit } from '@angular/core';
import { AnhoLectivoService } from 'src/app/admin/services/anho_lectivo/anho_lectivo.service';
import { MessageService } from 'src/app/admin/utils/message.service';

interface ItemData {
  idanho_lectivo: string;
  anho: string;
  estado: string;
}

@Component({
  selector: 'app-anho_lectivo',
  templateUrl: './anho_lectivo.component.html',
  styleUrls: ['./anho_lectivo.component.css']
})

export class AnhoLectivoComponent implements OnInit {

  constructor(private anho_lectivoService: AnhoLectivoService, private messageService: MessageService) { }

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData: ItemData[] = [];

  startEdit(idanho_lectivo: string): void {
    this.editCache[idanho_lectivo].edit = true;
  }

  cancelEdit(idanho_lectivo: string): void {
    const index = this.listOfData.findIndex(item => item.idanho_lectivo === idanho_lectivo);
    this.editCache[idanho_lectivo] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  reset(): void {

    this.searchValue = '';
    this.search();
    //this.anho='';
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
  saveEdit(idanho_lectivo: string): void {
    const index = this.listOfData.findIndex(item => item.idanho_lectivo === idanho_lectivo);
    Object.assign(this.listOfData[index], this.editCache[idanho_lectivo].data);
    //console.log(this.listOfData[index]);
    this.anho_lectivoService.updateAnhoLectivo(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });
    this.listOfData[index]
    this.editCache[idanho_lectivo].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.idanho_lectivo.toString()] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  deleteRow(idanho_lectivo: string): void {
    this.listOfData = this.listOfData.filter(d => d.idanho_lectivo !== idanho_lectivo);
    this.listOfDisplayData = this.listOfData;
    this.anho_lectivoService.deleteAnhoLectivo(idanho_lectivo).subscribe((response) => {
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });

  }

  ngOnInit(): void {
    this.getAllanho_lectivo();
  }

  getAllanho_lectivo() {
    this.anho_lectivoService.getAnhoLectivo().subscribe({
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
