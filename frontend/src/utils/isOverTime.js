const isOverTime = (finTime) => {
    const currentTime =  new Date() - window.diffTime;
    const finishTime  = new Date(finTime);
    
    return (finishTime - currentTime) < 0 
}

export default isOverTime;