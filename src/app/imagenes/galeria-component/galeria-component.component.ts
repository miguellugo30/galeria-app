import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-galeria-component',
  templateUrl: './galeria-component.component.html',
  styleUrls: ['./galeria-component.component.scss']
})
export class GaleriaComponentComponent {

  @Input() imagenesList: any;

  constructor ( ) {}

  ngOnInit(): void {  }

}
