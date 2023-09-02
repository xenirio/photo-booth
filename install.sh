#!/bin/bash

# Check if NVM is already installed
if [ -d "$HOME/.nvm" ]; then
  echo "NVM is already installed."
else
  # Install NVM
  echo "Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
fi

# Source NVM to use it in the current shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js version 16.20.2
echo "Installing Node.js version 16.20.2..."
nvm install 16.20.2

# Set Node.js version 16.20.2 as the default
nvm use 16.20.2
nvm alias default 16.20.2

# Verify Node.js and npm installation
echo "Node.js $(node -v) and npm $(npm -v) are installed."

# Optional: List installed Node.js versions
# nvm ls

# Optional: Set the default Node.js version globally
# nvm alias default 16.20.2

echo "NVM and Node.js 16.20.2 installation complete."
