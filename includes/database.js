export var data = {
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
