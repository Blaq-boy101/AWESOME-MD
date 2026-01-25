const config = require('./config');

async function startBot(sock) {
  console.log(`${config.botName} is now running!`);
  
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;
    
    const messageType = Object.keys(msg.message)[0];
    const text = messageType === 'conversation' ? msg.message.conversation : msg.message[messageType]?.text || '';
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const sender = isGroup ? msg.key.participant : from;
    
    if (config.autoRead) {
      await sock.readMessages([msg.key]);
    }
    
    if (config.autoTyping) {
      await sock.sendPresenceUpdate('composing', from);
    }
    
    if (text.startsWith(config.prefix)) {
      const command = text.slice(config.prefix.length).trim().split(' ')[0].toLowerCase();
      const args = text.slice(config.prefix.length + command.length).trim().split(' ');
      
      try {
        await handleCommand(sock, msg, command, args, from, sender, isGroup);
      } catch (error) {
        console.error('Error handling command:', error);
      }
    }
  });
}

async function handleCommand(sock, msg, command, args, from, sender, isGroup) {
  switch (command) {
    case 'ping':
      await sock.sendMessage(from, { text: 'Pong!' });
      break;
    case 'menu':
    case 'help':
      await sock.sendMessage(from, { text: getMenu() });
      break;
    case 'info':
      await sock.sendMessage(from, { text: getBotInfo() });
      break;
    default:
      // Handle unknown command
      break;
  }
}

function getMenu() {
  return `╭━━━━━━━━━━━━━━━╮
┃ ${config.botName}
╰━━━━━━━━━━━━━━━╯
*Commands:*
${config.prefix}ping - Check bot status
${config.prefix}menu - Show this menu
${config.prefix}info - Bot information
_Powered by ${config.author}_`;
}

function getBotInfo() {
  return `*Bot Name:* ${config.botName}
*Author:* ${config.author}
*Mode:* ${config.mode}
*Prefix:* ${config.prefix}`;
}

module.exports = { startBot };
