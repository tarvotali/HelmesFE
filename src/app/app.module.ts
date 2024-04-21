import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AppFooterComponent} from "./components/footer/app-footer.component";
import {AppHeaderComponent} from "./components/header/app-header.component";
import {AppBodyComponent} from "./components/body/app-body.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, AppFooterComponent, AppHeaderComponent, AppBodyComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {
}
