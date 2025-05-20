import type { User } from "./user";
import type { Room } from "./room";
import type { Participant } from "./participant";

interface ActorMap {
  public: {};
  user: {
    userId: User.Info["id"];
    email: User.Info["email"];
  };
  participant: {
    roomId: Room.Info["id"];
    participantId: Participant.Info["id"];
  };
  system: {
    roomId: Room.Info["id"];
  };
}

export type Actor = Prettify<
  {
    [K in keyof ActorMap]: {
      type: K;
    } & ActorMap[K];
  }[keyof ActorMap]
>;

export function useActor() {
  const event = useEvent();
  return Object.freeze(event.context.actor);
}

export function assertActor<T extends Actor["type"]>(type: T) {
  const actor = useActor();
  if (actor.type !== type) {
    throw new Error(`Expected actor of type ${type}, but got ${actor.type}`);
  }
  return actor as Extract<Readonly<Actor>, { type: T }>;
}

export function setActor<T extends Actor["type"]>(
  type: T,
  data: Omit<Extract<Actor, { type: T }>, "type">
) {
  const event = useEvent();
  event.context.actor = {
    type,
    ...data,
  } as Actor;
}

export function useRoom() {
  const actor = useActor();
  if ("roomId" in actor) {
    return {
      id: actor.roomId,
    };
  }
  throw new Error("Actor is not in a room");
}

declare module "h3" {
  interface H3EventContext {
    actor: Actor;
  }
}

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
