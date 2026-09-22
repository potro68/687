687 JAPAN V1.85.5 FORCE REFRESH

Deploy BOTH files together to the SAME production root that currently serves https://tripjpn.app/:
- index.html
- service-worker.js

This package keeps the legal links on go687.com and forces the existing service worker/browser cache to refresh.

IMPORTANT:
If the app still opens tripjpn.app/privacy.html after deploying these exact two files, the app is not loading this deployment root. In that case the problem is the deployment source/path, not the HTML links.
