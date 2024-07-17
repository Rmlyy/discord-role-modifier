import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import constructRoleIDs from '../utils/constructRoleIDs.js'
import constructResultEmbed from '../utils/constructResultEmbed.js'
import updateRoles from '../utils/updateRoles.js'

export const data = new SlashCommandBuilder()
  .setName('start')
  .setDescription('Starts the role thing')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

const { GUILD_ID } = process.env
const roleIDs = constructRoleIDs()

export async function execute(interaction) {
  await interaction.reply(
    'Please wait while the roles are being updated... This may take some time.'
  )

  const uid = interaction.user.id

  try {
    const guild = await interaction.client.guilds.fetch(GUILD_ID)

    await guild.members.fetch()

    const updateResults = await updateRoles(guild, roleIDs)
    const resultEmbed = constructResultEmbed(updateResults)

    await interaction.channel.send({
      content: `<@${uid}>,`,
      embeds: [resultEmbed],
    })
  } catch (error) {
    await interaction.channel.send({
      content: `<@${uid}>, there was an error while updating the roles, please check the console for more information.`,
    })
    console.error('Error while updating roles:', error)
  }
}
