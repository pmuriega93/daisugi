import {
    helpers,
    required,
    email,
    sameAs,
    minLength,
    maxLength
} from '@vuelidate/validators';
import type { ComputedRef } from 'vue';

export const isRequired = helpers.withMessage('Este campo es obligatorio', required);

export const isEmail = helpers.withMessage('Ingrese un correo electrónico válido', email);

export const hasMinLength = (min: number) => helpers.withMessage(`La longitud mínima es de ${min} caracteres`, minLength(min));

export const hasMaxLength = (max: number) => helpers.withMessage(`La longitud máxima es de ${max} caracteres`, maxLength(max));

export const areEqual = (field: ComputedRef) => helpers.withMessage('Deben ser iguales', sameAs(field))

// Validaciones para contraseñas
export const hasUpperCase = helpers.withMessage('Debe contener al menos una mayúscula', helpers.regex(/[A-Z|Á|É|Í|Ó|Ú|Ñ]/));

export const hasLowerCase = helpers.withMessage('Debe contener al menos una minúscula', helpers.regex(/[a-z|á|é|í|ó|ú|ñ]/));

export const hasSpecialChar = helpers.withMessage('Debe contener al menos un caracter especial', helpers.regex(/!|"|#|\$|%|'|\(|\)|\*|\+|,|-|\.|\/|:|;|<|=|>|\?|@|\[|\]|\^|_|`|{|}|~/));

export const hasNumber = helpers.withMessage('Debe contener al menos un número', helpers.regex(/\d/));

export const hasLetter = helpers.withMessage('Debe contener al menos una minúscula', helpers.regex(/[A-Z|Á|É|Í|Ó|Ú|Ñ]/i));
