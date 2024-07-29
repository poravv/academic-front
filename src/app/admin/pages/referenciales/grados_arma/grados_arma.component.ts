import { Component, OnInit } from '@angular/core';
import { GradosArmaService } from 'src/app/admin/services/grados_arma/grados_arma.service';
import { MessageService } from 'src/app/admin/utils/message.service';

export interface GradosArmasModel {
  idgrados_arma: string;
  grado: string;
  armas: string;
  estado: string;
}

@Component({
  selector: 'app-gradoss_arma',
  templateUrl: './grados_arma.component.html',
  styleUrls: ['./grados_arma.component.css']
})

export class GradosArmaComponent implements OnInit {

  constructor(private grados_armaService: GradosArmaService, private messageService: MessageService) { }

  editCache: { [key: string]: { edit: boolean; data: GradosArmasModel } } = {};
  listOfData: GradosArmasModel[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData: GradosArmasModel[] = [];

  startEdit(idgrados_arma: string): void {
    this.editCache[idgrados_arma].edit = true;
  }

  cancelEdit(idgrados_arma: string): void {
    const index = this.listOfData.findIndex(item => item.idgrados_arma === idgrados_arma);
    this.editCache[idgrados_arma] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  reset(): void {

    this.searchValue = '';
    this.search();
    //this.grados='';
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: GradosArmasModel) => item.estado.toUpperCase().indexOf(this.searchValue.toUpperCase()) !== -1);
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
  saveEdit(idgrados_arma: string): void {
    const index = this.listOfData.findIndex(item => item.idgrados_arma === idgrados_arma);
    Object.assign(this.listOfData[index], this.editCache[idgrados_arma].data);
    //console.log(this.listOfData[index]);
    this.grados_armaService.updateGradosArma(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });
    this.listOfData[index]
    this.editCache[idgrados_arma].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.idgrados_arma.toString()] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  deleteRow(idgrados_arma: string): void {
    this.listOfData = this.listOfData.filter(d => d.idgrados_arma !== idgrados_arma);
    this.listOfDisplayData = this.listOfData;
    this.grados_armaService.deleteGradosArma(idgrados_arma).subscribe((response) => {
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });

  }

  ngOnInit(): void {
    this.getAllgradoss_arma();
  }

  getAllgradoss_arma() {
    this.grados_armaService.getGradosArma().subscribe({
      next: (response) => {
        if (response) {
          //console.log(response)
          response.body.map((data: GradosArmasModel) => {
            this.listOfData.push(data);
          });
          this.listOfDisplayData = [...this.listOfData];
          this.updateEditCache();
        }
      },
    });
  }

}
