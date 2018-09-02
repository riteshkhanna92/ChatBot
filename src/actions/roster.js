export const GET_ROSTER = 'GET_ROSTER';
export const SET_ROSTER = 'SET_ROSTER';
export const UNSET_ROSTER = 'UNSET_ROSTER';

export function removeRosterItem(sender_id) {
  return {
    type: UNSET_ROSTER,
    sender: sender_id
  };
}

export function getRoster() {
  return {
    type: GET_ROSTER,
  };
}

export function setRoster(val, act) {
  return {
    type: SET_ROSTER,
    value: val,
    active: act
  };
}
