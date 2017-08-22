import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SocketService} from "./socket.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      // SocketService
  ],
  providers:[
    // SocketService
  ],
  exports:[
      // SocketService
  ]
})
export class CoreModule {

  // constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
  //   if (parentModule) {
  //     throw new Error(
  //         'CoreModule is already loaded. Import it in the AppModule only');
  //   }
  // }
  //
  // static forRoot(SocketService: SocketService): ModuleWithProviders {
  //   return {
  //     ngModule: CoreModule,
  //     providers: [
  //       {provide: SocketService, useValue: SocketService }
  //     ]
  //   };
  // }
}

