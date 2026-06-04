const TurnoModel = require("../models/turnoModel");

// 📌 traer turnos
const listarTurnos = async () => {
  const turnos = await TurnoModel.getTurnos();
  return turnos;
};

module.exports = {
  listarTurnos,
};