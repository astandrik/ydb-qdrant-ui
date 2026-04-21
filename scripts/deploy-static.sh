#!/usr/bin/env bash
set -euo pipefail

REMOTE="${REMOTE:-astandrik@111.88.152.4}"
WEBROOT="${WEBROOT:-/var/www/out}"

npm run diagrams
npm run build

ssh "$REMOTE" "
  set -euo pipefail
  ts=\$(date +%Y%m%d-%H%M%S)
  tar -C '$WEBROOT' -czf \"\$HOME/ydb-qdrant-ui-out-\$ts.tgz\" .
  echo \"Backup: \$HOME/ydb-qdrant-ui-out-\$ts.tgz\"
"

rsync -avz --delete out/ "$REMOTE:$WEBROOT/"

ssh "$REMOTE" "
  set -euo pipefail
  curl -fsSI http://127.0.0.1/en/ >/dev/null
  curl -fsSI http://127.0.0.1/ru/ >/dev/null
  curl -fsSI http://127.0.0.1/docs/ >/dev/null
  test -f '$WEBROOT/assets/C4-Component-Repository-Layer.svg'
  echo 'Deploy OK'
"
