const FETCH_OPTIONS = {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }
}

export const fetchData = async (url, data) => {
    const response = await fetch(url, {
        ...FETCH_OPTIONS,
        body: JSON.stringify(data)
    })
    try {
        return await response.json();
    } catch(error) {
        console.log("error", error);
    }
}
