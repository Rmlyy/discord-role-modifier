import { EmbedBuilder } from 'discord.js'

export default function (resultObj) {
  let embedFields = []

  for (const roleId in resultObj.roles) {
    if (resultObj.roles.hasOwnProperty(roleId)) {
      const role = resultObj.roles[roleId]

      if (role.modifiedMembers === 0) continue

      embedFields.push({
        name: `**${role.name}**`,
        value: `Assigned **${role.modifiedMembers}** members.`,
      })
    }
  }

  const embed = new EmbedBuilder()
  const totalm = resultObj.totalModifiedMembers
  const embedDescription =
    totalm > 0 ? `Total modified members: **${totalm}**` : `There were no members to modify.`

  embed.setTitle('Role update results')
  embed.setDescription(embedDescription)
  embed.addFields(embedFields)
  embed.setColor('#00b0f4')
  embed.setFooter({
    text: 'github.com/Rmlyy/discord-role-modifier',
  })

  return embed
}
