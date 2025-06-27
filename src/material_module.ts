import { NgModule } from  "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

const myModules: any = [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
];
@NgModule({
    imports: [...myModules],
    exports: [...myModules]
})
export class MaterialModule {}