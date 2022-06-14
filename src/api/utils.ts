import { AxiosResponse } from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CharacterType } from "./types";

export type APICall<CharacterType> = Promise<
  AxiosResponse<Array<CharacterType>>
>;

export enum CharacterStatus {
  any = "",
  alive = "alive",
  dead = "dead",
  unknown = "unknown",
}
