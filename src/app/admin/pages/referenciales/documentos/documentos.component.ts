import { Component, OnInit } from '@angular/core';
import { DocumentosService } from 'src/app/admin/services/documentos/documentos.service';
import { MessageService } from 'src/app/admin/utils/message.service';

interface ItemData {
  iddocumentos: string;
  descripcion: string;
  estado: string;
}

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})

export class DocumentosComponent implements OnInit {

  constructor(private documentosService: DocumentosService, private messageService: MessageService) { }

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData: ItemData[] = [];

  startEdit(iddocumentos: string): void {
    this.editCache[iddocumentos].edit = true;
  }

  cancelEdit(iddocumentos: string): void {
    const index = this.listOfData.findIndex(item => item.iddocumentos === iddocumentos);
    this.editCache[iddocumentos] = {
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
  saveEdit(iddocumentos: string): void {
    const index = this.listOfData.findIndex(item => item.iddocumentos === iddocumentos);
    Object.assign(this.listOfData[index], this.editCache[iddocumentos].data);
    //console.log(this.listOfData[index]);
    this.documentosService.updateDocumentos(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });
    this.listOfData[index]
    this.editCache[iddocumentos].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.iddocumentos.toString()] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  deleteRow(iddocumentos: string): void {
    this.listOfData = this.listOfData.filter(d => d.iddocumentos !== iddocumentos);
    this.listOfDisplayData = this.listOfData;
    this.documentosService.deleteDocumentos(iddocumentos).subscribe((response) => {
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });

  }

  ngOnInit(): void {
    this.getAlldocumentos();
  }

  getAlldocumentos() {
    this.documentosService.getDocumentos().subscribe({
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
