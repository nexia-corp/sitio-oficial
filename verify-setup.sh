#!/bin/bash

echo "🔍 Nexia Corp - Project Verification Script"
echo "==========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "✓ Node.js: "
if command -v node &> /dev/null; then
    echo -e "${GREEN}$(node -v)${NC}"
else
    echo -e "${RED}Not installed${NC}"
fi

# Check npm
echo -n "✓ npm: "
if command -v npm &> /dev/null; then
    echo -e "${GREEN}$(npm -v)${NC}"
else
    echo -e "${RED}Not installed${NC}"
fi

echo ""
echo "📁 Project Structure:"
echo "==========================================="

# Check essential files
files=(
    "package.json"
    "next.config.js"
    "tsconfig.json"
    "tailwind.config.ts"
    "app/layout.tsx"
    "app/page.tsx"
    "app/globals.css"
    ".env.example"
    "README.md"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file"
    else
        echo -e "  ${RED}✗${NC} $file (MISSING)"
    fi
done

echo ""
echo "🔧 Components:"
echo "==========================================="

components=(
    "app/components/Navigation.tsx"
    "app/components/Hero.tsx"
    "app/components/TechLogos.tsx"
    "app/components/ProblemSection.tsx"
    "app/components/Services.tsx"
    "app/components/Process.tsx"
    "app/components/Stats.tsx"
    "app/components/Testimonials.tsx"
    "app/components/Pricing.tsx"
    "app/components/FAQ.tsx"
    "app/components/FinalCTA.tsx"
    "app/components/Footer.tsx"
    "app/components/CustomCursor.tsx"
    "app/components/FloatingWhatsApp.tsx"
)

for component in "${components[@]}"; do
    if [ -f "$component" ]; then
        echo -e "  ${GREEN}✓${NC} $(basename $component)"
    else
        echo -e "  ${RED}✗${NC} $(basename $component) (MISSING)"
    fi
done

echo ""
echo "📚 Documentation:"
echo "==========================================="

docs=(
    "README.md"
    "SETUP_GUIDE.md"
    "DEPLOYMENT_GUIDE.md"
    "CONFIGURATION.md"
    "PROJECT_SUMMARY.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "  ${GREEN}✓${NC} $doc"
    else
        echo -e "  ${RED}✗${NC} $doc (MISSING)"
    fi
done

echo ""
echo "🚀 Next Steps:"
echo "==========================================="
echo "1. npm install"
echo "2. cp .env.example .env.local"
echo "3. Update .env.local with your WhatsApp number"
echo "4. npm run dev"
echo ""
echo "📖 Read SETUP_GUIDE.md for detailed instructions"
echo ""
echo -e "${GREEN}✅ Project verification complete!${NC}"
