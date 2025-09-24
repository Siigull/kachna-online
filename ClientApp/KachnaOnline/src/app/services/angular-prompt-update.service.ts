import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class PromptUpdateService {
  constructor(updates: SwUpdate) {
    updates.available.subscribe(() => {
      updates.activateUpdate().then(() => { 
        console.log("Angular version updated."); 
        document.location.reload()
      });
    });
  }
}
