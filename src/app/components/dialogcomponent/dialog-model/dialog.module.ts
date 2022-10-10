
// import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DialogModelComponent } from './dialog-model.component';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
    imports: [
        BrowserModule
    ],
    exports: [
        DialogModelComponent,
    ],
    declarations: [
        DialogModelComponent,
    ],
    
    entryComponents: [
        DialogModelComponent,
    ],
})
export class DialogsModule { }
