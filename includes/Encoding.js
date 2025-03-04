function Encode (data) {
    const data = new TextEncoder().encode(data)
    return btoa(String.fromCharCode(...data))
}

function Decode(encodedData) {
    const data = new Uint8Array(atob(encodedData).split('').map(char => char.charCodeAt(0)))
    return new TextDecoder().decode(data);
}
