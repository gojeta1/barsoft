import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  profileImage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProfileImage();
  }

  updateProfileImage(event:any) {
    const file = event.target.files[0];
    const userId = 1; // Supondo que você já tenha o ID do usuário

    // Enviar o arquivo para o servidor
    const formData = new FormData();
    formData.append('profileImage', file);
    formData.append('userId', userId.toString());
    this.http.post<any>('http://localhost:3000/upload', formData).subscribe(
      response => {
        console.log(response.message);
        this.profileImage = response.profileImage;
      },
      error => {
        console.error(error);
      }
    );
  }

  getProfileImage(){
    const userId = 1 // Supondo que você já tenha o ID do usuário

    // Obter o caminho da foto de perfil do usuário
    this.http.get<any>(`http://localhost:3000/profile/${userId}`).subscribe(
      response => {
        this.profileImage = response.profileImage;
      },
      error => {
        console.error(error);
        this.profileImage = '.assets/jhon/padrao.png'; // Caso ocorra um erro, exibe a imagem padrão
      }
    );
  }
}
