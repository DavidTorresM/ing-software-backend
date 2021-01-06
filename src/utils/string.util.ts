import * as bcrypt from 'bcrypt';

export const encryptText = (text: string): string => bcrypt.hashSync(text, process.env.BCRYPT_SALT);
