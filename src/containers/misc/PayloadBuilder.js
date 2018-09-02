var currentMessageId  =0;
function generateMessageId(){

                                if (currentMessageId > 10000)
                                        currentMessageId = 0;
                                return new Date().getTime().toString() + '~' + (++currentMessageId).toString();
                        }

export function roster() {

    return {
        "e":"get_roster",
        "p":null,
        "rid":generateMessageId()
    };
}

export function invalidateUsersPage(page) {
    return {
        type: INVALIDATE_USERS_PAGE,
        page,
    };
}
        
                        