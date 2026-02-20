#!/bin/bash

# Better Auth Setup Script for EazyEnglish
# This script helps you complete the Better Auth setup

set -e

echo "🚀 Better Auth Setup for EazyEnglish"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if openssl is available
if ! command -v openssl &> /dev/null; then
    echo -e "${RED}❌ openssl not found${NC}"
    echo "Please install openssl or manually generate a 32-character secret"
    exit 1
fi

echo -e "${YELLOW}📋 Step 1: Setting BETTER_AUTH_SECRET in Convex${NC}"
echo "Generating secure random secret..."
echo ""

# Generate secret and set in Convex
SECRET=$(openssl rand -base64 32)
echo "Generated secret: ${SECRET:0:10}... (hidden for security)"
echo ""

# Set the environment variable
npx convex env set BETTER_AUTH_SECRET="$SECRET"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ BETTER_AUTH_SECRET set successfully!${NC}"
else
    echo -e "${RED}❌ Failed to set BETTER_AUTH_SECRET${NC}"
    echo "Please run manually: npx convex env set BETTER_AUTH_SECRET=\$(openssl rand -base64 32)"
    exit 1
fi

echo ""
echo -e "${YELLOW}📋 Step 2: Verifying Convex Environment Variables${NC}"
echo ""

# Check environment variables
npx convex env list | grep -E "(AUTH_GOOGLE|BETTER_AUTH)" || echo "Note: Some variables might not be visible in env list"

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Run: ${YELLOW}npx convex dev${NC}"
echo "2. In another terminal: ${YELLOW}npx expo start --clear${NC}"
echo "3. Test Google Sign-In in your app!"
echo ""
echo "For troubleshooting, see: BETTER_AUTH_SETUP.md"
