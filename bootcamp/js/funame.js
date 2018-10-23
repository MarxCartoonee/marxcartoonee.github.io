$(() => {
  const nameSegments = ['head', 'less', 'horse', 'man'];
  const clocks = [
    '🕐',
    '🕑',
    '🕒',
    '🕓',
    '🕔',
    '🕕',
    '🕖',
    '🕗',
    '🕘',
    '🕙',
    '🕚',
    '🕛',
    '🕜',
    '🕝',
    '🕞',
    '🕟',
    '🕠',
    '🕡',
    '🕢',
    '🕣',
    '🕤',
    '🕥',
    '🕦',
    '🕧',
  ];

  let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  let capitalizeStr = (str) => {
    return str
      .split('')
      .map((v, i) => (i === 0 ? v.toUpperCase() : v))
      .join('');
  };

  let generateName = () => {
    const segs = Array.from(nameSegments);
    const clk = Array.from(clocks);
    let nameArr = [];
    let name = '';
    let k = 0;

    for (let i = 0; i < nameSegments.length; i++) {
      k = getRandomNumber(0, segs.length - 1);
      nameArr.push(segs[k]);
      segs.splice(k, 1);
      console.log(segs);
    }

    name = `${capitalizeStr(nameArr[0])}${nameArr[1]} ${capitalizeStr(
      nameArr[2]
    )}${nameArr[3]} ${clk[getRandomNumber(0, clk.length - 1)]}`;

    return name;
  };

  $('#fuNames input.submit').click((e) => {
    e.preventDefault();
    $('#fuNames input.output').val(generateName());
  });
});
