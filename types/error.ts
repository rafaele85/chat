export const UnknownError = () => ({error: "An error occured"});

export const LoginFailedError = () => {
    return {error: "login_failed"};
}

export const PasswordMismatchError = () => {
    return {confirmPassword: "login_failed"};
}

export const DuplicateUsernameError = () => {
    return {username: "duplicate_username"};
}

export const BadUsernameError = () => {
    return {username: "bad_username"};
}

export const BadPasswordError = () => {
    return {password: "bad_password"};
}

export const UnauthenticatedError = () => {
    return {error: "unknown_error"};
}

export const UnknownFriendError = () => {
    return {friend: "unknown_user"};
};

export const ChatWithSelfError = () => {
    return {friend: "chat_with_self"};
};

export const ChatExistsError = () => {
    return {friend: "chat_exists"};
};


