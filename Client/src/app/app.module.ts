import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CovalentLayoutModule, CovalentStepsModule } from '@covalent/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginModule } from './login/login.module';
import { WorkModule } from './work/work.module';
import { routing } from './app.routing';
import { RestfulService } from './restful.service';
import { AuthGuard } from './auth-guard';
import { UpdateFlagService } from './updateflag.service'
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    BrowserModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    LoginModule,
    WorkModule,
    routing
  ],
  providers: [RestfulService, AuthGuard, UpdateFlagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
