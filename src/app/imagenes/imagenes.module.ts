import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagenesRoutingModule } from './imagenes-routing.module';
import { GaleriaComponentComponent } from './galeria-component/galeria-component.component';
import { SubirImagenComponentComponent } from './subir-imagen-component/subir-imagen-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GaleriaComponentComponent,
    SubirImagenComponentComponent
  ],
  imports: [
    CommonModule,
    ImagenesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    GaleriaComponentComponent,
    SubirImagenComponentComponent
  ]
})
export class ImagenesModule { }
