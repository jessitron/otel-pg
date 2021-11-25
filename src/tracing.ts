// tracing.js

'use strict'

import process = require('process');
import opentelemetry = require('@opentelemetry/sdk-node');
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { TypeormInstrumentation } from 'opentelemetry-instrumentation-typeorm';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

import * as otel from "@opentelemetry/api";

// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const traceExporter = new opentelemetry.tracing.ConsoleSpanExporter();
const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'band-names',
  }),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()]//[new TypeormInstrumentation({})]
});



// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
const tracingStartup = sdk.start()
  .then(() => {
    const tracerProvider = otel.trace;
  console.log('Tracing initialized' + tracerProvider)}
  )
  .catch((error) => console.log('Error initializing tracing', error));


// gracefully shut down the SDK on process exit
// Note: If the program exits naturally because it's done, this won't help you
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

export default tracingStartup; // wait for this if you want to
