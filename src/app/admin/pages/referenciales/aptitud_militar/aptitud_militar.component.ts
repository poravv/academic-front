import { Component, OnInit } from '@angular/core';
import { AptitudMilitarService } from 'src/app/admin/services/aptitud_militar/aptitud_militar.service';
import { MessageService } from 'src/app/admin/utils/message.service';

interface ItemData {
  idaptitud_militar: string;
  descripcion: string;
  punto: number;
  estado: string;
}

@Component({
  selector: 'app-aptitud_militar',
  templateUrl: './aptitud_militar.component.html',
  styleUrls: ['./aptitud_militar.component.css']
})

export class AptitudMilitarComponent implements OnInit {

  constructor(private aptitud_militarService: AptitudMilitarService, private messageService: MessageService) { }

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData: ItemData[] = [];

  startEdit(idaptitud_militar: string): void {
    this.editCache[idaptitud_militar].edit = true;
  }

  cancelEdit(idaptitud_militar: string): void {
    const index = this.listOfData.findIndex(item => item.idaptitud_militar === idaptitud_militar);
    this.editCache[idaptitud_militar] = {
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
  saveEdit(idaptitud_militar: string): void {
    const index = this.listOfData.findIndex(item => item.idaptitud_militar === idaptitud_militar);
    Object.assign(this.listOfData[index], this.editCache[idaptitud_militar].data);
    //console.log(this.listOfData[index]);
    this.aptitud_militarService.updateAptitudMilitar(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });
    this.listOfData[index]
    this.editCache[idaptitud_militar].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.idaptitud_militar.toString()] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  deleteRow(idaptitud_militar: string): void {
    this.listOfData = this.listOfData.filter(d => d.idaptitud_militar !== idaptitud_militar);
    this.listOfDisplayData = this.listOfData;
    this.aptitud_militarService.deleteAptitudMilitar(idaptitud_militar).subscribe((response) => {
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });

  }

  ngOnInit(): void {
    this.getAllaptitud_militar();
  }

  getAllaptitud_militar() {
    this.aptitud_militarService.getAptitudMilitar().subscribe({
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
