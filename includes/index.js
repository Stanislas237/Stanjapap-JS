import { data } from './actions/database'

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
    Desktop(mediaStyle.matches)
    //Affichage des amis
    ShowFriends()
    
    //Affichage des noms et tags
    brands[0].innerHTML = user["pseudo"]
    if (receiver){
        brands[1].innerHTML = receiver["pseudo"]
        //Tags
        if (tag){
            const message = datas["messages"].find(message => message["id"] == tag)
            document.querySelector('#sender').textContent = (message['id_sender'] == user_id) ? "Vous" : receiver["pseudo"]
            document.querySelector('#tag').textContent = message['contenu']
        }
    }
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
        let id_table = [user['id'], receiver['id']]
        let message = `<br><div class='warning' align='center'><div>Vos messages sont cryptés de bout en bout.<p>Profitez de notre espace pour converser avec vos proches.</p></div></div><br>`
        let date
        let del_message = `<p style='color:purple; font-family:'Bradley Hand ITC'; font-style:italic; font-weight:bold">Ce message a été supprimé..</p>`

        datas["messages"].filter(item => id_table.includes(item['id_receiver']) && id_table.includes(item['id_sender'])).forEach(item =>{
            if (!date || date != item['date']){
                date = item['date']
                message += `<div class='date'>${date}</div><br>`
            }
            message += `<div style='float:right'><div class=${item['id_sender'] == user['id'] ? 'me' : 'you'}>`
            if (item['tag'] > 0){
                let messageTag = datas["messages"].find(a => a['id'] == item['tag'])
                message += `<a href='#${item['tag']}' name='${item['tag']}' class='links'><div class="tag"><div class="tagcontent"><div class="sender">${messageTag['id_sender'] == user['id'] ? 'Vous' : receiver['pseudo']}</div><div class='text'>${messageTag['contenu']}</div></div></div></a><br>`
            }
            message += `<div id='${item['id']}' class='last ${item['contenu'] != del_message ? 'bodymessage' : ''}'>${item['contenu']}<br><br><div class='heure last'>${item['heure']}`
            if (item['id_sender'] == user['id'] && item['contenu'] != del_message){
                message += `<img src='assets/delete.png' style='cursor:pointer'><img src='assets/${item['vu']? 'seen' : 'sent'}.png'>`
            }
            message += `</div></div></div></div><br>`
        })

        document.querySelector("#messages").innerHTML = message
        document.querySelectorAll('.links').forEach(elt=>{
            elt.addEventListener("click", (e) =>{
                // e.preventDefault()
                let target = document.getElementById(elt.name).parentElement
                let color = target.style.backgroundColor
                target.style.background = 'rgb(100, 200, 255)'
                setTimeout(() => target.style.background = color, 300)
            })
        })
        document.querySelectorAll('.bodymessage').forEach(elt=>{
            elt.addEventListener("click", (e) =>{
                e.preventDefault()
                tag = +elt.id
                display()
            })
            elt.style.cursor = 'pointer'
        })
    // })
}

//Code
document.querySelector('#exitlink').addEventListener('click', (e)=>{
    e.preventDefault()
    tag = undefined
    display()
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