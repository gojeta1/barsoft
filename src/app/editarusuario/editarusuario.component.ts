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
  userId: any;
  isProfileImageUpdated: any;



  constructor(private http: HttpClient, private route: ActivatedRoute, private authenticationService: AuthenticationService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.userId = localStorage.getItem('userId')
    const storedProfileImage = localStorage.getItem('profileImagem');
  if (!storedProfileImage || storedProfileImage === '') {
    this.profileImage = './assets/jhon/padrao.png';
  } else {
    this.profileImage = storedProfileImage;
  }
    setTimeout(() => {
      this.getProfileImage();
      this.cdr.detectChanges();
    });
  }


  getProfileImage() {
    const timestamp = new Date().getTime();
    let imageUrl = `http://localhost:3000/users/${this.userId}/profileImage?timestamp=${timestamp}`;

    console.log('Valor de this.profileImage:', this.profileImage);

    if (!this.profileImage || this.profileImage.includes('undefined')) {
      // Consultar o banco de dados para obter o caminho da foto de perfil
      this.http.get<any>(`http://localhost:3000/users/${this.userId}`).subscribe(
        (response) => {
          if (response && response.profile_image) {
            // Caso tenha um caminho de imagem no banco de dados
            this.profileImage = response.profile_image;
            localStorage.clear();
          } else {
            // Caso não tenha um caminho de imagem no banco de dados, usar imagem padrão
            this.profileImage = './assets/jhon/padrao.png';
          }
        },
        (error) => {
          console.error('Erro ao obter a foto de perfil do usuário:', error);
          // Caso ocorra algum erro, usar imagem padrão
          this.profileImage = './assets/jhon/padrao.png';
        }
      );
    }
  
    this.profileImage = imageUrl; // Atribui novamente a URL com o timestamp atualizado
    localStorage.setItem('userId', this.userId);
    localStorage.setItem('profileImagem', this.profileImage);
    console.log('Valor de this.profileImage após atribuição:', this.profileImage);
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