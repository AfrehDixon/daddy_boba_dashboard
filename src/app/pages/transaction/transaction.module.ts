import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionComponent } from './transaction.component';

@NgModule({
  declarations: [TransactionComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [TransactionComponent]
})
export class TransactionModule { }