export default eventHandler(async (event) => {
  const { user } = await getUserSession(event);
  if (!user) {
    setActor("public", {});
    return;
  }

  const code = getHeader(event, "x-room-code");

  if (!code) {
    setActor("user", {
      userId: user.id,
      email: user.email,
    });
    return;
  }

  const room = await Room.fromCode(code);

  setActor("system", {
    roomId: room.id,
  });

  const participant = await Participant.fromEmail(user.email);
  if (!participant) {
    throw createVisibleError({
      type: "authentication",
      code: "unauthorized",
      message: "You are not a participant in this room.",
    });
  }

  setActor("participant", {
    roomId: room.id,
    participantId: participant.id,
  });
});
