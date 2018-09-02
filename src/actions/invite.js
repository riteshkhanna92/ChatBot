export const SHOW = 'SHOW';
export const HIDE = 'HIDE';
export const ACCEPT_INVITE   = 'ACCEPT_INVITE';
export const PASS_TO_BOT = 'PASS_TO_BOT';

export function showInvite() {
  return {
    type: SHOW,
    value: true
  };
}

export function hideInvite() {
  return {
    type: HIDE,
    value: false
  };
}

export function acceptInvite() {
  return {
    type: ACCEPT_INVITE
  };
}


export function passToBot() {
  return {
    type: PASS_TO_BOT
  };
}

