// convert an array of objects to a map/hash

// var arr = [
//   { key: 'foo', val: 'bar' },
//   { key: 'hello', val: 'world' }
// ];

// to

// Map {"foo" => "bar", "hello" => "world"}

const mapify = (arr) => {
  return new Map(arr.map(i => [i.key, i.val]));
}