module.exports = [
  ['rojo', 1],
  ['verde', 2],
  ['azul', 4],
  ['blanco', 7],
  ['cian', 6],
  ['magenta', 5],
  ['amarillo', 3],
  ['negro', 0]
].reduce(
  (cols, col) => ({
    ...cols,
    [col[0]]: f => `\x1b[3${col[1]}m${f}\x1b[0m`
  }),
  {}
);
