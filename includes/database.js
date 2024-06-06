var data = {
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
        }
    ],
    "users" : [
        {
            "id" : 1,
            "pseudo" : "Admin",
            "pass" : "wcIksDzZvHtqhtd/XazkAZF2bEhc1V3EjK+ayHMzXW8=",
            "id_ami" : [2, 3],
            "last_id" : 3,
            "profil" : "assets/profiles/1.png"
        },
        {
            "id" : 2,
            "pseudo" : "Stan_Kamga",
            "pass" : "ljSub8TKdW9/1/4iACrEw8sBJ6iIpsLwZqpvPRKe8gc=",
            "id_ami" : [1],
            "last_id" : 3,
            "profil" : "assets/profiles/2.png"
        },
        {
            "id" : 3,
            "pseudo" : "Hernandez",
            "pass" : "fdM+Tr8yfudubde/nvEmAVKhHlxNgru1CQm9DtuLeng=",
            "id_ami" : [1],
            "last_id" : 0,
            "profil" : "assets/profiles/3.png"
        }
    ]
}

export var event_t = new EventTarget()

export function getData(){
    return data
}

export function setData(data_imported, change=false){
    data = data_imported
    if (change) event_t.dispatchEvent(new Event('change'))
    return data
}