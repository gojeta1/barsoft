import { HttpClient, HttpEventType } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit, AfterViewInit {
  profileImage: string = '';
  selectedFile: File | null = null;
  userId: number;
  isProfileImageUpdated: any;



  constructor(private http: HttpClient, private route: ActivatedRoute, private authenticationService: AuthenticationService, private cdr: ChangeDetectorRef) {this.userId = this.authenticationService.getUserId()}

  ngOnInit() {

  }

  ngAfterViewInit() {
      this.getProfileImage();
      this.cdr.detectChanges();

  }


  getProfileImage() {
    const timestamp = new Date().getTime();
    const imageUrl = `http://localhost:3000/users/${this.userId}/profileImage?timestamp=${timestamp}`;
 
    if(this.profileImage == './rotas backend/uploads'){
      this.profileImage = './assets/jhon/padrao.png'
    }else{
      this.profileImage = imageUrl; // Atribui novamente a URL com o timestamp atualizado
    }
  }

  getCurrentTimestamp() {
    return new Date().getTime();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadProfileImage() {
    if (!this.selectedFile) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('profileImage', this.selectedFile, this.selectedFile.name);

    const timestamp = new Date().getTime(); // Obtenha o timestamp atual

    this.http.put<any>(`http://localhost:3000/users/${this.userId}/profileImage?timestamp=` + timestamp, uploadData,{reportProgress: true,
    observe: 'events'}).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Mostrar progresso do upload, se necessário
          const progress = Math.round((event.loaded / event.total) * 100);
          console.log(`Progresso do upload: ${progress}%`);
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload completo');
         // Ajuste o tempo de atraso conforme necessário
        }
        
      },
      (error) => {
        console.error('Erro ao fazer upload da imagem:', error);
      }
    );
  }
}