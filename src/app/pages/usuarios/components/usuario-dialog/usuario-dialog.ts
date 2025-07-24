import { A } from '@angular/cdk/keycodes';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BaseForm } from '../../../../shared/utils/base form';
import { UsuarioService } from '../../service/usuarios';
import { UsuarioResponse } from '../../../../shared/models/usuario.interface';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}
@Component({
  selector: 'app-usuario-dialog',
  standalone: false,
  templateUrl: './usuario-dialog.html',
  styleUrl: './usuario-dialog.scss'
})
export class UsuarioDialog implements OnInit {
  actionTODO = Action.NEW;
  titleButton = "Guardar";
  usuarioForm = this.fb.group({
    cveUsuario: [''],
    nombre: ['', [Validators.required]],
    apellidos:['', [Validators.required]],
    username: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    password:['',[Validators.required] ]
    });
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef : MatDialogRef<UsuarioDialog>,
                private fb: FormBuilder,
                public baseForm: BaseForm,
                private usuarioSvc: UsuarioService,
     
              ){}
    ngOnInit(): void {
      this.pathData();
    }

    onSave(){
      if (this.usuarioForm.invalid) return;
          console.log(this.usuarioForm.value); // Verifica que los datos estén correctos

      const formValues = this.usuarioForm.getRawValue();

      if (this.actionTODO == Action.NEW) {
        var newUsuario: UsuarioResponse = {
          nombre: formValues.nombre ? formValues.nombre: '',
          apellidos: formValues.apellidos ? formValues.apellidos: '',
          username: formValues.username ? formValues.username: '',
          correo: formValues.correo ? formValues.correo: '',
          password: formValues.password ? formValues.password: ''
        }

        this.usuarioSvc.newUsuario(newUsuario).subscribe(result => {
          this.dialogRef.close(result);
        });
      } else{
        var updateUser: UsuarioResponse = {
          cveUsuario: formValues.cveUsuario ? parseInt(formValues.cveUsuario) : 0,
          nombre: formValues.nombre ? formValues.nombre : '',
          apellidos: formValues.apellidos ? formValues.apellidos : '',
          username: formValues.username ? formValues.username: '',
          correo: formValues.correo ? formValues.correo: '',
          password: formValues.password ? formValues.password: ''

        }

        this.usuarioSvc.updateUsuario(updateUser).subscribe(result => {
          this.dialogRef.close(result);
        });
        }
      }

      pathData(){
        if(this.data.usuario.cveUsuario){
          this.actionTODO = Action.EDIT;
          this.titleButton = "Editar";
          this.usuarioForm.patchValue({
            cveUsuario: this.data.usuario?.cveUsuario,
            nombre: this.data.usuario?.nombre,
            apellidos: this.data.usuario.apellidos,
            username: this.data.usuario.username,
            correo: this.data.usuario.correo,
            password: this.data.usuario.password
          });
        
          this.usuarioForm.updateValueAndValidity();
          }
        }


        onClear(){
          this.usuarioForm.reset()
        }
        


    }
    