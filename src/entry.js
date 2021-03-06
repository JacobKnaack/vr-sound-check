'use strict'

require('aframe');
require('./services/pitchDetect.js');
require('./services/normalizePitch.js');
require('./pitchMovement.js');
require('./services/modifyLandscape.js');
require('./services/addOpponent.js');
require('!!file-loader?name=[name].[ext]!../public/index.html');
require('../public/base.scss');
