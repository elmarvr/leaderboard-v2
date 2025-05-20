export default eventHandler(async (event) => {
  const { winnerId, loserId } = await validateBody(
    event,
    Game.Info.pick({
      winnerId: true,
      loserId: true,
    })
  );

  const game = await Game.create({
    winnerId,
    loserId,
  });

  return game;
});
