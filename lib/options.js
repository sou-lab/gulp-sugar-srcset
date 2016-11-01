const base = {
  resolution: {
    src: true,
    srcset: true
  },
  resolutionSuffix: '@[match]x',
  pixelRatio: [1, 2, 3, 4],
  skip1x: true,
  skip1xSuffix: true,
  resolutionSrcReplace: 1,
  responsive: {
    src: false,
    srcset: true
  },
  responsiveSuffix: '-[match]w',
  sizes: {
    add: ''
  },
  responsiveWidth: [],
  responsiveSrcReplace: -1,
  removeSrc: false
};

const mixedList = new Map([
  ['resolution', 'boolean'],
  ['responsive', 'boolean']
]);

function assign(obj1, obj2) {
  const newObj = Object.assign({}, obj1, obj2);

  Object.keys(obj2).forEach(k => {
    if(typeof obj2[k] === 'object'
      && obj2[k] !== null
      && !Array.isArray(obj2[k])
    ) {
      newObj[k] = assign(obj1[k], obj2[k]);
    }
  });

  return newObj;
}

function checkMixed(options) {
  for(let [key, type] of mixedList) {
    if(typeof options[key] === type) {
      const obj = Object.assign({}, base[key]);

      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          obj[prop] = options[key];
        }
      }
      options[key] = obj;
    }
  }

  return options;
}

module.exports = function(options = {}) {
  options = checkMixed(assign(base, options));
  return options;
};