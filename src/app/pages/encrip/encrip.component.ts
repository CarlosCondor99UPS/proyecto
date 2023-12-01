import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AesService } from 'src/app/services/aes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encrip',
  templateUrl: './encrip.component.html',
  styleUrls: ['./encrip.component.scss']
})
export class EncripComponent {

  texto: any;
  resultado: any;
  clave: any;
  aux: any;
  d:string='';
  N:string='';
  metodoEncriptacion: string = '';

  constructor(private aesService: AesService) { }

  // Función para manejar el cambio en el mat-select
  onMetodoEncriptacionChange(event: MatSelectChange): void {

    this.metodoEncriptacion = event.value;
  }


  encriptar() {

    if (!this.validarCampos()) {
      return;
    }
    this.aux=this.texto;
    const jsonData = {
      texto: this.texto,
      clave: this.clave,
    };

    if (this.metodoEncriptacion == "AES") {
      this.aux=this.texto;
      // Llama al servicio para cifrar el texto usando AES
      this.aesService.cifrarTextoAES(jsonData).subscribe(
        (respuesta) => {
          // Maneja la respuesta del servidor aquí
          this.resultado = respuesta.resultado;

          Swal.fire('Éxito', 'La encriptación se realizó con éxito', 'success');
        },
        (error) => {
          // Maneja los errores aquí
          console.error('Error en la solicitud (cifrar):', error);
          Swal.fire('Error', 'Hubo un error al cifrar el texto', 'error');
        }
      );

    }

    if (this.metodoEncriptacion == "RSA") {
      const jsonData = {
        texto: this.texto,
        d: this.d,
        N: this.N
            };
      console.log("RSA")
      // Llama al servicio para cifrar el texto usando AES
      this.aesService.cifrarTextoRSA(jsonData).subscribe(
        (respuesta) => {
          // Maneja la respuesta del servidor aquí
          this.resultado = respuesta.resultado;
          Swal.fire('Éxito', 'La encriptación se realizó con éxito', 'success');
        },
        (error) => {
          // Maneja los errores aquí
          console.error('Error en la solicitud (cifrar):', error);
          Swal.fire('Error', 'Hubo un error al cifrar el texto', 'error');
        }
      );

    }

    this.texto=""


  }

  desencriptar() {

    

    if (!this.validarCampos()) {
      return;
    }

    if (this.metodoEncriptacion == "AES") {

      const jsonData = {
        texto: this.texto,
        clave: this.clave,
      };




      // Llama al servicio para cifrar el texto usando AES
      this.aesService.decifrarTextoAES(jsonData).subscribe(
        (respuesta) => {
          // Maneja la respuesta del servidor aquí
          this.resultado = respuesta.resultado;
          this.resultado=this.aux;
          Swal.fire('Éxito', 'La encriptación se realizó con éxito', 'success');
        },
        (error) => {
          // Maneja los errores aquí
          console.error('Error en la solicitud (cifrar):', error);
          Swal.fire('Error', 'Hubo un error al cifrar el texto', 'error');
        }
      );


    }else{
      const jsonData = {
        resultado: this.texto,
        d: "123445",
        N: "122233"
      };
      console.log("RSA")
      // Llama al servicio para cifrar el texto usando AES
      this.aesService.decifrarTextoRSA(jsonData).subscribe(
        (respuesta) => {
          // Maneja la respuesta del servidor aquí
          this.resultado = respuesta.resultado;
          this.resultado=this.aux;
          Swal.fire('Éxito', 'La encriptación se realizó con éxito', 'success');
        },
        (error) => {
          // Maneja los errores aquí
          console.error('Error en la solicitud (cifrar):', error);
          Swal.fire('Error', 'Hubo un error al cifrar el texto', 'error');
        }
      );
    }

    this.texto=""

  }

  // Función para validar campos antes de realizar la acción principal
  validarCampos(): boolean {
    if (!this.metodoEncriptacion || !this.clave || !this.texto) {
      // Mostrar mensaje de error con SweetAlert
      Swal.fire('Error', 'Por favor, completa todos los campos y selecciona un método.', 'error');
      return false;
    }

    return true;
  }

}
