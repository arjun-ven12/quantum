# Android release build

Quantum Atlas packages its existing offline web application in a Capacitor Android shell. The package ID is `com.quantumatlas.app`. The `v0.1.0` APK targets Android 15 (API 35) and supports Android 6 (API 23) and newer.

## Prerequisites

- Node.js 20 or newer, npm, JDK 21, and Android SDK platform 35 with Android build tools.
- A release signing keystore. Keep the keystore and its passwords in a private backup. **The same key is required to publish an update that installs over a previous APK.** Neither is committed to Git or attached to the public release.

Set `ANDROID_HOME` to your Android SDK directory and `JAVA_HOME` to your JDK 21 directory. Install dependencies with `npm ci`.

## Build

For a local debug APK:

```sh
npm run android:debug
```

For a signed release APK, set these environment variables before running the build:

```sh
export QUANTUM_ATLAS_KEYSTORE=/private/path/to/quantum-atlas-release.p12
export QUANTUM_ATLAS_STORE_PASSWORD=your-private-password
export QUANTUM_ATLAS_KEY_PASSWORD=your-private-password
npm run android:release
```

The release APK is written to `android/app/build/outputs/apk/release/app-release.apk`. Install it by downloading it to an Android device, opening the file, and allowing installation from the download source if Android requests it. An APK installed this way does not receive automatic updates from GitHub.

The wrapper bundles the built lessons, simulations, fonts, service worker, and textbook PDF. Personal notes and progress remain in the app's local IndexedDB storage. Export those data from Settings before clearing app data or uninstalling; Android may remove local app data on uninstall.

For later releases, update both `package.json` and the `versionCode`/`versionName` values in `android/app/build.gradle`. Increment `versionCode` for each update, and sign with the same private key.
