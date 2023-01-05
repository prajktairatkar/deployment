import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProjectcomponentComponent } from './projectcomponent/projectcomponent.component';
import { ResourcecomponentComponent } from './resourcecomponent/resourcecomponent.component';
import { HeaderComponent } from './header/header.component';
//import { HomeComponent } from './home/home.component';
import {
  GanttAllModule,
  GanttModule,
  EditService,
} from '@syncfusion/ej2-angular-gantt';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ResfileuploadComponent } from './resfileupload/resfileupload.component';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogresourceComponent } from './dialogresource/dialogresource.component';
import { SubdialogComponent } from './subdialog/subdialog.component';
import { SrcollService } from './resourcecomponent/srcoll.service';
import { ApiService } from './shared/api.service';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    ProjectcomponentComponent,
    ResourcecomponentComponent,
    HeaderComponent,
    
    FileuploadComponent,
    ResfileuploadComponent,
    DialogComponent,
    DialogresourceComponent,
    SubdialogComponent,
    
  ],
  schemas:[NO_ERRORS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GanttModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableExporterModule
   
  ],
  providers: [DatePipe, SrcollService],
  bootstrap: [AppComponent],
})
export class AppModule {}
