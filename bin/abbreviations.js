"use strict";

const { HELP_OPTION, DRY_RUN_OPTION, VERSION_OPTION, LOG_LEVEL_OPTION } = require("./options");

const h = HELP_OPTION,
      d = DRY_RUN_OPTION,
      v = VERSION_OPTION,
      l = LOG_LEVEL_OPTION

module.exports = {
  h,
  d,
  v,
  l
};
