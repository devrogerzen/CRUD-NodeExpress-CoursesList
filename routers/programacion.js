const express = require("express");
const { programacion } = require("../datos/cursos").infoCursos;
const routerProgramacion = express.Router();

//middleware
routerProgramacion.use(express.json());

routerProgramacion.get("/", (req, res) => {
  //res.send(infoCursos)
  //.send transforma automatico a JSON.stringify()
  //.json el argumento se comvierte en formato JSON ants de ser enviado
  res.send(programacion);
});

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(
    (cursos) => cursos.lenguaje === lenguaje
  );
  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }
  if (req.query.ordenar === "vistas") {
    return res.send(
      JSON.stringify(resultados.sort((a, b) => a.vistas - b.vistas))
    );
  }
  res.send(JSON.stringify(resultados));
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = programacion.filter(
    (cursos) => cursos.lenguaje === lenguaje && cursos.nivel === nivel
  );
  if (resultados.length === 0) {
    /*  return res
      .status(404)
      .send(`No se encontrarion cursos de ${lenguaje} de nivel ${nivel}`); */
    //.end envia una respuesta vacia y corta el proceso
    return res.status(404).end();
  }
  res.send(JSON.stringify(resultados));
});

routerProgramacion.post("/", (req, res) => {
  let cursoNuevo = req.body;
  programacion.push(cursoNuevo);
  res.send(JSON.stringify(programacion));
});

routerProgramacion.put("/:id", (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    programacion[indice] = cursoActualizado;
  }
  res.send(JSON.stringify(programacion));
});

routerProgramacion.patch("/:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;
  const indice = programacion.findIndex((curso) => curso.id == id);
  if (indice >= 0) {
    const cursoAModificar = programacion[indice];
    //.assign permite pasar objeto a modificar, con objeto que tiene
    //propiedades y valores
    Object.assign(cursoAModificar, infoActualizada);
  }
  res.send(JSON.stringify(programacion));
});

routerProgramacion.delete("/:id", (req, res) => {
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    //splice corta en el indice y , numero de elementos a eliminar 1
    programacion.splice(indice, 1);
  }
  res.send(JSON.stringify(programacion));
});

module.exports = routerProgramacion;
