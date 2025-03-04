function getUserSelf(userId){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "actions/friends/showFriendsAction.php?id="+userId, false);
    xhr.onload = () => {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            return JSON.parse(xhr.response);
        }
    }};
    xhr.send(null);
}

function getFriends(userId){
    return getDataFromDataBase("actions/friends/showFriendsAction.php?id="+userId);
}

function getDataFromDataBase(URL){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", URL, false);
    xhr.onload = () => {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            return JSON.parse(xhr.response);
        }
    }};
    xhr.send(null);
}