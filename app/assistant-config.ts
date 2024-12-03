export let assistantId = ""; // set your assistant ID here
export let assistantId2 = "";
export let assistantId3 = "";

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
if (assistantId2 === "") {
  assistantId2 = process.env.OPENAI_ASSISTANT_ID_2;
}
if (assistantId3 === "") {
  assistantId3 = process.env.OPENAI_ASSISTANT_ID_3;
}
