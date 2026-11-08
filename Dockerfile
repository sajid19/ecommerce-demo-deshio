FROM node:22-bookworm-slim

WORKDIR /app

# User-requested (2026-09-25): "I don't need to run npm outside — if I build
# images, npm dev install should happen in Dockerfile." Bakes dependencies
# into the image at build time so `docker compose build`/`make src-up` alone
# produces a working install, with no `npm install` run by hand afterward.
# Only `package*.json` are copied here — the real source is bind-mounted
# over /app by docker-compose.src.yml for hot reload, so copying it into the
# image would be dead weight, never actually used at runtime. The hash
# marker lets the entrypoint (below) tell "already matches this image's
# lockfile" apart from "stale, needs reinstalling" without re-running `npm
# ci` on every single container start.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund \
    && sha256sum package-lock.json | awk '{print $1}' > node_modules/.package-lock-hash

# Row 192, extended 2026-09-25: `src_frontend_node_modules` (docker-
# compose.src.yml) is a NAMED volume — Docker only ever seeds a named volume
# from the image the FIRST time it's created; an already-existing volume
# from a prior session keeps its own old node_modules forever, even after
# this image is rebuilt with a new dependency. So baking `npm ci` into the
# image above only covers a genuinely fresh volume (first clone, or a
# `docker compose down -v`) — this entrypoint is what covers the other case,
# reinstalling automatically whenever the volume's own `package-lock.json`
# hash no longer matches what's actually on disk, not just when node_modules
# is completely empty. See the script's own comment.
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]
