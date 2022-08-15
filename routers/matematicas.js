const express = require("express");
const { matematicas } = require("../datos/cursos").infoCursos
const routerMatematicas = express.Router();

routerMatematicas.get("/", (req, res) => {
  const lenguaje = req.params.lenguaje;
  res.send(JSON.stringify(matematicas));
});

routerMatematicas.get("/:tema", (req, res) => {
  const tema = req.params.tema;
  const resultados = matematicas.filter(
    (cursos) => cursos.tema === tema
  );
  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${tema}`);
  }
  res.send(JSON.stringify(resultados));
});

routerMatematicas.get("/:tema/:nivel", (req, res) => {
  const tema = req.params.tema;
  const nivel = req.params.nivel;
  const resultados = matematicas.filter(
    (cursos) => cursos.tema === tema && cursos.nivel === nivel
  );
  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`No se encontraron cursos de ${tema} de nivel ${nivel}`);
  }
  res.send(JSON.stringify(resultados));
});


module.exports = routerMatematicas