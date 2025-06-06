
/**
 * Heuristic APK detector for Android, with DEBUG support for desktop testing.
 */
function guessBestAPK(debug = false) {
  try {
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const memory = navigator.deviceMemory || 0;

    // Force simulate Android if in debug mode
    const isAndroid = /Android/i.test(ua) || debug;

    if (!isAndroid) {
      console.warn("Not an Android device — APK download skipped.");
      return null;
    }

    // Scoring system
    const scores = {
      arm64: 0,
      arm32: 0,
      x64: 0
    };

    // User-agent based detection
    if (/arm64|aarch64/i.test(ua)) scores.arm64 += 3;
    if (/armv7|armeabi/i.test(ua)) scores.arm32 += 3;
    if (/x86_64|x64|x86/i.test(ua)) scores.x64 += 3;

    // Memory hints
    if (memory >= 4) scores.arm64 += 2;
    else if (memory > 0 && memory <= 2) scores.arm32 += 1;

    // Platform string detection
    if (/Linux aarch64/.test(platform)) scores.arm64 += 2;
    else if (/Linux armv7l/.test(platform)) scores.arm32 += 2;
    else if (/Linux x86_64/.test(platform)) scores.x64 += 2;

    // Android version
    const versionMatch = ua.match(/Android\s([0-9.]+)/);
    let androidVersion = null;
    if (versionMatch) {
      androidVersion = parseFloat(versionMatch[1]);
      if (androidVersion >= 9) scores.arm64 += 1;
      else if (androidVersion <= 6) scores.arm32 += 1;
    }

    // Best match
    const bestArch = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

    // APK URLs
    const apkLinks = {
      arm64: "https://onbush237.com/apps/x64/onBush_arm64.apk",
      arm32: "https://onbush237.com/apps/x64/onBush_arm32.apk",
      x64: "https://onbush237.com/apps/x64/onBush_x64.apk"
    };

    const result = {
      bestVersion: bestArch,
      apkURL: apkLinks[bestArch],
      debug: debug,
      userAgent: ua,
      platform: platform,
      memory: memory,
      androidVersion: androidVersion,
      scoreBreakdown: scores
    };

    console.log("APK Detection Result:", result);

    return apkLinks[bestArch];

  } catch (error) {
    console.error("Detection error:", error);
    return null;
  }
}

