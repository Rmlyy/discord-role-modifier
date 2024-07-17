import 'dotenv/config'
import { REST, Routes } from 'discord.js'

const { CLIENT_ID, CLIENT_TOKEN, GUILD_ID } = process.env

const rest = new REST().setToken(CLIENT_TOKEN)

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
  .then(() => console.log('Successfully deleted all guild commands.'))
  .catch(console.error)

rest
  .put(Routes.applicationCommands(CLIENT_ID), { body: [] })
  .then(() => console.log('Successfully deleted all application commands.'))
  .catch(console.error)
