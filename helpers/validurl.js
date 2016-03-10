
module.exports = function urlIsValid(url){
  'use strict';
  let urlExpr = new RegExp('((http)s?|ftp):\\/\\/(\\w+\\.)?\\w+\\.\\w+\\/?(\\w+(-\\w+)*(\\.\\w+(\\?\\S+)?)?)?');
  if(url.match(urlExpr)){
    return true;
  }else{
    return false;
  }
}
