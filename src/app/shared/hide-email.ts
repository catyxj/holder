/**
 * @description 隐藏邮箱号
 * @param {*} email
 * @returns email
 */
const hideEmailInfo = email => {
  if (String (email).indexOf ('@') > 0) {
    let newEmail, str = email.split('@'), _s = '';

    for (let i = 0; i < str[0].length; i++) {
      _s += '*';
    }

    /*if (str[0].length > 4) {
      _s = str[0].substr (0, 4);
      for (let i = 0; i < str[0].length - 4; i++) {
        _s += '*';
      }
    } else {
      _s = str[0].substr (0, 1);
      for (let i = 0; i < str[0].length - 1; i++) {
        _s += '*';
      }
    }*/
    newEmail = _s + '@' + str[1];
    return newEmail;
  } else {
    return hidden(email, 2, 2);
  }
};

// 隐藏字符
const hidden = (str, frontLen, endLen) => {
  let len = str.length - frontLen - endLen;
  if (len <= 2) {
    return '**';
  }
  let xing = '';
  for (let i = 0; i < len; i++) {
    xing += '*';
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
};

export default hideEmailInfo;
