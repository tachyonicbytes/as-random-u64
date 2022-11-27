const fs = require("fs");
const loader = require("@assemblyscript/loader");
const wasmModule = loader.instantiateSync(
  fs.readFileSync("./build/release.wasm"),
  // These are the JavaScript imports to our WebAssembly module, translating
  // from WebAssembly strings, received as a pointer into the module's memory,
  // to JavaScript's console API as JavaScript strings.
  {});

function main(wasmModule) {
  let randomU64 = wasmModule.exports.randomU64;

  let map = new Map();
  for (let i = 0n; i < 10n; i++) {
    map.set(i, 0);
    map.set(-i, 0);
  }

  for (let i = 0; i < 100000; i++) {
    let digit = randomU64() % 10n;
    map.set(digit, map.get(digit) + 1);
  }

  console.log("Test randomU64 distribution. All values should be fairly close, except for 0.");
  console.log(map);
}

main(wasmModule)
