const getSizedImageUrl = (url, width) => {
    
    const tokens = url.split('/');
    tokens.splice(-2, 0, `w_${width},c_scale`);
    
    return tokens.join('/');
}

export default getSizedImageUrl;