
const API_URL = process.env.REACT_APP_API_URL
const MERCHANT_KEY = process.env.REACT_APP_MERCHANT_KEY

export const getDishes = async () => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/merchants/${MERCHANT_KEY}`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
        .then(function (response) {
            // console.log(response)
            return response.json();
        })
        .then(function (myJson) {
            // console.log(myJson);
            resolve(myJson);
        })
        .catch((reason) => {
            reject(reason)
        });
    });
}

export const getDish = async (dishId) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/merchants/${MERCHANT_KEY}/${dishId}`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
        .then(function (response) {
            // console.log(response)
            return response.json();
        })
        .then(function (myJson) {
            // console.log(myJson);
            resolve(myJson);
        })
        .catch((reason) => {
            reject(reason)
        });
    });
}

export const postDish = async (dish) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/merchants/${MERCHANT_KEY}`
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dish)
            }
        )
        .then(function (response) {
            // console.log(response)
            return response.json();
        })
        .then(function (myJson) {
            // console.log(myJson);
            resolve(myJson);
        })
        .catch((reason) => {
            reject(reason)
        });
    });
}

export const putDish = async (dish) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/merchants/${MERCHANT_KEY}`
            , {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dish)
            }
        )
        .then(function (response) {
            // console.log(response)
            return response.json();
        })
        .then(function (myJson) {
            // console.log(myJson);
            resolve(myJson);
        })
        .catch((reason) => {
            reject(reason)
        });
    });
}

export const deleteDish = async (dishId) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/merchants/${MERCHANT_KEY}/${dishId}`
            , {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
        .then(function (response) {
            // console.log(response)
            return response.json();
        })
        .then(function (myJson) {
            // console.log(myJson);
            resolve(myJson);
        })
        .catch((reason) => {
            reject(reason)
        });
    });
}