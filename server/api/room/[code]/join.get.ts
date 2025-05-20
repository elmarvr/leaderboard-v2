export default eventHandler(async (event) => {
  const { code } = await validateParams(event, Room.Info.pick({ code: true }));
  const room = await Room.join({ code });

  return room;
});
