import { CurentConversationTypes } from "./current-conversation.types";

export const switchToCurrentConversation = (userData: any) => ({
  type: CurentConversationTypes.SWITCH_CURRENT_CONVERSATION,
  payload: userData,
});
