const baseUrl = process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || "https://ricardozulkiewicz.com";
const adminToken = process.env.CV_ADMIN_TOKEN;

const checks = [
  { name: "Home", path: "/", expectedStatus: 200 },
  { name: "Portuguese home", path: "/pt", expectedStatus: 200 },
  { name: "CV request page", path: "/cv", expectedStatus: 200 },
  { name: "Privacy page", path: "/privacidade", expectedStatus: 200 },
  { name: "Health check", path: "/api/health", expectedStatus: 200 },
  { name: "Resume redirect", path: "/resume", expectedStatus: 200, finalPath: "/cv" },
  { name: "Curriculo redirect", path: "/curriculo", expectedStatus: 200, finalPath: "/cv" },
  { name: "Download CV redirect", path: "/download-cv", expectedStatus: 200, finalPath: "/cv" },
  { name: "Baixar curriculo redirect", path: "/baixar-curriculo", expectedStatus: 200, finalPath: "/cv" },
  { name: "Privacy redirect", path: "/privacy", expectedStatus: 200, finalPath: "/privacidade" },
];

function absoluteUrl(path) {
  return new URL(path, baseUrl).toString();
}

function finalPathname(response) {
  return new URL(response.url).pathname;
}

async function runCheck(check) {
  const response = await fetch(absoluteUrl(check.path), {
    redirect: "follow",
    cache: "no-store",
  });

  const statusOk = response.status === check.expectedStatus;
  const finalPathOk = check.finalPath ? finalPathname(response) === check.finalPath : true;
  const ok = statusOk && finalPathOk;

  return {
    name: check.name,
    ok,
    status: response.status,
    expectedStatus: check.expectedStatus,
    finalPath: finalPathname(response),
    expectedFinalPath: check.finalPath || null,
  };
}

async function runDiagnostics() {
  if (!adminToken) {
    return {
      name: "CV diagnostics",
      skipped: true,
      reason: "CV_ADMIN_TOKEN is not set in the local environment.",
    };
  }

  const response = await fetch(absoluteUrl("/api/cv/diagnostics"), {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
    cache: "no-store",
  });

  let body = null;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  return {
    name: "CV diagnostics",
    ok: response.ok && body?.status === "ready",
    status: response.status,
    diagnosticsStatus: body?.status || null,
    missingRequired: body?.missingRequired || [],
  };
}

const results = [];

for (const check of checks) {
  try {
    results.push(await runCheck(check));
  } catch (error) {
    results.push({
      name: check.name,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

try {
  results.push(await runDiagnostics());
} catch (error) {
  results.push({
    name: "CV diagnostics",
    ok: false,
    error: error instanceof Error ? error.message : String(error),
  });
}

const failed = results.filter((result) => result.ok === false);

console.log(JSON.stringify({ baseUrl, ok: failed.length === 0, results }, null, 2));

if (failed.length > 0) {
  process.exit(1);
}
