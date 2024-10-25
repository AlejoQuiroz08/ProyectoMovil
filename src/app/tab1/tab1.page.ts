import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  inicio: string = '';
  fin: string = '';
  diferencia: number | null = null;

  calcular() {
    if (this.inicio && this.fin) {
      const inicio1 = new Date(this.inicio);
      const fin1 = new Date(this.fin);
      const diffTime = Math.abs(fin1.getTime() - inicio1.getTime());
      this.diferencia = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } else {
      this.diferencia = null;
    }
  }
}
