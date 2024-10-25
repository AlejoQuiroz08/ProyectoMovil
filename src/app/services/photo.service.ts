import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: UserPhoto[] = [];

  public async addNewToGallery() {
    // Capturar la foto con la cámara
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    // Guardar la imagen y agregarla a la galería
    const savedImageFile = await this.SavePicture(capturedPhoto);
    this.photos.unshift(savedImageFile); // Agregar la imagen guardada al array de fotos
  }

  private async SavePicture(photo: Photo): Promise<UserPhoto> {
    // Convertir la foto a base64
    const base64Data = await this.readAsBase64(photo);
    const fileName = Date.now() + '.jpeg'; // Agregar el punto antes de 'jpeg'

    // Guardar la imagen en el sistema de archivos
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    // Retornar el objeto UserPhoto con la ruta del archivo
    return {
      filepath: fileName,
      webviewPath: photo.webPath, // Asegurarse de usar 'webviewPath' en minúsculas
    };
  }

  private async readAsBase64(photo: Photo): Promise<string> {
    const response = await fetch(photo.webPath!); // Asegurar el uso del '!'
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string); // Forzar el tipo como string
      };
      reader.readAsDataURL(blob);
    });

  constructor() {}
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
