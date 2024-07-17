export default async function updateRoles(guild, roleIds) {
  const lastRoleId = roleIds.at(-1)
  let counters = {
    totalModifiedMembers: 0,
    roles: {},
  }

  for (let i = 0; i < roleIds.length; i++) {
    const currRoleId = roleIds[i]
    const currRoleName = guild.roles.cache.get(currRoleId).name

    counters.roles[currRoleId] = {
      name: currRoleName,
      modifiedMembers: 0,
    }
  }

  for (const member of guild.members.cache.values()) {
    const memberRoles = member.roles.cache
    let shouldWeUpdate = false

    for (let i = 0; i < roleIds.length - 1; i++) {
      const currentRoleId = roleIds[i]
      const nextRoleId = roleIds[i + 1]

      if (memberRoles.has(currentRoleId) && !memberRoles.has(nextRoleId)) {
        shouldWeUpdate = true
        break
      }
    }

    if (shouldWeUpdate) {
      for (let i = 0; i < roleIds.length - 1; i++) {
        const currentRoleId = roleIds[i]
        const nextRoleId = roleIds[i + 1]

        if (!memberRoles.has(lastRoleId) && memberRoles.has(currentRoleId)) {
          await member.roles.add(nextRoleId)
          await member.roles.remove(currentRoleId)

          counters.roles[nextRoleId].modifiedMembers++
          counters.totalModifiedMembers++
          break
        }
      }
    }
  }

  return counters
}
