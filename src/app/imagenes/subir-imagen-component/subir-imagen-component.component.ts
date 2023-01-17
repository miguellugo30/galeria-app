import { Component, OnInit } from '@angular/core';
import { AbstractControl, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ImagenesServiceService } from 'src/app/services/imagenes-service.service';

@Component({
  selector: 'app-subir-imagen-component',
  templateUrl: './subir-imagen-component.component.html',
  styleUrls: ['./subir-imagen-component.component.scss']
})
export class SubirImagenComponentComponent implements OnInit {

  form: FormGroup = new FormGroup({
                                  nombre: new FormControl(''),
                                  image: new FormControl(''),
                                });
  submitted: boolean = false;
  imageURL: string = '';


  constructor ( private formBuilder: FormBuilder, private ImageServices : ImagenesServiceService ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      image:  ['']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {

      this.submitted = true;

      if ( this.form.invalid ) {
        return;
      }
      this.ImageServices.sendImagen( JSON.stringify( this.form.value, null, 2 ) ).subscribe();

      this.form.reset();
  }

  selectFile(event: any){

   const file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = (e: any) => {
      this.form.patchValue({
        image: e.target.result
      });
    }
    reader.readAsDataURL(file);
  }

}
