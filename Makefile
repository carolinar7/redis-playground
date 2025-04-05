.PHONY: setup dev down help docker-up docker-down

# Default target when just running 'make'
.DEFAULT_GOAL := help

# Colors for help messages
BLUE := \033[36m
NC := \033[0m

# Help command that lists all available commands
help:
	@echo "$(BLUE)Available commands:$(NC)"
	@echo "$(BLUE)make setup$(NC)     - Set up development environment (install dependencies and start services)"
	@echo "$(BLUE)make dev$(NC)       - Start the development server"
	@echo "$(BLUE)make docker-up$(NC) - Start Docker containers"
	@echo "$(BLUE)make docker-down$(NC) - Stop Docker containers"
	@echo "$(BLUE)make down$(NC)      - Stop all services"

# Setup command
setup:
	@echo "Setting up development environment..."
	@chmod +x setup.sh
	@./setup.sh

# Development server
dev: docker-up
	@bun run dev

# Start Docker containers
docker-up:
	@echo "Starting Docker containers..."
	@docker-compose -f docker-compose.yml up -d

# Stop Docker containers
docker-down:
	@echo "Stopping Docker containers..."
	@docker-compose -f docker-compose.yml down

# Stop all services
down: docker-down
	@echo "Stopping all services..."