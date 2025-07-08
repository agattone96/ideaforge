#!/bin/bash
set -euo pipefail

TARGET_DIR="${1:-/tmp/ideaforge_modules}"

mkdir -p "$TARGET_DIR"
cp package.json package-lock.json "$TARGET_DIR/"

# Install dependencies in the temporary directory
npm install --prefix "$TARGET_DIR"

# Link the node_modules directory back into the repo
rm -rf node_modules
ln -s "$TARGET_DIR/node_modules" node_modules
