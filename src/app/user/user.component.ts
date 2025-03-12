import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [NgFor],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  productos: any[] = [];
  producto = {id: null, nombre: '', precio: 0, cantidad: 0 };
  apiUrl = 'http://localhost:8080/productos/'; 

  constructor() {}

  async ngOnInit() {
    await this.obtenerProductos();
  }


  async obtenerProductos() {
    try {
      const response = await fetch(this.apiUrl+'list');
      this.productos = await response.json();
    } catch (error) {
      console.error('Error obteniendo productos:', error);
    }
  }
}
