export default function removeAccents(string: string | string[]) {
  var accents =
    "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
  var accentsOut =
    "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
  string = (<string>string).split("");
  var strLen = string.length;
  var i, x;
  for (i = 0; i < strLen; i++) {
    if ((x = accents.indexOf(string[i])) != -1) {
      string[i] = accentsOut[x];
    }
  }
  return string.join("").replace(/\s/g, "-").toLowerCase();
}
