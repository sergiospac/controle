
const addInfo = async avatarList => {
  const getAvatarByIdUrl = id => `https://last-airbender-api.herokuapp.com/api/v1/characters/${id}`
  const newList = await avatarList.map(async element => {
    const id = element._id
    const avatarByIdUrl = getAvatarByIdUrl(id)
    const result = await fetch(avatarByIdUrl)
    const avatarInfo = await result.json()

    element.first = avatarInfo.first
    element.gender = avatarInfo.gender
    element.hair = avatarInfo.hair
    element.love = avatarInfo.love
    element.position = avatarInfo.position
    element.predecessor = avatarInfo.predecessor
    element.profession = avatarInfo.profession
    element.weapon = avatarInfo.weapon

    return element
  })

  return newList
}

const getAvatars = async () => {
  const allUrl = "https://last-airbender-api.herokuapp.com/api/v1/characters?perPage=500&page=1"
  //const avatarUrl = "https://last-airbender-api.herokuapp.com/api/v1/characters?profession=Avatar"

  const result = await fetch(allUrl)
  let avatarList = await result.json()

  newAvatarList = await addInfo(avatarList)

  return newAvatarList
}

getAvatars().then(async avatars => {

  const list = avatars.reduce(async (accumulator, aAvatar) => {

    const avatar = await aAvatar
    let acc = await accumulator

    const type = avatar.affiliation ?? '- - -'
    const enemies = avatar.enemies

    acc += `
    <li class "card ${type}" >
    <img class="card-img" alt="${avatar.name}" src="${avatar.photoUrl}">
    <h2 class="card-title">Nome: ${avatar.name}</h2>
    <h3 class="card-subtitle">Inimigos: ${enemies ?? "- - -"}</h3>
    <p>Arma: ${avatar.weapon}</p>
    <p>Profissão: ${avatar.profession}</p>
    <p>Afiliação: ${type}</p>
    </li>
    `

    return acc
  }, '')

  const ul = document.querySelector('[data-js="avatar"]')
  ul.innerHTML = await list

})

