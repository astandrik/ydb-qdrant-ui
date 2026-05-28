#!/usr/bin/env sh
set -eu

base_url="${1:-https://ydb-qdrant.tech}"
base_url="${base_url%/}"

printf '%s\n' "YDB-Qdrant agent skill discovery"
printf '%s\n' "${base_url}/agent/"
printf '%s\n' "${base_url}/agent-mode.json"
printf '%s\n' "${base_url}/.well-known/agent-skills/index.json"
printf '%s\n' "${base_url}/.well-known/agent-skills/ydb-qdrant/SKILL.md"
printf '%s\n' "${base_url}/.well-known/agent-skills/code-indexer/SKILL.md"
printf '%s\n' "${base_url}/.well-known/agent.json"
printf '%s\n' "${base_url}/.well-known/agent-card.json"
printf '%s\n' "${base_url}/openapi.json"
