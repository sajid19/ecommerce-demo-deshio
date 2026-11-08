#!/bin/sh
set -e

# TASKS.md row 192 — same class of gap as row 178's missing `deshio_src_test`
# provisioning: state that only ever existed inside a running container.
# Extended 2026-09-25, user-requested: "I don't need to run npm outside."
#
# docker-compose.src.yml mounts the named volume `src_frontend_node_modules`
# over /app/node_modules (so the host's node_modules never fights the
# container's). Docker only seeds a FRESH named volume from the image once,
# at the volume's own creation — the Dockerfile now bakes `npm ci` into the
# image precisely so that first seed is already a working install (no
# install needed here at all on a genuinely new environment). An EXISTING
# volume from a prior session keeps its own old node_modules forever, even
# after the image is rebuilt with a new/changed dependency — checking only
# "does the `next` binary exist" (this script's original check) missed that
# case entirely, since a stale install still has `next`, just not whatever
# was just added to `package.json`. Comparing `package-lock.json`'s hash
# against a marker written alongside node_modules catches BOTH: a fresh/
# empty volume (marker missing) and a stale one (marker present but wrong),
# while a volume that's already current (the common case, every ordinary
# `docker compose up`) skips reinstalling and starts immediately.
CURRENT_HASH="$(sha256sum package-lock.json | awk '{print $1}')"
INSTALLED_HASH="$(cat node_modules/.package-lock-hash 2>/dev/null || true)"

if [ ! -x node_modules/.bin/next ] || [ "$INSTALLED_HASH" != "$CURRENT_HASH" ]; then
    echo "[entrypoint] node_modules missing or package-lock.json changed — installing dependencies…"
    npm ci --no-audit --no-fund
    echo "$CURRENT_HASH" > node_modules/.package-lock-hash
fi

exec "$@"
