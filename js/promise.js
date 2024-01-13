function a() {
    console.log('Function A');
}

function b() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Function B');
            resolve();
        }, 2000);
    });
}

function c() {
    console.log('Function C');
}

// a();
// b().then(c);

async function app() {
    a();
    await b();
    c();
}

app();
