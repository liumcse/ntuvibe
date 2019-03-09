const { src, dest } = require("gulp");

function move() {
  return src("static_sites/**/*").pipe(dest("dist/"));
}

exports.move = move;
