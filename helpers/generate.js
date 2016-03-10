// funciton to generate 6 char short code
module.exports = function helperGenerateExportedFunction(){
  'use strict';
  // define available chars and set string length
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  ,stringLength = 6
  ,string = '';
  // generate random string
  for (let i = 0; i < stringLength; i++){
    let randomNum = Math.floor(Math.random() * chars.length);
    string += chars.substring(randomNum,randomNum+1);
  }
  // return new code
  return string;
};

