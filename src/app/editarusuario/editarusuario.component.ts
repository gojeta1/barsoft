import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  profileImageUrl: string = '';
  selectedFile!: File ;
  shouldUpdateImage: boolean = false;
  updatedImageUrl: string = '';

  constructor(private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService) {this.nomeUsuario = this.authenticationService.getNomeUser()}

    ngOnInit() {
        this.nomeUsuario = this.authenticationService.getNomeUser();
        this.profileImageUrl = this.getImageUrl();

    }

    

 

  openFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput !== null) {
      fileInput.click();
      this.shouldUpdateImage = true;
    }
  }

  uploadProfilePicture(event: any) {

    this.selectedFile = event.target.files[0];
    this.updatedImageUrl = '';
    this.shouldUpdateImage = true;

  }

  uploadToServer(file: File) {
    const formData = new FormData();
    formData.append('profilePicture', this.selectedFile, this.selectedFile.name);

    this.http.put<UploadResponse>('http://localhost:3000/uploadProfilePicture', formData).subscribe(
      response => {
        console.log('Upload realizado com sucesso');
        this.updatedImageUrl = response.imageUrl;
        this.profileImageUrl = this.getImageUrl();
      },
      error => {
        console.error('Erro ao enviar a imagem:', error);
      }
    );
  }

  ngAfterViewChecked(): void {
    if (this.shouldUpdateImage) {
     this.shouldUpdateImage = false;
     this.uploadToServer(this.selectedFile);
     console.log(this.profileImageUrl)
    }
  }

  getImageUrl(): string {
    const imageUrl = this.updatedImageUrl || this.profileImageUrl;
    const timestamp = Date.now();
    return imageUrl + '?t=' + timestamp;
  
}
}
