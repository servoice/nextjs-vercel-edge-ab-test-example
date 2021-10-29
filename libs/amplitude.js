/* eslint-disable global-require */
let amplitude;

export const amplitudeInit = () => {
  amplitude = require('amplitude-js');
  // Make sure to add .env.local or add variable to vercel
  amplitude.getInstance().init(process.env.NEXT_PUBLIC_AMPLITUDE);
};

// Log initial exposure and user exposure
export const logExperimentExposure = (experimentId, cohort) => {
  const userExperimentProperties = new amplitude.Identify()
    .setOnce('[Experiments] Name', experimentId)
    .setOnce('cohort', cohort);

  amplitude.getInstance().identify(userExperimentProperties);
  amplitude
    .getInstance()
    .logEvent('[Experiments] Exposure', { cohort: experimentId });
};

// Generic amplitude event logger
// Can add properties for more advanced analytics
export const logEvent = (event) => {
  amplitude.getInstance().logEvent(event);
};
