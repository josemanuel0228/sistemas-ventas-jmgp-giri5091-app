import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {  UsuarioService } from './service/usuarios';
import { UsuarioResponse } from '../../shared/models/usuario.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioDialog } from './components/usuario-dialog/usuario-dialog';
import { DefaultResponse } from '../../shared/models/default.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios implements OnInit{
displayedColumns: string[] = [ "cveUsuario", "nombre", "apellidos", "username","correo", "fechaRegistro", "actions"];
  usuarios = new MatTableDataSource();

  constructor(private usuarioSvc: UsuarioService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ){}


  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.usuarioSvc.getUsuarios()
    .subscribe( (usuarios:UsuarioResponse[]) => {
            console.log(usuarios); // 🔍 Revisa en consola del navegador
      this.usuarios.data = usuarios;  
    })
  }

  onOpenModal( usuario: any = {}) {
    const dialogRef = this.dialog.open(UsuarioDialog, {
      minWidth: '60%',
      data: {
        title: 'Reguistro de Usuarios'
      }
    });

    dialogRef.afterClosed().subscribe( (result: DefaultResponse) => {
      if (result) {
        this.snackBar.open(result.mensaje, '', {
          duration: 5 * 1000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'end',
          verticalPosition: 'top'
        })
        this.listar();
      }
    });
  }

  onDelete(cveUsuario:number){
          Swal.fire({
            title: '',
            text: '¿Realmente desea eliminar el registro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'darkBlue',
            cancelButtonColor: 'darkRed',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'  
          }).then( (result) => {
            if (result.isConfirmed){
              this.usuarioSvc.deleteUsuario(cveUsuario).subscribe( (res: DefaultResponse) => {
                this.snackBar.open(res.mensaje, '', {
                  duration: 5 * 1000,
                  panelClass: ['success-snackbar'],
                  horizontalPosition: 'end',
                  verticalPosition: 'top'
                })
                this.listar();
              });
            }
          }) ;
        }

}
