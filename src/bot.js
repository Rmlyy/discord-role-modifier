import 'dotenv/config'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import { Client, Collection, GatewayIntentBits } from 'discord.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const { CLIENT_TOKEN } = process.env
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
})

client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'))
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = await import(filePath)

  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    )
  }
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = await import(filePath)

  if (event.data.once) {
    client.once(event.data.name, (...args) => event.execute(...args))
  } else {
    client.on(event.data.name, (...args) => event.execute(...args))
  }
}

client.login(CLIENT_TOKEN)
