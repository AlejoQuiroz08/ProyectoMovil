import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  textContent: string = '';
  showToast = false;
  toastMessage: string = '';

  constructor(private file: File, private toastController: ToastController) {}

  async saveToFile() {
    const fileName = 'texto_guardado.txt';
    const filePath = this.file.dataDirectory;

    try {
      // Crear el archivo y escribir el contenido
      await this.file.writeFile(filePath, fileName, this.textContent, { replace: true });
      this.showToastMessage('Texto guardado correctamente');
    } catch (error) {
      this.showToastMessage('Error al guardar el texto');
      console.error('Error al guardar el archivo:', error);
    }
  }

  async showToastMessage(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }
}
