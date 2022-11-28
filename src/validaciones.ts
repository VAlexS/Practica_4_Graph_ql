export function validarDNI(dni: string) : boolean{
    
        const reg_exp_dni = /^[XYZ]?\d{5,8}[A-Z]$/;
    
        
        const parametro_dni = dni.toUpperCase();
        if(!reg_exp_dni.test(parametro_dni)){
            return false;
        }
        
        const numero_dni = Number(parametro_dni.substring(0, parametro_dni.length - 1));
        const letra_dni = parametro_dni.substring(parametro_dni.length - 1, parametro_dni.length);
        const resto = numero_dni % 23;
        let letra_correcta = '';
        switch(resto){
            case 0: letra_correcta = 'T'; break;
            case 1: letra_correcta = 'R'; break;
            case 2: letra_correcta = 'W'; break;
            case 3: letra_correcta = 'A'; break;
            case 4: letra_correcta = 'G'; break;
            case 5: letra_correcta = 'M'; break;
            case 6: letra_correcta = 'Y'; break;
            case 7: letra_correcta = 'F'; break;
            case 8: letra_correcta = 'P'; break;
            case 9: letra_correcta = 'D'; break;
            case 10: letra_correcta = 'X'; break;
            case 11: letra_correcta = 'B'; break;
            case 12: letra_correcta = 'N'; break;
            case 13: letra_correcta = 'J'; break;
            case 14: letra_correcta = 'Z'; break;
            case 15: letra_correcta = 'S'; break;
            case 16: letra_correcta = 'Q'; break;
            case 17: letra_correcta = 'V'; break;
            case 18: letra_correcta = 'H'; break;
            case 19: letra_correcta = 'L'; break;
            case 20: letra_correcta = 'C'; break;
            case 21: letra_correcta = 'K'; break;
            case 22: letra_correcta = 'E'; break;
        }

        return letra_correcta === letra_dni;
}

export function validarMatricula(matricula: string) : boolean{
    
    const reg_exp_matricula = /^[0-9]{4}\s[BCDFGHJKLMNPQRSTVWXYZ]{3}$/;
    
    if(!reg_exp_matricula.test(matricula.toUpperCase())){
        return false;
    }
    return true;
}

