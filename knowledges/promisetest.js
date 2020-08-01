function test11() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let isSuccess = true;
      if (isSuccess) resolve("return value");
      else reject("err message");
    }, 2000);
  });
}

test11()
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    console.log(err);
  });

/////////////////////////

const x = Promise.resolve("test aaa");
x.then((msg) => {
  console.log(msg);
});

////////////////////////

const p1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("1");
      resolve("return value p1");
    }, 2000);
  });

const p2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("2");
      resolve("return value p2");
    }, 2000);
  });

Promise.all([p1(), p2()])
  .then((result) => {
    console.log(result);
  })
  .then(() => {
    console.log("other");
  });

//////////////////////////////

const p3 = Promise.resolve("Oops!");
setTimeout(() => {
  p3.then(function (msg) {
    throw new Error(msg);
  })
    .then(function (value) {
      console.log(`fulfilled: ${value}`);
    })
    .catch(function (value) {
      console.log(`rejected: ${value.message}`); // 'rejected: Oops!'
    });
}, 5000);
