// Google Analytics 4 on plantalk.ai (chosen 2026-11-09). Paste the web stream's Measurement ID
// here (Google Analytics › Admin › Data streams › plantalk.ai). Empty means analytics is off:
// no Google script, no cookie banner and no "Cookie settings" link.
export const GA_MEASUREMENT_ID: string = "";

// Analytics cookies wait for consent in the EEA, the UK and Switzerland, the regions in
// Google's EU user consent policy. Google matches these codes against the visitor's IP.
export const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV",
  "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];

// The visitor's choice, kept in localStorage as "granted" or "denied".
export const CONSENT_KEY = "plantalk-analytics-consent";

// Dispatched on window by the footer's "Cookie settings" button to reopen the banner.
export const OPEN_SETTINGS_EVENT = "plantalk:cookie-settings";

// Runs first in <head>: Consent Mode defaults (analytics denied in the regions above and
// granted elsewhere, ads always denied), then the visitor's saved choice. Pages are only
// measured on plantalk.ai itself, so local and preview builds send nothing.
export function consentBootstrap(id: string) {
  const ads = "ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'";
  return [
    "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}",
    `gtag('consent','default',{${ads},analytics_storage:'denied',region:${JSON.stringify(CONSENT_REGIONS)}});`,
    `gtag('consent','default',{${ads},analytics_storage:'granted'});`,
    `try{var c=localStorage.getItem('${CONSENT_KEY}');if(c==='granted'||c==='denied')gtag('consent','update',{analytics_storage:c});}catch(e){}`,
    "gtag('js',new Date());",
    `if(location.hostname==='plantalk.ai')gtag('config','${id}');`,
  ].join("");
}
