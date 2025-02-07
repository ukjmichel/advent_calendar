import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CasesService } from '../../services/cases.service';


export const isNotEdittingResolver: ResolveFn<void> = () => {
  const casesService = inject(CasesService);
  casesService.cancelIsEditting();
};
