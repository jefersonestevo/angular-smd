import "babel-polyfill";
import "reflect-metadata";
import 'zone.js/dist/zone';
import 'hammerjs'

Error['stackTraceLimit'] = Infinity;
require('zone.js/dist/long-stack-trace-zone');
