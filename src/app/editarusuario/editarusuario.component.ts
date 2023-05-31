import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.scss']
})
export class EditarusuarioComponent {

  profileImageUrl: string = './assets/jhon/user.jpg';

  constructor(private http: HttpClient) {}

  openFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  uploadProfilePicture(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.profileImageUrl = e.target.result;
      // Aqui você pode enviar a imagem para o servidor usando uma requisição HTTP
      this.uploadToServer(file);
    };

    reader.readAsDataURL(file);
  }

  uploadToServer(file: File) {
    const formData = new FormData();
    formData.append('profilePicture', file);

    this.http.post<any>('http://localhost:3000/uploadProfilePicture', formData).subscribe(
      response => {
        console.log('Imagem enviada com sucesso!');
      },
      error => {
        console.error('Erro ao enviar a imagem:', error);
      }
    );
  }

}
