import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { MappingManagementService } from './services/mapping.management.service';
import { ErrorHandlerService } from './services/error.handler.service';


import { HelloWorldComponent } from './components/hello.world.component';
import { ModalWindowComponent, TestModalComponent } from './components/modal.window.component';
import { DataMapperErrorComponent } from './components/data.mapper.error.component';

import { DocumentFieldDetailComponent } from './components/document.field.detail.component';
import { DocumentDefinitionComponent } from './components/document.definition.component';

import { MappingFieldDetailComponent } from './components/mapping.field.detail.component';
import { MappingFieldSectionComponent } from './components/mapping.field.section.component';
import { TransitionListComponent } from './components/transition.list.component';
import { MappingDetailComponent } from './components/mapping.detail.component';

import { DataMapperAppComponent } from './components/data.mapper.app.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ DataMapperAppComponent, DocumentDefinitionComponent, MappingDetailComponent, 
  					TransitionListComponent, MappingFieldSectionComponent, ModalWindowComponent,
  					HelloWorldComponent, TestModalComponent, MappingFieldDetailComponent, DocumentFieldDetailComponent,
  					DataMapperErrorComponent ],
  providers: [ ],
  entryComponents: [ HelloWorldComponent ],
  bootstrap:    [ DataMapperAppComponent ]
})
export class AppModule { }