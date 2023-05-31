import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

interface Usuario {
  id: string;
  nome: string;
  foto: string;
}

interface UploadResponse {
  message: string;
  imageUrl: string; // Adicione a propriedade 'imageUrl' ao tipo personalizado
}

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.scss']
})
export class EditarusuarioComponent implements OnInit {

  nomeUsuario: string ;
  profileImageUrl: string = './assets/jhon/user.jpg';
  selectedFile!: File ;
  imageUrl: string ='';


  constructor(private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService) {this.nomeUsuario = this.authenticationService.getNomeUser()}


    ngOnInit() {
        this.nomeUsuario = this.authenticationService.getNomeUser();
        const img = document.createElement('img');
        img.onload = () => {
          this.profileImageUrl = `./assets/jhon/user.jpg?t=${Date.now()}`;
          this.cdr.detectChanges();
        };
        img.src = `./assets/jhon/user.jpg?t=${Date.now()}`;
    }


  openFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput !== null) {
      fileInput.click();
    }
  }

  uploadProfilePicture(event: any): void {

    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      this.profileImageUrl = e.target.result;
    };
  
    reader.readAsDataURL(file);

  }

  uploadToServer(file: File) {
    const formData = new FormData();
    formData.append('profilePicture', this.selectedFile, this.selectedFile.name);

    this.http.put<UploadResponse>('http://localhost:3000/uploadProfilePicture', formData).subscribe(
      response => {
        console.log('Upload realizado com sucesso');
        this.profileImageUrl = response.imageUrl;
      },
      error => {
        console.error('Erro ao enviar a imagem:', error);
      }
    );
  }

  getImageUrl() {
    // Adicione um timestamp para forçar o recarregamento da imagem após a alteração
    const timestamp = Date.now();
    return this.profileImageUrl + '?t=' + timestamp;
  }

}
