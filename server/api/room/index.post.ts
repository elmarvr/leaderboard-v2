export default eventHandler(async (event) => {
  const body = await validateBody(
    event,
    Room.Info.pick({
      title: true,
    })
  );

  const room = await Room.create({
    title: body.title,
    // password: body.password,
  });

  return room;
});
