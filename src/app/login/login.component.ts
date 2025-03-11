import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {}

    usuario = { nombre: '', contrasena: '' };
    

    async onLogin(event: Event) {

      event.preventDefault(); 

      if (!this.usuario.nombre || !this.usuario.contrasena) {
        alert('Todos los campos son obligatorios.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/user/credenciales', {

          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.usuario)
        });

        if (!response.ok) {
          throw new Error('Usuario o contraseña incorrectos');
        }

        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));

        if (data.rol_id === 1) {
          this.router.navigate(['/adminpage']); 
        } else if (data.rol_id === 2) {
          this.router.navigate(['/userpage']); 
        } 
        
      } catch (error) {
        alert("Acceso denegado. ");
      }
    }


  }


