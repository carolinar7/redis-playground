#!/bin/bash

# Text styling
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
BOLD='\033[1m'

echo -e "${BLUE}${BOLD}Setting up Redis Playground Development Environment${NC}\n"

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}Docker is not installed!${NC}"
        echo -e "\n${BOLD}Installing Docker...${NC}"
        
        # Check if running on macOS
        if [[ "$OSTYPE" == "darwin"* ]]; then
            if ! command -v brew &> /dev/null; then
                echo -e "${RED}Homebrew is required for installation. Please install it first:${NC}"
                echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
                exit 1
            fi
            
            echo "Installing Docker via Colima..."
            brew install colima docker docker-compose
            colima start
        else
            echo -e "${RED}Please install Docker manually for your operating system:${NC}"
            echo "https://docs.docker.com/get-docker/"
            exit 1
        fi
    else
        echo -e "${GREEN}✓ Docker is installed${NC}"
    fi
}

# Check if Lazydocker is installed
check_lazydocker() {
    if ! command -v lazydocker &> /dev/null; then
        echo -e "${RED}Lazydocker is not installed!${NC}"
        echo -e "\n${BOLD}Installing Lazydocker...${NC}"
        
        # Check if running on macOS
        if [[ "$OSTYPE" == "darwin"* ]]; then
            if ! command -v brew &> /dev/null; then
                echo -e "${RED}Homebrew is required for installation.${NC}"
                exit 1
            fi
            
            brew install jesseduffield/lazydocker/lazydocker
        else
            echo -e "${RED}Please install Lazydocker manually for your operating system:${NC}"
            echo "https://github.com/jesseduffield/lazydocker#installation"
            exit 1
        fi
    else
        echo -e "${GREEN}✓ Lazydocker is installed${NC}"
    fi
}

# Check if Bun is installed
check_bun() {
    if ! command -v bun &> /dev/null; then
        echo -e "${RED}Bun is not installed!${NC}"
        echo -e "\n${BOLD}Installing Bun...${NC}"
        curl -fsSL https://bun.sh/install | bash
    else
        echo -e "${GREEN}✓ Bun is installed${NC}"
    fi
}

# Main setup
main() {
    echo "Checking prerequisites..."
    check_bun
    check_docker
    check_lazydocker
    
    echo -e "\n${BOLD}Installing dependencies...${NC}"
    bun install
    
    echo -e "\n${BOLD}Starting Docker services...${NC}"
    # Explicitly use the local docker-compose file
    docker-compose -f ./docker-compose.yml up -d
    
    echo -e "\n${GREEN}${BOLD}Setup complete! 🎉${NC}"
    echo -e "\nYou can now run:"
    echo -e "${BLUE}bun run dev${NC} - to start the development server"
    echo -e "${BLUE}docker-compose down${NC} - to stop all services"
    echo -e "${BLUE}lazydocker${NC} - to monitor Docker containers"
}

main
