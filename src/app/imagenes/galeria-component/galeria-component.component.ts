import { Component } from '@angular/core';
import { ImagenesServiceService } from 'src/app/services/imagenes-service.service';

@Component({
  selector: 'app-galeria-component',
  templateUrl: './galeria-component.component.html',
  styleUrls: ['./galeria-component.component.scss']
})
export class GaleriaComponentComponent {

  imagenes: any;

  constructor (  private ImageServices : ImagenesServiceService ) {}

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages(){
    this.ImageServices.getImagenes().subscribe((data)=> {
      this.imagenes = data;
    });
  }

}
