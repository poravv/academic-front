import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { MessageService } from '../../utils/message.service';

interface ItemData {
  idtheme: string;
  header_color: string;
  header_color2: number;
  header_title_color: string;
  content_background_color: string;
  footer_background_color1: string;
  footer_background_color2: string;
  footer_title_color: string;
  footer_icon_color: string;
  state: string;
  content_title_color: string;
  content_subtitle_color: string;
  content_description_color: string;
  content_button_color: string;
  button_text_color: string;
}

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit{

  constructor(private themeService: ThemeService, private messageService:MessageService) { }

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData:ItemData[] = [];

  startEdit(idtheme: string): void {
    this.editCache[idtheme].edit = true;
  }

  cancelEdit(idtheme: string): void {
    const index = this.listOfData.findIndex(item => item.idtheme === idtheme);
    this.editCache[idtheme] = {
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
    this.listOfDisplayData = this.listOfData.filter((item: ItemData) => item.state.toUpperCase().indexOf(this.searchValue.toUpperCase()) !== -1);
  }

  /*Ajustar para que el save viaje a la api de persistencia*/
  saveEdit(idtheme: string): void {
    const index = this.listOfData.findIndex(item => item.idtheme === idtheme);
    Object.assign(this.listOfData[index], this.editCache[idtheme].data);
    //console.log(this.listOfData[index]);
    this.themeService.updateTheme(this.listOfData[index]).subscribe((response) =>{
      //console.log(response);
      if(response.mensaje=='error'){
        this.messageService.createMessage('error',response.detmensaje);
      }else{
        this.messageService.createMessage('success',response.detmensaje);
      }
    });
    this.listOfData[index]
    this.editCache[idtheme].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.idtheme.toString()] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  deleteRow(idtheme: string): void {
    this.listOfData = this.listOfData.filter(d => d.idtheme !== idtheme);
    this.listOfDisplayData = this.listOfData;
    this.themeService.deleteTheme(idtheme).subscribe((response) =>{
      if(response.mensaje=='error'){
        this.messageService.createMessage('error',response.detmensaje);
      }else{
        this.messageService.createMessage('success',response.detmensaje);
      }
    });
    
  }

  ngOnInit(): void {
    this.getAllTheme();
  }

  getAllTheme() {
    this.themeService.getTheme().subscribe({
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
