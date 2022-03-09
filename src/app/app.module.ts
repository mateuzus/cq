import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThfFieldModule, ThfLoadingModule, ThfModule } from '@totvs/thf-ui';
import { RouterModule } from '@angular/router';
import { TabelaComponent } from './tabela/tabela.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TabelaService } from './tabela/tabela.service';

@NgModule({
  declarations: [
    AppComponent,
    TabelaComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    ThfModule,
    ThfLoadingModule,
    ThfFieldModule
  ],
  providers: [HttpClientModule, TabelaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
