import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({providedIn: 'root'})
export class BaseForm{
    constructor (){}
    isInvalidField(form: AbstractControl | null): boolean{
        var bandera = false;
        if (form){
            bandera = form.touched || form.dirty && form.invalid;
        }
        return bandera; 
    }
    getErrorMessage(form:AbstractControl | null){
        let message ='';
        if(form){
            const {errors } = form;

            if(errors){
                const messages: any ={
                    reqired: 'Campo requerido',
                    email: 'Formato Inválido',
                    pattern: 'Formato Inválido',
                    min: 'El rengo no es correcto',
                    max: 'El rango no es correcto',
                    minlength: 'Formato Invalido'
                }

                const errorKey = Object.keys(errors).find(Boolean);
                if (errorKey) message = messages[errorKey];
                
            }
        }
        return message;
    }
}