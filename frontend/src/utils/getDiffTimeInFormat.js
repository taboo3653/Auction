const getDiffTimeInFormat = (ms) => {

    let diffMs = ms;

    const h = Math.floor(diffMs / (1000 * 60 * 60));
    diffMs -= h * (1000 * 60 * 60);
    const m = Math.floor(diffMs / (1000 * 60));
    diffMs -= m * (1000 * 60);
    const s = Math.floor(diffMs / (1000));
    diffMs -= s * (1000);

    const sH = (h<10) ? "0"+h : h;
    const sM = (m<10) ? "0"+m : m;  
    const sS = (s<10) ? "0"+s : s;  

    return sH+":"+sM+":"+sS;
}

export default getDiffTimeInFormat;