# ip-reporter
Reports the details on a system's intefaces as JSON to a drop-off URI.

TODO:
- Collect all IPs, sort, and hash. This is the network identity.
- Keep a history of previous network identities in leveldb.
  - timestamp:hash & hash:timestamp
- Whenever the network identity changes, then send an update.
- Start by tracking this info in Cogswell (cogswell.io)
- Add notification via Cogswell campaign.

