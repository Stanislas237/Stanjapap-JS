let data = await getData(true)
let index = 0

// *************************************** index.js ***************************************************

let user_id
let user
let receiver
let tag
let left_style = "block"
let right_style = "none"

const brands = document.querySelectorAll('.brand')

async function getData(test=false){
    const res = await fetch("https://api.github.com/repos/Stanislas037/Stanjapap-DB/contents/database.json")
    const datas = await res.json()
    console.log(JSON.parse(atob(datas["content"])))
    if (test) return JSON.parse(atob(datas["content"]))
    data = JSON.parse(atob(datas["content"]))
}
async function setData(data){
    // Create commit
    await fetch("https://api.github.com/repos/Stanislas037/Stanjapap-DB/contents/database.json", {
        method: 'POST',
        headers: {
          "Authorization": `token ${process.env.API_TOKEN}`  
        },
        body: JSON.stringify({
          message: "Update chat data",
          content: btoa(data), 
          branch: "main"
        })
    })
    await getData()
}    
//Redirection de l'utilisateur
async function index_(test='a'){
    Desktop(mediaStyle.matches)
    let forms = document.querySelectorAll("form")
    if (typeof test === "boolean")
    {
        index = 0
        forms[0].style.display = test ? 'flex' : 'none'
        forms[1].style.display = test ? 'none' : 'block'
        forms[2].style.display = 'none'
        if (test){
            user_id = localStorage.getItem('STANJAPAP_Essentials')
            await getData()
            user = data["users"].find(item => item["id"] == user_id)
        }
    }else{
        index = 1
        forms[0].style.display = 'none'
        forms[1].style.display = 'none'
        forms[2].style.display = 'block'
    }
}    

//Mise en forme de la page
async function display(){
    //Chercher les données de la base de données
    await getData()

    //Affichage des amis
    ShowFriends()
    
    //Affichage des noms et tags
    brands[0].innerHTML = user["pseudo"]
    if (receiver && tag){
        const message = data["messages"].find(message => message["id"] == tag)
        document.querySelector('#sender').textContent = (message['id_sender'] == user_id) ? "Vous" : receiver["pseudo"]
        document.querySelector('#tag').innerHTML = message['contenu']
    }
    brands[1].innerHTML = receiver ? receiver["pseudo"] : ""
    document.querySelector('.tagzone').style.display = tag ? 'flex' : 'none'
    document.querySelector('.message').style.display = receiver ? 'flex' : 'none'
}

//Fonction pour l'affichage sur ordinateur
function Desktop(test){
    document.querySelector('#left').style.display = test ? left_style : "block"
    document.querySelector('#right').style.display = test ? right_style : "flex"
}

async function ShowFriends(){
    let left = document.querySelector('#left').lastElementChild
    left.innerHTML = ''
    await getData()
    data['users'].filter(item => user['id_ami'].includes(item['id'])).forEach(item =>{
        let friend = document.createElement('div')
        let div = document.createElement('div')
        let img = document.createElement('img')

        friend.classList.add('disc')
        div.classList.add('contact')
        div.addEventListener('click', () => {
            receiver = item
            display()
            ShowMessages()
        })
        img.setAttribute('src', item['profil'])

        friend.appendChild(div)
        div.appendChild(img)
        div.innerHTML+= item['id'] == user_id ? "Vous" : item['pseudo']
        left.appendChild(friend)
        left.appendChild(document.createElement('hr'))
    })
}

function htmlspecialchars(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function ShowMessages(){
    //Chercher les données de la base de données
    await getData()

    //Display de l'écran
    left_style = "none"
    right_style = "flex"
    Desktop(mediaStyle.matches)

    //Affichage des messages
    let id_table = [user['id'], receiver['id']]
    let message = `<br><div class='warning' align='center'><div>Vos messages sont cryptés de bout en bout.<p>Profitez de notre espace pour converser avec vos proches.</p></div></div><br>`
    let date
    let del_message = `<p style='color:purple; font-family:"Bradley Hand ITC"; font-style:italic; font-weight:bold'>Ce message a été supprimé..</p>`

    data["messages"].filter(item => id_table.includes(item['id_receiver']) && id_table.includes(item['id_sender'])).forEach(item =>{
        if (!date || date != item['date']){
            date = item['date']
            message += `<div class='date'>${date}</div><br>`
        }
        message += `<div style='float:right'><div class=${item['id_sender'] == user['id'] ? 'me' : 'you'}>`
        if (item['tag'] > 0){
            let messageTag = data["messages"].find(a => a['id'] == item['tag'])
            message += `<a href='#${item['tag']}' name='${item['tag']}' class='links'><div class="tag"><div class="tagcontent"><div class="sender">${messageTag['id_sender'] == user['id'] ? 'Vous' : receiver['pseudo']}</div><div class='text'>${messageTag['contenu']}</div></div></div></a><br>`
        }
        message += `<div id='${item['id']}' class='last ${item['contenu'] != del_message ? 'bodymessage' : ''}'>${item['contenu']}<br><br><div class='heure last'>${item['heure']}`
        if (item['id_sender'] == user['id'] && item['contenu'] != del_message){
            message += `<img src='assets/delete.png' class='delete' style='cursor:pointer'><img src='assets/${item['vu']? 'seen' : 'sent'}.png'>`
        }
        message += `</div></div></div></div><br>`
    })

    //Ajout des événements
    let messageZone = document.querySelector("#messages")
    messageZone.innerHTML = message
    messageZone.scrollTop = messageZone.scrollHeight
    document.querySelectorAll('.links').forEach(elt=>{
        elt.addEventListener("click", () =>{
            let target = document.getElementById(elt.name).parentElement
            let color = target.style.backgroundColor
            target.style.background = 'rgb(100, 200, 255)'
            setTimeout(() => messageZone.scrollTop -= 50, 10)
            setTimeout(() => target.style.background = color, 300)
        })
    })
    document.querySelectorAll('.bodymessage').forEach(elt=>{
        elt.addEventListener("click", (e) =>{
            e.preventDefault()
            if (!e.target.classList.contains('delete')){
                tag = +elt.id
                display()
            }
        })
        elt.style.cursor = 'pointer'
    })
    document.querySelectorAll('.delete').forEach(elt=>{
        elt.addEventListener("click", async function(e){
            e.preventDefault()
            let id = +elt.parentElement.parentElement.id
            await getData()
            let message = data["messages"].find(item => item['id'] == id)
            message['contenu'] = del_message
            message['tag'] = 0
            await setData(data)
            ShowMessages()
        })
    })

    display()
}

//Formater la date et l'heure
function format(nbre){
    return nbre > 9 ? ""+nbre : "0" + nbre
}




//********************************************Code*****************************************************
//Affichage de la page
const mediaStyle = window.matchMedia("(max-width: 800px)")
index_(localStorage.hasOwnProperty('STANJAPAP_Essentials'))
document.querySelector('.nav-link-logout').addEventListener('click', () => {
    displayLogin(true)
    localStorage.removeItem('STANJAPAP_Essentials')
    index_(localStorage.hasOwnProperty('STANJAPAP_Essentials'))
    window.location.reload()
})
document.querySelector('#newd').addEventListener('click', () => {
    index_()
})
document.querySelector('#btn2').addEventListener('click', () => {
    let pseudo = htmlspecialchars(document.querySelector('#pseudo').value.trim())
    let result = check_if_exists(pseudo)
    if (!result) return
    if (user["id_ami"].includes(result["id"])) {
        displayerror("Vous avez déjà une discussion avec cet utilisateur")
        return
    }
    user["id_ami"].push(result["id"])
    if (receiver) ShowMessages()
    else display()
    document.querySelector('#pseudo').value = ''
    index_(localStorage.hasOwnProperty('STANJAPAP_Essentials'))
})
document.querySelector('#discussions').addEventListener('click', () => {
    index_(localStorage.hasOwnProperty('STANJAPAP_Essentials'))
})

if (localStorage.hasOwnProperty('STANJAPAP_Essentials'))
{ 
    //Accès aux données des utilisateurs
    async function getUser(){
        await getData()
        user = data["users"].find(user => user["id"] == user_id)
    }
    getUser()
    
    //Adaptation de la page à la taille de l'écran
    Desktop(mediaStyle.matches)
    mediaStyle.addEventListener("change", () =>{
        Desktop(mediaStyle.matches)
    })
    
    //Ajout des événements
    document.querySelector('#exitlink').addEventListener('click', (e)=>{
        e.preventDefault()
        tag = undefined
        display()
    })
    document.querySelector('.back').addEventListener('click', (e)=>{
        e.preventDefault()
        left_style = "block"
        right_style = "none"
        receiver = null
        document.querySelector("#messages").innerHTML = ""
        Desktop(mediaStyle.matches)
        display()
    })
    document.querySelector('#send').addEventListener('click', async(e)=>{
        e.preventDefault()
        let date = new Date()
        let message = htmlspecialchars(document.querySelector('#text').value.trim())
        await getData()
        if (receiver && message.length > 0) {
            data['messages'].push({
                "id" : data["messages"].length + 1,
                "id_sender" : user['id'],
                "id_receiver" : receiver['id'],
                "contenu" : message,
                "date" : `${format(date.getDate())}/${format(date.getMonth()+1)}/${date.getFullYear()}`,
                "heure" : `${format(date.getHours())}:${format(date.getMinutes())}`,
                "vu" : false,
                "tag" : tag ? +tag : 0
            })
            await setData(data)
            document.querySelector('#text').value = ""
            tag = undefined
        }
    })
    event_t.addEventListener('change', ShowMessages)
    
    //Début
    display()
}

// *************************************** index.js ***************************************************


// *************************************** login/signup.js ***************************************************

const errors = document.querySelectorAll('.err')
let login = true
displayLogin(login)

function displayLogin(test) {
    login = test
    document.querySelector('#btn').value = test ? "Se connecter" : "S'inscrire"
    document.querySelector('#placeholder').innerHTML = test ? `Je n'ai pas de compte, <input type="button" id="lien_i" value="s'inscrire">` : `J'ai déjà un compte, <input type="button" id="lien_i" value="se connecter">`
    document.querySelector('#lien_i').addEventListener('click', (e) => {
        e.preventDefault()
        login =!login
        displayLogin(login)
    })
}

function displayerror(err) {
    errors[index].textContent = err + '\n'
    errors[index].style.display = "block"
    setTimeout(()=>errors[index].style.display = "none", 3000)
}

function reset_form() {
    document.querySelector('#ps_input').value = ""
    document.querySelector('#pw_input').value = ""
    errors[index].textContent = ''
}

async function hashPassword(pass) {
    const data = new TextEncoder().encode(pass)
    const hash = await window.crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
}

async function verify(pass, dbpass){
    let hash = await hashPassword(pass)
    if (hash !== dbpass) {
        displayerror('Mauvais mot de passe')
        return false
    }else return true
}

async function check_if_exists(name){
    await getData()
    let result = data['users'].find(elt => elt['pseudo'] === name)
    if (!result) {
        displayerror('Cet utilisateur n\'existe pas')
        return false
    }else{
        if (!login) displayerror('Cet utilisateur existe déjà')
        return result
    }
}

async function login_or_signup() {
    let pseudo = htmlspecialchars(document.querySelector('#ps_input').value)
    let passw = htmlspecialchars(document.querySelector('#pw_input').value)
    if (!(pseudo && passw)) {
        displayerror("Remplissez tous les champs.")
        return
    }
    if (pseudo.length < 3 || pseudo.length > 15) {
        displayerror("Votre pseudo doit être compris entre 3 et 15 caractères.")
        return
    }
    if (passw.length < 5 || passw.length > 10) {
        displayerror("Votre mot de passe doit être compris entre 5 et 10 caractères.")
        return
    }
    login ? await log_in(pseudo, passw) : await signup(pseudo, passw)
}

async function log_in(name, pass) {
    let user
    if (!(user = check_if_exists(name))) return
    if (await verify(pass, user['pass'])){
        reset_form()
        localStorage.setItem('STANJAPAP_Essentials', user['id'].toString())
        index_(localStorage.hasOwnProperty('STANJAPAP_Essentials'))
        display()
    }
}
async function signup(name, pass) {
    if (check_if_exists(name)) return
    let password
    if (!(password = await hashPassword(pass))) return
    await getData()
    data['users'].push({
        "id" : data["users"].length + 1,
        "pseudo" : name,
        "pass" : password,
        "id_ami" : [],
        "last_id" : 0,
        "profil" : `assets/profiles/Nopicture.png`
    })
    await setData(data)
    reset_form()
    localStorage.setItem('STANJAPAP_Essentials', (data["users"].length).toString())
    index_(localStorage.hasOwnProperty('STANJAPAP_Essentials'))
    display()
}

document.querySelector('#btn').addEventListener('click', (e) => {
    e.preventDefault()
    login_or_signup()
})

// *************************************** login/signup.js ***************************************************
