async function get_users() {
    const data = require('./users.json');
    return data;
}
async function post_user() {
    const users = await get_users();
    for (let i = 0; i < users.length; i++) 
    {
        let user = users[i];
        // console.log(user);
        let response= await fetch('http://powstik-back-test.azurewebsites.net/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
        })
        response = await response.json();
        console.log(response);
    }
}

async function login_user() {
    const users = await get_users();
    for (let i=0; i<users.length; i++) {
        if(users[i].is_seller==true) {
            seller = {
                "email": users[i].email,
                "password": users[i].password
            }
            break;
        }
    }
    let response= await fetch('http://powstik-back-test.azurewebsites.net/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(seller)
    })
    response = await response.json();
    // console.log(response);
    return response.access;
}

async function delete_categories(categories) {
    for (let i = 0; i < categories.length; i++) 
    {
        let category = {
            "category_name": categories[i]
        }
        let response= await fetch('http://powstik-back-test.azurewebsites.net/category', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(category)
        })
        response = await response.json();
        console.log(response);
    }
}

// Add categories
async function add_categories () {
    let categories = ["Diabetes", "MotherAndChild", "Metabolics"];
    //first delete categories 
    await delete_categories(categories);
    // then add categories
    for (let i = 0; i < categories.length; i++) {
        let category = {
            "category_name": categories[i]
        }
        let response= await fetch('http://powstik-back-test.azurewebsites.net/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(category)
        })
        response = await response.json();
        console.log(response);
    }
}

// adding products
async function get_products_data() {
    const data = require('./products.json');
    return data;
}

async function post_products() {
    let products = await get_products_data();
    for (let i = 0; i < products.length; i++) 
    {
        let product = products[i];
        // console.log(product);
        let response= await fetch('http://powstik-back-test.azurewebsites.net/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // add bearer authorisation 
                'Authorization': 'Bearer ' + await login_user()
                },
                body: JSON.stringify(product)
        })
        response = await response.json();
        console.log(response);
    }
}

// adding consultations
async function get_consultations_data() {
    const data = require('./consultations.json');
    return data;
}

async function post_consultations() {
    let consultations = await get_consultations_data();
    for (let i = 0; i < consultations.length; i++) 
    {
        let consultation = consultations[i];
        // console.log(product);
        let response= await fetch('http://powstik-back-test.azurewebsites.net/consultation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // add bearer authorisation 
                'Authorization': 'Bearer ' + await login_user()
                },
                body: JSON.stringify(consultation)
        })
        response = await response.json();
        console.log(response);
    }
}

// main function for running all the routes and functions
async function main() {
    await post_user();
    await add_categories();
    await post_products();
    await post_consultations();
}

main();
// login_user();
