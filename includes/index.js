// import { data } from './database.js'

let data = {
    "messages" : [
        {
            "id" : 1,
            "id_sender" : 2,
            "id_receiver" : 1,
            "heure" : "21:31",
            "date" : "17/12/2023",
            "contenu" : "Bonjour admin je suis nouveau..",
            "vu" : true,
            "tag" : 0
        },
        {
            "id" : 2,
            "id_sender" : 2,
            "id_receiver" : 1,
            "heure" : "21:32",
            "date" : "17/12/2023",
            "contenu" : "Comment allez-vous ?",
            "vu" : true,
            "tag" : 0
        },
        {
            "id" : 3,
            "id_sender" : 1,
            "id_receiver" : 2,
            "heure" : "21:32",
            "date" : "17/12/2023",
            "contenu" : "Je vais bien et vous ?",
            "vu" : true,
            "tag" : 2
        },
        {
            "id" : 4,
            "id_sender" : 2,
            "id_receiver" : 1,
            "heure" : "21:35",
            "date" : "17/12/2023",
            "contenu" : "Super 😁",
            "vu" : true,
            "tag" : 3
        }
    ],
    "users" : [
        {
            "id" : 1,
            "pseudo" : "Admin",
            "pass" : "Admin",
            "id_ami" : [2, 3],
            "last_id" : 3,
            "profil" : "assets/profiles/1.png"
        },
        {
            "id" : 2,
            "pseudo" : "Stan_Kamga",
            "pass" : "Stan_Kamga",
            "id_ami" : [1],
            "last_id" : 3,
            "profil" : "assets/profiles/2.png"
        },
        {
            "id" : 3,
            "pseudo" : "Hernandez",
            "pass" : "Hdz",
            "id_ami" : [1],
            "last_id" : 0,
            "profil" : "assets/profiles/3.png"
        }
    ]
}

let datas
let errors
let user_id
let receiver
let tag
let left_style = "block"
let right_style = "none"

const brands = document.querySelectorAll('.brand')

//Redirection de l'utilisateur
function redirect(){
    if (localStorage.hasOwnProperty('STANJAPAP_Essentials')) user_id = localStorage.getItem('STANJAPAP_Essentials')
    else {
        let ref = window.location.href.split('/')
        ref.pop()
        window.location.href = ref.join('/') + '/login.html'
    }
}


//Mise en forme de la page
function display(){
    //Affichage des amis
    ShowFriends()
    
    //Affichage des noms et tags
    brands[0].innerHTML = user["pseudo"]
    if (receiver && tag){
        const message = datas["messages"].find(message => message["id"] == tag)
        document.querySelector('#sender').textContent = (message['id_sender'] == user_id) ? "Vous" : receiver["pseudo"]
        document.querySelector('#tag').textContent = message['contenu']
    }
    brands[1].innerHTML = receiver ? receiver["pseudo"] : ""
    document.querySelector('.tagzone').style.display = tag ? 'flex' : 'none'
    document.querySelector('.message').style.display = receiver ? 'flex' : 'none'
}

function LoadData(){
    datas = data
}
function SaveData(){
    data = datas
}

//Fonction pour l'affichage sur ordinateur
function Desktop(test){
    document.querySelector('#left').style.display = test ? left_style : "block"
    document.querySelector('#right').style.display = test ? right_style : "flex"
}

function ShowFriends(){
    let left = document.querySelector('#left').lastElementChild
    left.innerHTML = ''
    datas['users'].filter(item => user['id_ami'].includes(item['id'])).forEach(item =>{
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
        div.innerHTML+= item['pseudo']
        left.appendChild(friend)
        left.appendChild(document.createElement('hr'))
    })
}

function ShowMessages(){
    // datas["messages"].addEventListener('change', () => {
        left_style = "none"
        right_style = "flex"
        Desktop(mediaStyle.matches)
        let id_table = [user['id'], receiver['id']]
        let message = `<br><div class='warning' align='center'><div>Vos messages sont cryptés de bout en bout.<p>Profitez de notre espace pour converser avec vos proches.</p></div></div><br>`
        let date
        let del_message = `<p style='color:purple; font-family:"Bradley Hand ITC"; font-style:italic; font-weight:bold'>Ce message a été supprimé..</p>`

        datas["messages"].filter(item => id_table.includes(item['id_receiver']) && id_table.includes(item['id_sender'])).forEach(item =>{
            if (!date || date != item['date']){
                date = item['date']
                message += `<div class='date'>${date}</div><br>`
            }
            message += `<div style='float:right'><div class=${item['id_sender'] == user['id'] ? 'me' : 'you'}>`
            if (item['tag'] > 0){
                let messageTag = datas["messages"].find(a => a['id'] == item['tag'])
                message += `<a href='#${item['tag']}'  name='${item['tag']}' class='links'><div class="tag"><div class="tagcontent"><div class="sender">${messageTag['id_sender'] == user['id'] ? 'Vous' : receiver['pseudo']}</div><div class='text'>${messageTag['contenu']}</div></div></div></a><br>`
            }
            message += `<div id='${item['id']}' class='last ${item['contenu'] != del_message ? 'bodymessage' : ''}'>${item['contenu']}<br><br><div class='heure last'>${item['heure']}`
            if (item['id_sender'] == user['id'] && item['contenu'] != del_message){
                message += `<img src='assets/delete.png' class='delete' style='cursor:pointer'><img src='assets/${item['vu']? 'seen' : 'sent'}.png'>`
            }
            message += `</div></div></div></div><br>`
        })

        document.querySelector("#messages").innerHTML = message
        document.querySelectorAll('.links').forEach(elt=>{
            elt.addEventListener("click", () =>{
                let target = document.getElementById(elt.name).parentElement
                let color = target.style.backgroundColor
                target.style.background = 'rgb(100, 200, 255)'
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
            elt.addEventListener("click", (e) =>{
                e.preventDefault()
                let id = +elt.parentElement.parentElement.id
                let message = datas["messages"].find(item => item['id'] == id)
                message['contenu'] = del_message
                message['tag'] = 0
                ShowMessages()
            })
        })

        display()
    // })
}

function format(nbre){
    return nbre > 9 ? ""+nbre : "0" + nbre
}

//Code
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
document.querySelector('#send').addEventListener('click', (e)=>{
    e.preventDefault()
    let date = new Date()
    let message = document.querySelector('#text').value
    if (receiver && message.trim().length > 0) {
        data['messages'].push({
            "id" : datas["messages"].length + 1,
            "id_sender" : user['id'],
            "id_receiver" : receiver['id'],
            "contenu" : message,
            "date" : `${format(date.getDate())}/${format(date.getMonth()+1)}/${date.getFullYear()}`,
            "heure" : `${format(date.getHours())}:${format(date.getMinutes())}`,
            "vu" : false,
            "tag" : tag ? +tag : 0
        })
        document.querySelector('#text').value = ""
        tag = undefined
        ShowMessages()
    }
})














// var a = document.getElementById("messages");
// var id = window.location.href.split("=");
// window.addEventListener("beforeunload", currentM());

// refresh();
// setInterval(() => {
//     refresh();
// }, 1000);

// function refresh() {
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "actions/messages/showmessagesAction.php?id="+id, false);
//     xhr.onload = () => {
//     if (xhr.readyState === xhr.DONE) {
//         if (xhr.status === 200) {
//             a.innerHTML = xhr.response;
//         }
//     }};
//     xhr.send(null);

//     var links = document.getElementsByClassName("liens");
//     var link = window.location.href.split("#");
//     link = link[0].split("&");

//     for (i = 0; i < links.length; i++) {
//         id2 = links[i].href.split("/");
//         links[i].href = link[0] + "&tag=" + id2[id2.length-1] + "&scroll=" + a.scrollTop;
//     }

//     if(document.getElementById("exitlink")){
//         document.getElementById("exitlink").href = link[0] + "&scroll=" + a.scrollTop;
//     }
// }

// function currentM(){
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "currenttextmessage.php?m="+document.getElementById("text").value, false);
//     xhr.send(null);
// }


LoadData()
redirect()
const user = datas["users"].find(user => user["id"] == user_id)
//Accès aux données des utilisateurs

const mediaStyle = window.matchMedia("(max-width: 800px)")
Desktop(mediaStyle.matches)
mediaStyle.addEventListener("change", () =>{
    Desktop(mediaStyle.matches)
})
//Adaptation de la page à la taille de l'écran


display()