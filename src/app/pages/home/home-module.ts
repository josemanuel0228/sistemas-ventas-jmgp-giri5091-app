import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing-module';
import { Home } from './home';
import { MaterialModule } from '../../../material_module';
import { MatGridList, MatGridListModule, MatGridTile } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    Home
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    MatGridList,
    MatGridTile,
    MatGridListModule
]
})
export class HomeModule { }
