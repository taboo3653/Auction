class HtmlError extends Error {

    code : number;

    constructor(code : number, message: any) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }
}

export default HtmlError