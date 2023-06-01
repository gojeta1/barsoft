import { HttpClient, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  
  profileImage: string = './assets/jhon/padrao.png';
  selectedFile: any; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProfileImage();
  }

  getProfileImage() {
    this.http.get<any>('/profileImage').subscribe(
      (response) => {
        this.profileImage = response.profileImage;
      },
      (error) => {
        console.error('Erro ao recuperar a imagem do perfil: ' + error.message);
      }
    );
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  selectProfileImage() {
    // Simula o clique no input de arquivo
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  }
  
  uploadProfileImage() {

    if (!this.selectedFile) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('profileImage', this.selectedFile, this.selectedFile.name);
  
    this.http.post<any>('http://localhost:3000/uploadProfileImage', uploadData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            const percentDone = Math.round((100 * event.loaded) / event.total);
            console.log(`Upload progress: ${percentDone}%`);
          }
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload complete');
        }
      },
      (error) => {
        console.error('Erro ao fazer upload da imagem: ' + error.message);
      }
    );
  }
}