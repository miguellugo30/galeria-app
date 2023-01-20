import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ImagenesServiceService } from 'src/app/services/imagenes-service.service';
@Component({
  selector: 'app-subir-imagen-component',
  templateUrl: './subir-imagen-component.component.html',
  styleUrls: ['./subir-imagen-component.component.scss']
})
export class SubirImagenComponentComponent implements OnInit {

  public form: FormGroup = new FormGroup({
                                  nombre: new FormControl(''),
                                  image: new FormControl(''),
                                });
  public submitted: boolean = false;
  public imageURL: string = '';
  public imagenes: any ;

  public constructor ( private formBuilder: FormBuilder, private ImageServices : ImagenesServiceService ) {}

  public ngOnInit(): void {
    this.ImageServices.login().subscribe();
    this.getAllImages();

    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      image:  ['', Validators.required],
      type: ['']
    });
  }

  public onSubmit() {

    if ( this.form.invalid ) {
      this.submitted = true;
      return;
    }

    this.ImageServices.sendImagen( JSON.stringify( this.form.value, null, 2 ) ).subscribe();

    this.getAllImages();

    this.form.reset();
  }

  public selectFile(event: any){

    const file = event.target.files[0];

    var reader = new FileReader();

    reader.onload = (e: any) => {
      this.form.patchValue({
        image: e.target.result,
        type : file.type
      });
    }

    reader.readAsDataURL(file);

  }

  private getAllImages(){
    this.ImageServices.getImagenes().subscribe((data)=> {
      this.imagenes = data;
    });
  }

}
