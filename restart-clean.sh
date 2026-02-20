#!/bin/bash
# Auto cache cleaner and fresh restart

echo "🛑 Stopping Metro bundler..."
pkill -f "expo start" 2>/dev/null || true
pkill -f "react-native start" 2>/dev/null || true
sleep 1

echo "🧹 Cleaning all caches..."
rm -rf .expo
rm -rf node_modules/.cache
rm -rf $TMPDIR/react-* 2>/dev/null || true
rm -rf $TMPDIR/metro-* 2>/dev/null || true
rm -rf $TMPDIR/haste-* 2>/dev/null || true

echo "🔄 Clearing watchman (if installed)..."
watchman watch-del-all 2>/dev/null || true

echo ""
echo "✅ Cache cleaned!"
echo ""
echo "🚀 Starting fresh Metro bundler with --clear flag..."
echo ""
npm start -- --clear
