import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  showErrorAlert(title: string, text?: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
    });
  }
}
