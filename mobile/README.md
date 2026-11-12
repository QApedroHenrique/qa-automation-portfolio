# Mobile flows (Maestro)

UI flows for the open-source [Wikipedia Android app](https://github.com/wikimedia/apps-android-wikipedia) (`org.wikipedia`), written with [Maestro](https://maestro.mobile.dev).

| Flow | What it covers |
| --- | --- |
| `flows/search_article.yaml` | Fresh install → skip onboarding → search → open the article |
| `subflows/skip_onboarding.yaml` | Reusable step that skips onboarding only when it is shown |

## Running

Requirements: [Maestro CLI](https://maestro.mobile.dev/getting-started/installing-maestro), an Android emulator or device, and the Wikipedia app installed (Google Play or the APK from the project's releases).

```bash
maestro test mobile/flows             # all flows
maestro test mobile/flows --include-tags smoke
maestro studio                        # inspect elements interactively
```

These flows are not part of CI because they need an Android emulator.
