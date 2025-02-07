import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CasesService } from '../../services/cases.service';


export const isEdittingResolver: ResolveFn<void> = () => {
  const casesService = inject(CasesService);
  casesService.setIsEditing();
};
