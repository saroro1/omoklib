const {Omok} = require("./src/Omok/OmokMain");
const {Occupied, InvalidPosition, PutError, Forbid33, Forbid44, Forbid6, Forbid, BlackWins, WhiteWins, PutComplete,} = require("./src/Omok/PutResult/putResult");
module.exports = {
    "Omok" : Omok,
    "Occupied" : Occupied,
    "InvalidPosition" : InvalidPosition,
    "PutError" : PutError,
    "Forbid33" : Forbid33,
    "Forbid44" : Forbid44,
    "Forbid6" : Forbid6,
    "Forbid" : Forbid,
    "BlackWins" : BlackWins,
    "WhiteWins" : WhiteWins,
    "PutComplete" : PutComplete,
}