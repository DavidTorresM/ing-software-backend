export interface LoginDTO {
  email: string;
  contrasenia: string;
};

export interface RespuestaLogin {
  email: string;
  id: string;
  privilegio: string;
  access_token: string;
};
