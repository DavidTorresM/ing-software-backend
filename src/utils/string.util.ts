import * as bcrypt from 'bcrypt';

export const encryptText = (text: string): string => bcrypt.hashSync(text, process.env.BCRYPT_SALT);

export const enum Privilege {
    ADMINISTRADOR="ADMINISTRADOR",
    ALUMNO="ALUMNO",
    DOCENTE="DOCENTE",
}

