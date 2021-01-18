
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const { Pool, Client } = require("pg");

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Polimeet',
  password: '130997',
  port: 5432,
}); 

const path =  'datos';
let sql = '';

const leerDatos = async ruta => {
  const filas = await readXlsxFile(`${path}/${ruta}`);
  filas.shift();

  return filas;
};

const insertarColonias = colonias => colonias.forEach(colonia => sql += `INSERT INTO public.colonia(nombre) VALUES ('${colonia[1]}');\n`); 

const insertarDelegaciones = delegaciones => delegaciones.forEach(delegacion => sql += `INSERT INTO public.delegacion(nombre) VALUES ('${delegacion[1]}');\n`);

const insertarEstados = estados => estados.forEach(estado => sql += `INSERT INTO public.estado(nombre) VALUES ('${estado[1]}');\n`);

const insertarDirecciones = direcciones => direcciones.forEach(direccion => sql += `INSERT INTO public.direccion(calle, numero, "idColonia", "idDelegacion", "idEstado") VALUES ('${direccion[1]}', ${direccion[2]}, ${direccion[3]}, ${direccion[4]}, ${direccion[5]});\n`);

const main = async () => {
  const colonias = await leerDatos('Colonia.xlsx');
  const delegaciones = await leerDatos('Delegacion.xlsx');
  const estados = await leerDatos('Estado.xlsx');
  const direcciones = await leerDatos('Dir.xlsx');


  insertarColonias(colonias);
  insertarDelegaciones(delegaciones);
  insertarEstados(estados);
  insertarDirecciones(direcciones);
  //console.clear();
  console.log(sql);
};

main();