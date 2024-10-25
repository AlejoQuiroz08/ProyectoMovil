import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  display: string; // Define la propiedad 'display' como string
  buttons: (string | number)[]; // Define la propiedad 'buttons'

  constructor() {
    this.display = ''; // Inicializa 'display' como un string vacío
    this.buttons = ['C', '/', '*', '-', 7, 8, 9, '+', 4, 5, 6, '=', 1, 2, 3, 0]; // Inicializa los botones
  }

  // Maneja las operaciones cuando se hace clic en un botón
  buttonClicked(button: string | number) {
    if (button === 'C') {
      this.display = ''; // Limpia el display
    } else if (button === '=') {
      this.calculate(); // Realiza el cálculo
    } else {
      this.display += button; // Agrega el número u operación al display
    }
  }

  // Realiza el cálculo y actualiza el display
  calculate() {
    try {
      // Evalúa la expresión y la muestra
      this.display = eval(this.display).toString();
    } catch (e) {
      this.display = 'Error'; // Muestra error si hay un fallo
    }
  }
}