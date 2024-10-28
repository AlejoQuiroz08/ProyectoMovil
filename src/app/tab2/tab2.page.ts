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

  constructor(private file: File, private toastController: ToastController) {}

  async saveToFile() {
    const fileName = 'texto_guardado.txt';
    const filePath = this.file.dataDirectory;

    try {
      await this.file.writeFile(filePath, fileName, this.textContent, { replace: true });
      this.showToast('Texto guardado correctamente');
    } catch {
      this.showToast('Error al guardar el texto');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }
}
