export default function () {
  const roles = []
  let index = 1

  while (true) {
    const role = process.env[`ROLE${index}`]
    if (role) {
      roles.push(role)
      index++
    } else {
      break
    }
  }

  return roles
}
