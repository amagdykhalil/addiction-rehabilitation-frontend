import { broadcast } from "./broadcasts";
import { BROADCAST_TYPE } from "@/shared/types/broadcast";
import type { IAuthenticationResponse } from "@/entities/auth/model";

export const postLogoutBroadcast = () => {
  broadcast.postMessage({ type: BROADCAST_TYPE.LOGOUT });
};

export const postTokenGeneratedBroadcast = (auth: IAuthenticationResponse) => {
  broadcast.postMessage({
    type: BROADCAST_TYPE.TOKEN_GENERATED,
    payload: auth,
  });
};
