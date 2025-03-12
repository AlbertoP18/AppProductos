import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [NgFor,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent  implements OnInit{

  productos: any[] = [];
  producto = {id: null, nombre: '', precio: 0, cantidad: 0 };
  apiUrl = 'http://localhost:8080/productos/'; 

  constructor() {}

  async ngOnInit() {
    await this.obtenerProductos();
  }

  // Validaciones antes de enviar el formulario
  validarProducto() {
    if (!this.producto.nombre.trim()) {
      alert('El nombre es obligatorio');
      return false;
    }
    if (this.producto.precio < 0) {
      alert('El precio no puede ser negativo');
      return false;
    }
    if (this.producto.cantidad < 0) {
      alert('La cantidad no puede ser negativa');
      return false;
    }
    return true;
  }



  async submitProducto(event: Event) {
    event.preventDefault();
    if (!this.validarProducto()) return;

    if (this.producto.id) {
      await this.updateProducto(this.producto.id, this.producto);
    } else {
      await this.createProducto(this.producto);
    }

    this.producto = {id: null, nombre: '', precio: 0, cantidad: 0 };
    await this.obtenerProductos();
  }

  // Obtener productos
  async obtenerProductos() {
    try {
      const response = await fetch(this.apiUrl+'list');
      this.productos = await response.json();
    } catch (error) {
      console.error('Error obteniendo productos:', error);
    }
  }

  // Crear producto
  async createProducto(producto: any) {
    try {
      await fetch(this.apiUrl +'save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      });
    } catch (error) {
      console.error('Error creando producto:', error);
    }
  }

  // Editar producto
  editarProducto(prod: any) {
    this.producto = { ...prod };
  }

  // Actualizar producto
  async updateProducto(id: number, producto: any) {
    try {
      await fetch(`${this.apiUrl}${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      });
    } catch (error) {
      console.error('Error actualizando producto:', error);
    }
  }

  // Eliminar producto
  async eliminarProducto(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await fetch(`${this.apiUrl}${id}`, { method: 'DELETE' });
      await this.obtenerProductos();
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  }
}
