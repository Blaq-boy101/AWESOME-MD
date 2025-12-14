# AWESOME-MD WhatsApp Bot

## Overview
WhatsApp Multi Device Bot using @whiskeysockets/baileys library.

## Project Structure
- `index.js` - Main entry point, handles WhatsApp connection and QR code display
- `main.js` - Bot logic, message handling, and commands
- `config.js` - Bot configuration (name, prefix, owner, etc.)
- `lockpackage.js` - Package lock utilities
- `session/` - Session storage directory for WhatsApp authentication
- `package.json` - Node.js dependencies

## Available Commands
- `.ping` - Check bot status
- `.menu` or `.help` - Show command menu
- `.info` - Display bot information

## Configuration
Edit `config.js` to customize:
- `botName` - Bot display name
- `ownerNumber` - Owner's phone number
- `prefix` - Command prefix (default: `.`)
- `mode` - public/private mode

## Running the Project
Run with: `node index.js`

When starting, scan the QR code with WhatsApp to connect.

## Recent Changes
- 2025-12-14: Filled all files with functional WhatsApp bot code
