import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing-module';
import { Usuarios } from './usuarios';
import { UsuarioDialog } from './components/usuario-dialog/usuario-dialog';
import { MaterialModule } from "../../../material_module";
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Usuarios,
    UsuarioDialog,
    
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MaterialModule
]
})
export class UsuariosModule { }
