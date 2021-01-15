const getAge = (birth_day) => {
    const birth_date = new Date(birth_day);
    const today = new Date();
    let age = today.getFullYear() - birth_date.getFullYear();
    let moisDiff = today.getMonth() - birth_date.getMonth();
    if(moisDiff < 0 || (moisDiff === 0 && today.getDate() < birth_date.getDate())) age--;
    return age;

    // const years     = new Date().getFullYear() - new Date(birthDay).getFullYear();
    // const monthDiff = new Date().getMonth()    - new Date(birthDay).getMonth();
    // const dateDiff  = new Date().getDay()      - new Date(birthDay).getDay();
    // if (dateDiff < 0)  monthDiff--;
    // if (monthDiff < 0) years--;
    // return years;
}

module.exports = {
    getAge
}