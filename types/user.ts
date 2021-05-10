export type IUser = {
    id: string;
    name: string;
    email: string;
    photoURL: string;
}

export const validateUsernameFormat = (v: string) => {
    let err="";
    if(v.length<4) {
        err = "Username must be at least 4 chars long and must contain only letters a-z A-Z, digits 0-9 or underscore or minus characters";
    }
    for(let c of v) {
        if(! (c>='a' && c<='z' || c>='A' && c<='Z' || c>='0' && c<='9' || c==='-' || c==='_') ) {
            err = "Username must be at least 4 chars long and must contain only letters a-z A-Z, digits 0-9 or underscore or minus characters";
        }
    }
    return err;
};
