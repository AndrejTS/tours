function personCheck(birthDate, gender, idNum) {
  if (!birthDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return false;
  }
  if (!idNum.match(/^\d{10}$/)) {
    return false;
  }
  if (!gender.match(/^(F|M){1}$/)) {
    return false;
  }

  const idNumYear = idNum.slice(0, 2);
  let idNumMonth = idNum.slice(2, 4);
  const idNumDay = idNum.slice(4, 6);
  if (idNumMonth > 50) {
    idNumMonth -= 50;
    var idNumGender = 'F';
  } else {
    var idNumGender = 'M';
  }
  //  Od roku 2004 (zákonem č. 53/2004 Sb.) je navíc zavedena možnost v případě,
  //  že jsou v některý den již vyčerpána všechna platná čtyřčíslí,
  //  použít alternativní rodné číslo, kde se k číslu měsíce narození přičte
  //  ještě číslo 20 (u žen v tom případě tedy celkem 70).
  if (idNumMonth > 20) {
    idNumMonth -= 20;
  }

  if (gender && gender !== idNumGender) {
    return false;
  }

  if (birthDate) {
    if (birthDate.slice(0, 4) !== idNumYear) {
      return false;
    }
    if (birthDate.slice(5, 7) !== idNumMonth) {
      return false;
    }
    if (birthDate.slice(8, 9) !== idNumDay) {
      return false;
    }
  }

  return true;
}

export default personCheck;
