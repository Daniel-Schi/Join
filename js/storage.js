const STORAGE_TOKEN = 'XEW6NMHTSUX7UTFMPT74JMUTYJHTW7UDFVD2SEA7';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Asynchronously sets a key-value pair in the specified storage location.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return await fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

/**
 * Retrieves a value from the remote storage using the specified key.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return await fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}