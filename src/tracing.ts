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
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { credentials, Metadata } from '@grpc/grpc-js';

const metadata = new Metadata()
metadata.set('x-honeycomb-team', process.env.HONEYCOMB_API_KEY);
metadata.set('x-honeycomb-dataset', process.env.HONEYCOMB_DATASET || 'otel-db-band-names');

const traceExporter = new OTLPTraceExporter({
  url: 'grpc://api.honeycomb.io:443/',
  credentials: credentials.createSsl(),
  metadata
}); 

const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'band-names',
  }),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations(), new TypeormInstrumentation({})]
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
});

export default tracingStartup; // wait for this if you want to
