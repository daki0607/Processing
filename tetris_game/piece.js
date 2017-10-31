// Fix me!
// function drawPiece(piece, x, y) {
//   switch (piece) {
//     case "I":
//       stroke(0)
//       fill(color(0, 255, 255))
//       rect(x, y, scl, scl)
//       break
//
//     case "O":
//       stroke(0)
//       fill(color(255, 255, 0))
//       rect(x, y, scl, scl)
//       break
//
//     case "T":
//       stroke(0)
//       fill(color(255, 0, 255))
//       rect(x, y, scl, scl)
//       break
//
//     case "J":
//       stroke(0)
//       fill(color(0, 255, 255))
//       rect(x, y, scl, scl)
//       break
//
//     case "L":
//       stroke(0)
//       fill(color(0, 255, 255))
//       rect(x, y, scl, scl)
//       break
//
//     case "S":
//       stroke(0)
//       fill(color(0, 255, 255))
//       rect(x, y, scl, scl)
//       break
//
//     case "Z":
//       stroke(0)
//       fill(color(0, 255, 255))
//       rect(x, y, scl, scl)
//       break
//
//     default:
//       stroke(0)
//       fill(51)
//       rect(x, y, scl, scl)
//   }
// }

var pieces = [];

function Piece () {
  choice = floor(random() * 7);
}
