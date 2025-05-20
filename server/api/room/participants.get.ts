export default eventHandler(async (event) => {
  return Participant.list();
});
