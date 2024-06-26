import { FormGroup } from '@angular/forms';
import { CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';
import { NavigationService } from '../services/navigation-service.service';
import { inject } from '@angular/core';

export const exitPopUpGuard: CanActivateFn = async (route, state) => {
  const navigationService = inject(NavigationService);
  const form:FormGroup = (route as {[key:string]:any})['form'];

  if(!form.dirty && form.touched !== true){
    navigationService.confirmNavigation();
    return true;
  }
  const result = await Swal.fire({
    title: 'Você tem certeza?',
    text: 'suas alterações não foram salvas',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  }).then((e)=>{
    if(!e.isConfirmed){ navigationService.confirmNavigation(); }
    return e
  });

  return result.isConfirmed;
};