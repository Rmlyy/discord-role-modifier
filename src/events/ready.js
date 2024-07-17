import { Events } from 'discord.js'

export const data = {
  name: Events.ClientReady,
  once: true,
}

export function execute(client) {
  console.log(`Ready! Logged in as ${client.user.tag}`)
}
